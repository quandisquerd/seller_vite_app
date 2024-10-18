const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 1000,
        autoHideMenuBar: true,
        frame: false,
        minWidth: 900,   // Minimum width
        minHeight: 1000,  // Minimum height
        maxWidth: 900,   // Maximum width
        maxHeight: 1000,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    win.webContents.openDevTools()
    win.loadURL('http://localhost:5173/'); // URL mặc định của Vite
    // win.loadFile(path.join(__dirname, 'dist/index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
