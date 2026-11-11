
require('dotenv').config();

const { app, BrowserWindow, ipcMain } = require('electron');
const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');
const path = require('path');

const supabaseUrl = 'https://wgtfvyuibnmzqzlltguq.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

let widget;
let batteryInterval;

function createWidget() {
  widget = new BrowserWindow({
    width: 300,
    height: 500,
    type: 'utility',
    transparent: true,
    frame: false,
    resizable: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  widget.loadFile('index.html');

  widget.on('closed', () => {
    widget = null;
    clearInterval(batteryInterval);
  });
}

async function fetchbattery(widgetId) {
  if (!widget || widget.isDestroyed()) return;

  const { data, error } = await supabase
    .from('info')
    .select('battery')
    .eq('widget-id', widgetId)
    .maybeSingle();

  if (error) {
    console.error('Battery fetch error:', error.message);
    return;
  }

  if (data && data.battery !== null) {
    console.log('Battery:', data.battery);

    widget.webContents.send(
      'battery-update',
      data.battery
    );
  }
}

ipcMain.handle('create-widget', async () => {
  const uniqueId = crypto.randomUUID();

  const { error } = await supabase
    .from('info')
    .insert({
      'widget-id': uniqueId
    });

  if (error) {
    console.error('Supabase insert error:', error);
    throw new Error(error.message);
  }

  console.log('Widget created:', uniqueId);

  await fetchbattery(uniqueId);

  clearInterval(batteryInterval);

  batteryInterval = setInterval(() => {
    fetchbattery(uniqueId);
  }, 2000);

  return uniqueId;
});

app.whenReady().then(() => {
  setTimeout(createWidget, 100);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWidget();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
