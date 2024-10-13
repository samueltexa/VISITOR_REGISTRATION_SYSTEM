// Import Firebase modules
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, getMetadata } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-storage.js"; // Import Firebase Storage
import firebaseConfig from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage

const userId = 'AgDVB2e8cRNsqbCRmj7e'; // This should ideally be dynamically retrieved

window.attachFormListener = function() {
    const form = document.getElementById('user-form');
    const passwordField = document.getElementById('password');
    const passwordErrorMessage = document.getElementById('password_error_message');
    const photoField = document.getElementById('photo'); // Get the photo input field
    const updateButton = document.querySelector('.update-btn'); // Get the update button

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default form submission
            updateButton.textContent = 'Updating...'; // Change button text to indicate loading
            updateButton.disabled = true; // Optionally disable the button

            await updateUserProfile(passwordField, passwordErrorMessage, photoField); // Pass the loading message as a parameter
            
            updateButton.textContent = 'Update'; // Reset button text after the update
            updateButton.disabled = false; // Re-enable the button
        });
    } else {
        console.error("Form element not found."); // Log the error for debugging
    }
}

// Function to handle user profile update
async function updateUserProfile(passwordField, passwordErrorMessage, photoField) {
    // Clear previous error messages
    passwordErrorMessage.textContent = '';

    // Check if password is empty
    if (!passwordField.value) {
        passwordErrorMessage.textContent = 'Password is required.';
        passwordErrorMessage.style.color = 'red';
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
            if (userData.password !== passwordField.value) {
                passwordErrorMessage.textContent = 'Incorrect password. Please try again.';
                passwordErrorMessage.style.color ='red';
                return; // Stop execution if password doesn't match
            }

            // Prepare update data (only update fields that are filled out)
            const updatedData = {};
            const firstNameField = document.getElementById('first-name');
            const lastNameField = document.getElementById('last-name');
            const emailField = document.getElementById('email');
            const nationalIdField = document.getElementById('national-id');
            const addressField = document.getElementById('address');

            if (firstNameField.value) updatedData.firstName = firstNameField.value;
            if (lastNameField.value) updatedData.lastName = lastNameField.value;
            if (emailField.value) updatedData.email = emailField.value;
            if (nationalIdField.value) updatedData.nationalId = nationalIdField.value;
            if (addressField.value) updatedData.address = addressField.value;

            // Handle photo upload if a file is selected
            if (photoField.files.length > 0) {
                const photoFile = photoField.files[0];
                const storageRef = ref(storage, `profile_pictures/${userId}/current_photo.jpg`); // Create a reference for the new photo

                // Check if the old photo exists
                try {
                    await getMetadata(storageRef); // Attempt to get metadata for the old photo
                    // If successful, delete the old photo
                    await deleteObject(storageRef);
                } catch (error) {
                    if (error.code === 'storage/object-not-found') {
                        console.warn("Old photo does not exist, proceeding to upload the new one.");
                    } else {
                        console.error("Error checking for old photo:", error);
                    }
                }

                // Upload the new file to Firebase Storage
                await uploadBytes(storageRef, photoFile);
                const photoURL = await getDownloadURL(storageRef); // Get the download URL of the uploaded file

                // Add photo URL to updatedData
                updatedData.photoURL = photoURL; // Assuming you have a photoURL field in Firestore
            }

            // Update Firestore user document
            await updateDoc(userRef, updatedData);
            passwordErrorMessage.textContent = 'User profile updated successfully!'; // Success message
            passwordErrorMessage.style.color = 'green'; // Change color to indicate success
        } else {
            passwordErrorMessage.textContent = "User not found."; // Handle case where user doesn't exist
        }
    } catch (error) {
        console.error("Error updating document: ", error);
        passwordErrorMessage.textContent = "An error occurred while updating the profile."; // Error handling
    }
}
