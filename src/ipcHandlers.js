const { ipcMain, BrowserWindow } = require('electron');
const { PosPrinter } = require('electron-pos-printer');

function createPrintWindow(htmlContent) {
    const win = new BrowserWindow({
      show: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      }
    });
    win.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`);
    win.webContents.on('did-finish-load', () => {
      win.webContents.print({ 
        silent: true,
        margins: {
          marginType: 'none'
        }
      }, (success, failureReason) => {
        if (!success) console.log(failureReason);
        win.close();
      });
    });
}

function setupIpcHandlers() {
    
    ipcMain.on('print-pos', (event, { data, options }) => {
        PosPrinter.print(data, options)
        .then(
          log.info('done printing')
        )
        .catch((error) => {
          log.error(error)
        });
    });

    ipcMain.on('print-html', (event, htmlContent) => {
        createPrintWindow(htmlContent);
    });

    ipcMain.handle('get-path', async (event, name) => {
      return app.getPath(name);
    });

}

export default setupIpcHandlers;
