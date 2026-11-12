
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktop', {

  createWidget: () =>
    ipcRenderer.invoke('create-widget'),

  onBatteryUpdate: (callback) => {
    ipcRenderer.on('battery-update', (_event, battery) => {
      callback(battery);
    });
  }
});
