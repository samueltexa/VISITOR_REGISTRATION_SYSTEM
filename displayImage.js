import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
import firebaseConfig from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Reference to a specific user (Replace with dynamic logic as needed)
const userId = 'AgDVB2e8cRNsqbCRmj7e';

async function displayUserImage() {
    try {
        // Reference to the user document in Firestore
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        // Check if user data exists
        if (userSnap.exists()) {
            const userData = userSnap.data();
            
            // Get the image URL from the Firestore user data
            const imageUrl = userData.photoURL;

            // Get the image element from the HTML
            const imgElement = document.getElementById('user_image');
            
            if (imageUrl) {
                // Set the image URL to the img element's src attribute
                imgElement.src = imageUrl;
            } else {
                console.log("No image URL found for this user.");
            }
        } else {
            console.log("User not found.");
        }
    } catch (error) {
        console.error("Error fetching user data: ", error);
    }
}

// Attach the function to the window object for global access
window.displayUserImage = displayUserImage;
