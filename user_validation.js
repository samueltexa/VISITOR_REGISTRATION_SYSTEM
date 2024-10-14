// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
import firebaseConfig from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to validate login form
// Function to validate login form
function validateLoginForm() {
  let isValid = true;

  const username = document.getElementById("login_username");
  const password = document.getElementById("login_password");
  const usernameError = document.getElementById("username_error_message");
  const passwordError = document.getElementById("password_error_message");

  usernameError.textContent = "";
  passwordError.textContent = "";

  if (username.value.trim() === "") {
    usernameError.textContent = "Username is required";
    isValid = false;
  }

  if (password.value.trim() === "") {
    passwordError.textContent = "Password is required";
    isValid = false;
  }

  return isValid;
}

// Function to check network status and enable/disable login button
function checkNetworkStatus() {
  const loginButton = document.getElementById("login-button");
  const networkStatusMessage = document.getElementById("network-status-message");

  if (!navigator.onLine) {
    loginButton.disabled = true;
    networkStatusMessage.textContent = "No network connection. Please check your internet and try again.";
  } else {
    loginButton.disabled = false;
    networkStatusMessage.textContent = ""; // Clear any previous message
  }
}

// Handle login form submission
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const loginButton = document.getElementById("login-button");

  // Check initial network status on page load
  checkNetworkStatus();

  // Listen for network status changes
  window.addEventListener("online", checkNetworkStatus);
  window.addEventListener("offline", checkNetworkStatus);

  loginForm.addEventListener("submit", async (event) => {
    // Check if network is online before proceeding
    if (!navigator.onLine) {
      event.preventDefault();
      document.getElementById("network-status-message").textContent =
        "Network error. Please check your internet connection and try again.";
      return; // Stop submission
    }

    // Validate the form before proceeding
    if (!validateLoginForm()) {
      event.preventDefault();
      return; // Stop if validation fails
    }

    event.preventDefault(); // Prevent default form submission
    const username = document.getElementById("login_username").value;
    const password = document.getElementById("login_password").value;

    loginButton.textContent = "Loading...";
    loginButton.disabled = true;

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].data();
        if (userDoc.password === password) {
          window.location.href = "home.html";
        } else {
          document.getElementById("password_error_message").innerText =
            "Invalid password.";
        }
      } else {
        document.getElementById("username_error_message").innerText =
          "Username not found.";
      }
    } catch (error) {
      console.error("Error logging in:", error);
      document.getElementById("network-status-message").textContent =
        "An unexpected error occurred. Please try again later.";
    } finally {
      loginButton.textContent = "Login";
      loginButton.disabled = false;
    }
  });
});


