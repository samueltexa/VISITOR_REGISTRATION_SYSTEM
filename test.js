
function validateForm(event) {
    event.preventDefault(); // Prevent form submission

    const passwordErrorMessage = document.getElementById('password_error_message');
    const password = document.getElementById('password');

    if (!password.value) {
        if (passwordErrorMessage) {
            passwordErrorMessage.textContent = 'Password is requireds.';
            passwordErrorMessage.style.color = 'red';
        }
        return; 
    }
}

window.validateForm = validateForm;