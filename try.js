// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-storage.js";
import firebaseConfig from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore
const storage = getStorage(app); // Initialize Firebase Storage

// Attach form listener function
window.attachFormListener = function() {
    const form = document.getElementById('visitor-form');
    const updateButton = document.querySelector('.update-btn');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default form submission
            updateButton.textContent = 'Updating...'; // Change button text to indicate loading
            updateButton.disabled = true; // Optionally disable the button

            await handleSubmit(); // Call the handleSubmit function
            
            updateButton.textContent = 'Update'; // Reset button text after the update
            updateButton.disabled = false; // Re-enable the button
        });
    } else {
        console.error("Form element not found."); // Log the error for debugging
    }
};

// Function to handle form submission
async function handleSubmit() {
    // Get the form elements
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const gender = document.getElementById('gender').value;
    const dob = document.getElementById('dob').value;
    const nationality = document.getElementById('nationality').value;
    const photo = document.getElementById('photo').files[0]; // To handle file uploads
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const homeAddress = document.getElementById('home-address').value.trim();
    const emergencyContact = document.getElementById('emergency').value.trim();
    const purpose = document.getElementById('purpose').value.trim();
    const host = document.getElementById('host').value.trim();
    const scheduleTime = document.getElementById('schedule_time').value;
    const badgeNumber = document.getElementById('badge_number').value.trim();
    const entryTime = document.getElementById('entry').value;
    const exitTime = document.getElementById('exit').value;

    // Validate required fields (first name, last name, nationality)
    if (!firstName || !lastName || !nationality) {
        alert('First Name, Last Name, and Nationality are required.');
        return; // Stop submission if validation fails
    }

    const updateButton = document.querySelector('.update-btn');
    updateButton.textContent = 'Saving...'; // Change button text to show loading
    updateButton.disabled = true; // Disable the button

    try {
        // Document reference
        const visitorDocRef = doc(db, "visitors", `${firstName}-${lastName}-${Date.now()}`);

        // Prepare visitor data
        const visitorData = {
            firstName,
            lastName,
            gender,
            dob,
            nationality,
            phone,
            email,
            homeAddress,
            emergencyContact,
            purpose,
            host,
            scheduleTime,
            badgeNumber,
            entryTime,
            exitTime,
        };

        // Upload photo if a file was selected
        if (photo) {
            const storageRef = ref(storage, `visitor_photos/${firstName}-${lastName}-${Date.now()}`);
            await uploadBytes(storageRef, photo); // Upload the photo
            const photoURL = await getDownloadURL(storageRef); // Get the photo URL
            visitorData.photoURL = photoURL; // Add photo URL to the visitor data
        }

        // Save the visitor data in Firestore
        await setDoc(visitorDocRef, visitorData);

        alert("Visitor data saved successfully!");
    } catch (error) {
        console.error("Error adding visitor: ", error);
        alert("Error submitting form: " + error.message);
    } finally {
        updateButton.textContent = 'Update'; // Reset button text after the update
        updateButton.disabled = false; // Re-enable the button
    }
}

// Call the function to attach the form listener
attachFormListener();
