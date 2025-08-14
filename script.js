window.electronAPI.getCurrentURL().then(data => {
    console.log('window.electronAPI.getCurrentURL()');
    document.getElementById('header').innerText = data.url;
});

document.getElementById('AudioDownloadOpenDirectoryButton').addEventListener('click', () => {
    console.log('AudioDownloadOpenDirectoryButton clicked');
    window.electronAPI.openChooseDirectoryDialog().then(data => {
        console.log('window.electronAPI.openChooseDirectoryDialog() clicked')
        document.getElementById('header').innerText = data.filePaths[0];
    });
});