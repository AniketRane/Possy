// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge } = require("electron");
const { ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("api", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,

  receiveMessage: (callback) => ipcRenderer.on('message-from-main', callback),

  printHtml: (html) => ipcRenderer.send('print-html', html),
  printPOS: (code) => ipcRenderer.send('print-pos', code),

  fireKeypress: (char) => ipcRenderer.send('fire-keypress', char),

  // listPrinters: () => ipcRenderer.send('list-printers'),
  // onListPrinters: (callback) => ipcRenderer.on('list-printers', (event, printers) => callback(printers)),

  getPrinters: () => ipcRenderer.invoke('get-printers'),

  getPath: (name) => ipcRenderer.invoke('get-path', name),

  testDBConnection: (params) => ipcRenderer.invoke('test-db-connection', params),




});
