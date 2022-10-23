console.log('Initiation process working');
const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const remoteMain = require('@electron/remote/main');
const path = require("path");
const url = require("url");
remoteMain.initialize();

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 700,
    height: 500,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        nodeIntegration: true,
        preload: path.join(__dirname, "src/preload.js"),
    }
  });

  win.loadURL(url.format({
  // and load the index.html of the app.
    pathname: path.join(__dirname, 'src/index.html'),
    protocol: 'file',
    slashes: true
  }));

  remoteMain.enable(win.webContents)
  // Open the DevTools.
  win.webContents.openDevTools();
  win.on('closed', () => {
  win = null;
  })
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});                                                                                
app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
});

app.whenReady().then(() => {
  ipcMain.handle("dialog", async (event, method, params) => {
//    dialog[method](params);
      const result = await dialog.showOpenDialog(params);
      const filePath = result.filePaths[0];

      const f = path.resolve(__dirname, `public/pdfjs/web/viewer.html?file=${filePath}`);
//      const f = path.resolve(__dirname, '../${filePath}');
      return f;
//      return result;
  });
});