function loadContent(page) {
    fetch(page)
        .then(response => response.text())
        .then(data => {
            document.getElementById('form-container').innerHTML = data;
        })
        .catch(error => {
            document.getElementById('form-container').innerHTML = "<p>Error loading content.</p>";
        });
}

window.loadContent = loadContent;