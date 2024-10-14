// Function to display the offline message
function showOfflineMessage() {
    const statusDiv = document.getElementById('network-status');
    statusDiv.style.display = 'block';  // Show the message
}

// Function to hide the offline message
function hideOfflineMessage() {
    const statusDiv = document.getElementById('network-status');
    statusDiv.style.display = 'none';  // Hide the message
}

// Detect when the user goes offline
window.addEventListener('offline', showOfflineMessage);

// Detect when the user comes back online
window.addEventListener('online', hideOfflineMessage);

// Check initial status when the page loads
if (!navigator.onLine) {
    showOfflineMessage();
} else {
    hideOfflineMessage();
}
