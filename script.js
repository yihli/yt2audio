// get URL where user pressed download
window.electronAPI.getCurrentURL().then(data => {
    console.log('window.electronAPI.getCurrentURL()');
    document.getElementById('AudioDownloaderHeader').innerText += ' ' + data.url;
});

document.getElementById('AudioDownloaderChooseDirectoryButton').addEventListener('click', () => {
    console.log('AudioDownloadOpenDirectoryButton clicked');

    // user picks a directory to download to 
    window.electronAPI.openChooseDirectoryDialog().then(data => {
        console.log('window.electronAPI.openChooseDirectoryDialog() clicked');

        document.getElementById('AudioDownloaderChooseDirectoryInput').value = data.filePaths[0];
    });
});

document.getElementById('AudioDownloaderSubmitButton').addEventListener('click', () => {
    console.log('AudioDownloaderSubmitButton clicked');
    window.electronAPI.downloadAudio("", "");
});