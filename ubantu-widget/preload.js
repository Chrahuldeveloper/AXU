
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktop', {
  createWidget: () => ipcRenderer.invoke('create-widget')
});
