const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getCurrentURL: () => ipcRenderer.invoke('get-current-url'),
    openChooseDirectoryDialog: () => ipcRenderer.invoke('open-choose-directory-dialog'),
    downloadAudio: (object) => ipcRenderer.invoke('download-audio', object)
})