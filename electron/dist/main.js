"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var mainWindow = null, tray = null;
//判断命令行脚本的第二参数是否含--debug
var debug = /--debug/.test(process.argv[2]);
function makeSingleInstance() {
    if (process.mas)
        return;
    electron_1.app.requestSingleInstanceLock();
    electron_1.app.on('second-instance', function () {
        if (mainWindow) {
            if (mainWindow.isMinimized())
                mainWindow.restore();
            mainWindow.focus();
        }
    });
}
function createWindow() {
    var windowOptions = {
        width: 1000,
        height: 800,
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    };
    mainWindow = new electron_1.BrowserWindow(windowOptions);
    mainWindow.loadURL("http://localhost:3000/");
    // mainWindow.loadURL(path.join('file://', __dirname, '/build/index.html'));
    //接收渲染进程的信息
    var ipc = require('electron').ipcMain;
    ipc.on('min', function () {
        mainWindow.minimize();
    });
    ipc.on('max', function () {
        mainWindow.maximize();
    });
    ipc.on('close', function () {
        mainWindow.hide();
        mainWindow.setSkipTaskbar(true);
    });
    tray = new electron_1.Tray(path.join(process.cwd(), 'public/favicon.ico'));
    var contextMenu = electron_1.Menu.buildFromTemplate([
        { label: '显示窗口', click: function () { mainWindow.show(); } },
        { label: '断开连接' },
        { label: '退出', click: function () { mainWindow.close(); } }
    ]);
    tray.setToolTip('This is my application.');
    tray.setContextMenu(contextMenu);
    tray.on('click', function () { mainWindow.show(); });
    if (debug) {
        mainWindow.webContents.openDevTools();
        require('devtron').install();
    }
}
makeSingleInstance();
//app主进程的事件和方法
electron_1.app.on('ready', function () {
    createWindow();
});
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
module.exports = mainWindow;
