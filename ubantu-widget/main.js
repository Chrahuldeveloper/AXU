
require('dotenv').config();

const { app, BrowserWindow, ipcMain } = require('electron');
const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');
const path = require('path');

const supabaseUrl = 'https://wgtfvyuibnmzqzlltguq.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

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

  return uniqueId;
});

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
      preload: path.join(__dirname, 'preload.js'),
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
