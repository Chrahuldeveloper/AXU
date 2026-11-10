const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWidget() {
  const widget = new BrowserWindow({
    width: 300,
    height: 500,
    type: 'utility',
    transparent: true,        
    frame: false,             
    resizable: false,
    skipTaskbar: true,       
    alwaysOnTop: true,      
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  widget.loadFile('index.html');
}

app.whenReady().then(() => {
  setTimeout(createWidget, 100);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWidget();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
