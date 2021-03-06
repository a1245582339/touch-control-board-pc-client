import { app, BrowserWindow, Tray, Menu, ipcMain as ipc } from 'electron'
import * as path from 'path'
import createServer from './server'
let mainWindow: any = null, tray = null;
//判断命令行脚本的第二参数是否含--debug
const debug = /--debug/.test(process.argv[2]);
function makeSingleInstance() {
    if (process.mas) return;
    app.requestSingleInstanceLock();
    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore()
            mainWindow.focus()
        }
    })
}
function openDevTools() {
    mainWindow.webContents.openDevTools();
    require('devtron').install();
}
function createWindow() {
    const windowOptions = {
        width: 1000,
        height: 800,
        frame: false,
        webPreferences: {
            nodeIntegration: true, 
        }
    };
    mainWindow = new BrowserWindow(windowOptions);
    mainWindow.loadURL("http://localhost:3000/");
    // mainWindow.loadURL(path.join('file://', process.cwd(), 'build/index.html'));
    //接收渲染进程的信息
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
    ipc.on('devtools', openDevTools);
    tray = new Tray(path.join(process.cwd(), 'electron/assets/favicon.ico'))
    const contextMenu = Menu.buildFromTemplate([
        { label: '显示窗口', click: () => { mainWindow.show() } },
        { label: '断开连接' },
        { label: '退出', click: () => { mainWindow.close() } }
    ])
    tray.setToolTip('This is my application.')
    tray.setContextMenu(contextMenu)
    tray.on('click', () => { mainWindow.show() })
    if (debug) {
        openDevTools()
    }
}
makeSingleInstance();
//app主进程的事件和方法
app.on('ready', () => {
    createWindow();
    createServer()
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
module.exports = mainWindow;