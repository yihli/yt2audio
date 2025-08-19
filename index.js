const { app, BrowserWindow, Menu, ipcRenderer, ipcMain, dialog } = require('electron');
const path = require('path');

const { spawn } = require('child_process');

let mainWindow = undefined;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    mainWindow.loadURL('https://www.youtube.com/');


    // create new menu tab
    let menu = Menu.getApplicationMenu(); // current menu

    // Convert to editable template
    let template = menu.items.map(item => ({
        label: item.label,
        submenu: item.submenu ? item.submenu.items.map(sub => ({
            label: sub.label,
            role: sub.role,
            accelerator: sub.accelerator,
            click: sub.click
        })) : undefined
    }));

    // Add a new menu item under "File"
    template.push({
        label: 'Audio Downloader',
        submenu: [{
            label: 'Download',
            click: () => {
                console.log('Download Audio triggered');
                downloadAudio();
            },
        }]
    });

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
};

const downloadAudio = () => {
    console.log('downloadAudio() called');

    const bounds = mainWindow.getBounds();

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        parent: mainWindow,
        x: bounds.x + bounds.width,
        y: bounds.y,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });


    win.loadFile('index.html');
};

app.whenReady().then(() => {
    createWindow();

    ipcMain.handle('get-current-url', () => {
        return { url: mainWindow.webContents.getURL() }
    });

    ipcMain.handle('open-choose-directory-dialog', () => {
        return dialog.showOpenDialog({ properties: ['openDirectory'] }).then(data => {
            const dataType = {
                canceled: true,
                filePaths: ['']
            }
            console.log(data)
            return data;
        })
    });

    ipcMain.handle('download-audio', (event, { downloadPath, newFileName, url }) => {
        // yt-dlp -t mp3 -o "/path/to/folder/CustomName.%(ext)s" "https://youtube.com/watch?v=VIDEO_ID"
        // exec(`./yt-dlp_linux -t mp3 -o "${downloadPath}/${newFileName}.%(ext)s" "${url}"`, (err, stdout, stderr) => {
        //     if (err) {
        //         console.error('Error:', err);
        //         return;
        //     }
        //     console.log("successfully downloaded");
        //     console.log(stdout);
        //     return;
        // });


        // // old command parameter: `"${downloadPath}/${newFileName}.%(ext)s"`
        // const download = spawn(`./yt-dlp_linux`, [`--max-downloads`, `1`, `--no-playlist`, `-t`, `mp3`, `-o`, `${downloadPath}/${newFileName}`, `${url}`]);

        // // Log stdout as it comes in
        // download.stdout.on("data", (data) => {
        //     console.log(`log: ${data}`);
        // });

        // // Log stderr as it comes in
        // download.stderr.on("data", (data) => {
        //     console.error(`error: ${data}`);
        // });

        // // Handle process exit
        // download.on("close", (code) => {
        //     console.log(`process closed`);
        // });

        console.log(`./yt-dlp_linux -t mp3 -o "${downloadPath}/${newFileName}.%(ext)s" "${url}"`);
    })

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

