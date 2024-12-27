import { app, BrowserWindow, ipcMain, Menu, MenuItem } from 'electron'
const path = require('path');
const mysql = require('mysql2/promise');
const Realm = require('realm');

import setupIpcHandlers from "./ipcHandlers"
import splashHtmlContent from "./splash.html?raw";

import Category from "./model/Category";
import {default as MenuItemSchema } from "./model/MenuItem";

if (require('electron-squirrel-startup')) {
  app.quit();
}

const log = require('electron-log/main');

log.initialize();

const createWindow = () => {

  var splash = new BrowserWindow({
    width: 500, 
    height: 300, 
    transparent: true, 
    frame: false, 
    alwaysOnTop: true 
  });

  splash.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(splashHtmlContent)}`);
  splash.center();

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
    },
  });
  
  mainWindow.setMenuBarVisibility(false)

  let rightClickPosition = { x: 0, y: 0 }
  
  const contextMenu = new Menu();
  contextMenu.append(
    new MenuItem({
      label: 'Inspect Element',
      click: () => {
        mainWindow.webContents.inspectElement(rightClickPosition.x, rightClickPosition.y);
      },
    })
  );

  mainWindow.webContents.on('context-menu', (event, params) => {
    rightClickPosition = { x: params.x, y: params.y };
    contextMenu.popup(mainWindow);
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // mainWindow.webContents.openDevTools();

  ipcMain.handle('get-printers', async (event) => {
    return await mainWindow.webContents.getPrintersAsync();
  });

  ipcMain.handle('test-db-connection', async (event, data) => {
    
    try {
      const connection = await mysql.createConnection(data);
      return {
        connected: true
      };

    }catch(e) {
      return {
        connected: false,
        error: e
      };
    }

    return false;

  });

  ipcMain.on('fire-keypress', (event, char) => {
    const regex = /^\{(.+)\}$/;
    const match = char.match(regex);
    if(match) {
      mainWindow.webContents.sendInputEvent({keyCode: match[1], type: "keyDown"});
    }else{
      mainWindow.webContents.sendInputEvent({keyCode: char, type: "char"});
    }
  });

  mainWindow.webContents.once('dom-ready', () => {
    splash.close();
    mainWindow.maximize();
    splash.destroy();
  });


};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const setupRealm = async () => {
  
  const dbPath = path.join(app.getPath('userData'), 'my-realm-database.realm');

  console.log("setupRealm");
  console.log(dbPath);

  const realm = await Realm.open({
    path: dbPath,
    schema: [
      Category,
      MenuItemSchema
    ]
  });

  // realm.write(() => {
  //   const menuItem = realm.objectForPrimaryKey('MenuItem', new Realm.BSON.ObjectID('676d45ad52e5e7b7343f9929'));
  //   if (menuItem) {
  //     realm.delete(menuItem);
  //   }
  // });

  realm.write(() => {
    const category = realm.create('Category', {
      _id: new Realm.BSON.ObjectID(),
      name: 'Beverages',
      menuItems: [],
    });
    const menuItem = realm.create('MenuItem', {
      _id: new Realm.BSON.ObjectID(),
      name: 'Coffee',
      price: 2.5,
      category: category,
    });
    // category.menuItems.push(menuItem);
  });

}

app.whenReady().then(() => {
  setupIpcHandlers();
  setupRealm();
});