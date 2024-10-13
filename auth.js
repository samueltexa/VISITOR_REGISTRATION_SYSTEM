// Firebase Authentication Listener to get current user
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, show their name
        const displayName = user.displayName || user.email; // Use displayName or email as fallback
        document.getElementById('profile_name').textContent = displayName;
    } else {
        // No user is signed in, redirect to login
        window.top.location.href = 'index.html';
    }
});
