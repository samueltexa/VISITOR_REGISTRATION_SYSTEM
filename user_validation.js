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

// Handle login
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("login-form")
    .addEventListener("submit", async (event) => {
      // Validate the form before proceeding
      if (!validateLoginForm()) {
        event.preventDefault();
        return; // Stop here if validation fails
      }

      event.preventDefault(); // Prevent default form submission
      const username = document.getElementById("login_username").value;
      const password = document.getElementById("login_password").value;

      const loginButton = event.target.querySelector("button");
      // Change button text to "Loading..."
      loginButton.textContent = "Loading...";
      loginButton.disabled = true; // Disable the button

      try {
        // Check if username exists in Firestore
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0].data();

          // Verify the password (this is a simple example; in a real application,
          // passwords should be hashed and verified through a secure method)
          if (userDoc.password === password) {
            window.location.href = "home.html";
            // Redirect or do something after successful login
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
      } finally {
        // Reset button state after processing
        loginButton.textContent = "Login";
        loginButton.disabled = false;
      }
    });
});
