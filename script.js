// get URL of the browser tab where user pressed download
window.electronAPI.getCurrentURL().then(data => {
    console.log('window.electronAPI.getCurrentURL()');
    document.getElementById('AudioDownloaderHeader').innerText = data.url;
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

    // trim whitespace of new name
    const downloadPath = document.getElementById('AudioDownloaderChooseDirectoryInput').value;
    const newFileName = document.getElementById('AudioDownloaderRenameInput').value.trim();
    const urlToDownload = document.getElementById('AudioDownloaderHeader').innerText;

    // disable button 
    document.getElementById('AudioDownloaderSubmitButton').disabled = true;

    window.electronAPI.downloadAudio({ downloadPath, newFileName, url: urlToDownload });
});