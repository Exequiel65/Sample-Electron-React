import { app, BrowserWindow } from 'electron';
import * as path from 'path';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,  // Ventana sin bordes
    transparent: false,  // Ventana transparente
    title: 'Info Caja Simulador',  // Título personalizado
    icon: path.join(__dirname, './public/logo-192x192.png'),  // Ícono personalizado
    fullscreen: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  win.setMenuBarVisibility(false);
  win.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});