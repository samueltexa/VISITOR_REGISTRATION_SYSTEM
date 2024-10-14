function showOfflineMessage() {
    const statusDiv = document.getElementById('network-status');
    statusDiv.style.display = 'block';
}

function hideOfflineMessage() {
    const statusDiv = document.getElementById('network-status');
    statusDiv.style.display = 'none';
}

window.onoffline = function() {
    showOfflineMessage();
};

window.ononline = function() {
    hideOfflineMessage();
};

if (!navigator.onLine) {
    showOfflineMessage();
}
