// Import Firebase modules
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-storage.js"; // Import Firebase Storage
import firebaseConfig from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

window.attachFormListeners = function() {
    const form = document.getElementById('visitor-form');
    // const updateButton = document.querySelector('.update-btn');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
// Call the function to update user profile
            await updateUserProfile(); 

        });
    } else {
        console.error("Form element not found.");
    }
}

// Function to handle user profile update
async function updateUserProfile() {
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const gender = document.getElementById('gender').value;
    const dob = document.getElementById('dob').value;
    const nationality = document.getElementById('nationality').value;
    const photo = document.getElementById('photo').files[0];
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const homeAddress = document.getElementById('home-address').value.trim();
    const emergencyContact = document.getElementById('emergency').value.trim();
    const purpose = document.getElementById('purpose').value.trim();
    const host = document.getElementById('host').value.trim();
    const duration = document.getElementById('duration').value.trim();
    const scheduleTime = document.getElementById('schedule_time').value;
    const badgeNumber = document.getElementById('badge_number').value.trim();
    const entryTime = document.getElementById('entry').value;
    const exitTime = document.getElementById('exit').value;

    // Validate required fields (first name, last name, nationality)
    if (!firstName || !lastName || !nationality) {
        alert('First Name, Last Name, and Nationality are required.');
        return;
    }

    const updateButton = document.querySelector('.update-btn');
    updateButton.textContent = 'Saving...';
    updateButton.disabled = true;

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
            duration,
            scheduleTime,
            badgeNumber,
            entryTime,
            exitTime,
        };

        // Upload photo if a file was selected
        if (photo) {
            const storageRef = ref(storage, `visitor_photos/${firstName}-${lastName}-${Date.now()}`);
            await uploadBytes(storageRef, photo); 
            const photoURL = await getDownloadURL(storageRef);
            visitorData.photoURL = photoURL;
        }

        // Save the visitor data in Firestore
        await setDoc(visitorDocRef, visitorData);

        alert("Visitor data saved successfully!");
    } catch (error) {
        console.error("Error adding visitor: ", error);
        alert("Error submitting form: " + error.message);
    } finally {
        updateButton.textContent = 'Update';
        updateButton.disabled = false;
    }
}
