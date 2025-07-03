const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      contextIsolation: true,
    },
    icon: path.join(__dirname, 'public/icon.png')
  });

  win.loadURL('http://localhost:3000'); // during development
  // win.loadFile('build/index.html'); // for production (after npm run build)
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
