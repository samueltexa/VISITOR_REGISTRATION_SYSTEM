window.attachFormListener =function() {
    const form = document.getElementById('account');
    if (form) {
        form.addEventListener('submit', validateForm);
    } else {
        console.error("Form element not found."); // Log the error for debugging
    }
}

async function validateForm(event) {
    event.preventDefault(); // Prevent form submission
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const errorMessageDiv = document.getElementById('error-message');

    // Clear previous error messages
    errorMessageDiv.textContent = '';

    // Validate input
    if (firstName === '' || lastName === '') {
        errorMessageDiv.textContent = 'Both fields are required.';
        return false; // Validation failed
    }

    // Check if the names are valid (only letters allowed)
    const namePattern = /^[A-Za-z]+$/;
    if (!namePattern.test(firstName) || !namePattern.test(lastName)) {
        errorMessageDiv.textContent = 'Names must contain only letters.';
        return false; // Validation failed
    }

    // Form is valid
    console.log("Form is valid!"); // For demonstration
}

// If you're going to dynamically load content, 
// do not call this function here; it will be called in loadContent.
