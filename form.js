import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
import firebaseConfig from "./firebase-config.js";
document.addEventListener('DOMContentLoaded', () => {
    // Import Firebase modules
  

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Reference to the form and fields
    const form = document.querySelector('form');
    const firstNameField = document.getElementById('first-name');
    const lastNameField = document.getElementById('last-name');
    const emailField = document.getElementById('email');
    const nationalIdField = document.getElementById('national-id');
    const addressField = document.getElementById('address');
    const passwordField = document.getElementById('password');
    const passwordErrorMessage = document.getElementById('password_error_message');

    const userId = 'AgDVB2e8cRNsqbCRmj7e';

    // The form submit function
    async function handleSubmit(e) {
        e.preventDefault();

        // Clear previous error messages
        if (passwordErrorMessage) passwordErrorMessage.textContent = '';

        // Check if password is empty
        if (!passwordField.value) {
            if (passwordErrorMessage) {
                passwordErrorMessage.textContent = 'Password is required.';
                passwordErrorMessage.style.color = 'red';
            }
            return; // Stop execution if password is empty
        }

        try {
            // Reference to the user document
            const userRef = doc(db, "users", userId);
            const userSnap = await getDoc(userRef); // Fetch the user document

            // Check if the document exists
            if (userSnap.exists()) {
                const userData = userSnap.data();

                // Verify the current password matches
                if (userData.password !== password.value) {
                    if (passwordErrorMessage) passwordErrorMessage.textContent = 'Incorrect password. Please try again.';
                    return; // Stop execution if password doesn't match
                }

                // Prepare update data (only update fields that are filled out)
                const updatedData = {};
                if (firstNameField.value) updatedData.firstName = firstNameField.value;
                if (lastNameField.value) updatedData.lastName = lastNameField.value;
                if (emailField.value) updatedData.email = emailField.value;
                if (nationalIdField.value) updatedData.nationalId = nationalIdField.value;
                if (addressField.value) updatedData.address = addressField.value;

                // Update Firestore user document
                await updateDoc(userRef, updatedData);
                if (passwordErrorMessage) {
                    passwordErrorMessage.textContent = 'User profile updated successfully!'; // Success message
                    passwordErrorMessage.style.color = 'green'; // Change color to indicate success
                }
            } else {
                if (passwordErrorMessage) passwordErrorMessage.textContent = "User not found."; // Handle case where user doesn't exist
            }
        } catch (error) {
            console.error("Error updating document: ", error);
            if (passwordErrorMessage) passwordErrorMessage.textContent = "An error occurred while updating the profile."; // Error handling
        }
    }

    // Attach the form submit function to the window object
    window.handleSubmit = handleSubmit;

    // Listen for the form submit event
    if (form) form.addEventListener('submit', handleSubmit);
});
