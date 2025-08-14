window.electronAPI.getCurrentURL().then(data => {
    document.getElementById('header').innerText = data.url;
});

