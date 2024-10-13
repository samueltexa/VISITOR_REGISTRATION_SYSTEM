// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
import firebaseConfig from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.onload = async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const visitorId = urlParams.get("id"); // Get visitor ID from URL

  if (visitorId) {
    await displayVisitorDetails(visitorId);
  } else {
    document.getElementById("visitor-detail").textContent =
      "No visitor selected.";
  }
};

// Function to retrieve visitor details from Firestore
async function displayVisitorDetails(visitorId) {
  try {
    const visitorDocRef = doc(db, "visitors", visitorId);
    const visitorDoc = await getDoc(visitorDocRef);

    if (visitorDoc.exists()) {
      const visitorData = visitorDoc.data();
      const detailDiv = document.getElementById("visitor-detail");

      // Create form elements
      detailDiv.innerHTML = `

    <header>
    </header>  
 <div class="containers">
        <div class="photo-container">
            <img src="${visitorData.photoURL || 'default_photo_url.png'}" alt="Visitor Photo" class="visitor-photo">
        </div>
        <div class="headers">
            <h1>Group Eight Registration System</h1>
            <p>Location: Mabarara</p>
            <p>Phone: (256) 771172-559</p>
            <p>Email: woolardsamuels@gmail.com</p>
        </div>
    </div>
        <header>
        <h1>User Information</h1>
    </header>

      </div>
  

 <fieldset>

 <legend>Personal Information</legend>

            <div class="form-row">
                <div class="fields">
                    <label>First Name</label>
                       <p class="readonly-field">${
                         visitorData.firstName || "N/A"
                       }</p>
                </div>
                <div class="fields">
                    <label>Last Name</label>
                     <p class="readonly-field">${
                       visitorData.lastName || "N/A"
                     }</p>
                </div>
            </div>

              <div class="form-row">
                <div class="fields">
                    <label for="gender">Gender</label>
                     <p class="readonly-field">${
                       visitorData.gender || "N/A"
                     }</p>
                </div>
                <div class="fields">
                    <label for="dob">Date of Birth</label>
                    <p class="readonly-field">${visitorData.dob || "N/A"}</p>
                </div>
            </div>

                       <div class="form-row">
                <div class="fields">
                    <label for="nationality">Nationality</label>
                  <p class="readonly-field">${
                    visitorData.nationality || "N/A"
                  }</p>
                </div>
            </div>

 </fieldset>

   <fieldset>
            <legend>Contact Information</legend>

            <div class="form-row">
                <div class="fields">
                    <label>Phone Number</label>
                 <p class="readonly-field">${visitorData.phone || "N/A"}</p>
                </div>
                <div class="fields">
                    <label>Email Address</label>
                    <p class="readonly-field">${visitorData.email || "N/A"}</p>
                </div>
            </div>

            <div class="form-row">
                <div class="fields">
                    <label>Home Address</label>
                   <p class="readonly-field">${
                     visitorData.homeAddress || "N/A"
                   }</p>
                </div>
                <div class="fields">
                    <label>Emergency Contact (optional)</label>
                   <p class="readonly-field">${
                     visitorData.emergencyContact || "N/A"
                   }</p>
                </div>
            </div>
        </fieldset>

   <fieldset>
            <legend>Visit Information</legend>

            <div class="form-row">
                <div class="fields">
                    <label>Purpose of Visit</label>
                  <p class="readonly-field">${visitorData.purpose || "N/A"}</p>
                </div>
                <div class="fields">
                    <label>Host/Contact Person in the Company</label>
                  <p class="readonly-field">${visitorData.host || "N/A"}</p>
                </div>
            </div>

            <div class="form-row">
                <div class="fields">
                    <label>Estimated Duration</label>
                   <p class="readonly-field">${
                     visitorData.duration || "N/A"
                   }</p>
                </div>
                <div class="fields">
                    <label>Scheduled Meeting Time</label>
                  <p class="readonly-field">${
                    visitorData.scheduleTime || "N/A"
                  }</p>
                </div>
            </div>
        </fieldset>



         <fieldset>
            <legend>Security and Compliance</legend>

            <div class="form-row">
                <div class="fields">
                    <label>Visitor badge number</label>
                   <p class="readonly-field">${
                     visitorData.badgeNumber || "N/A"
                   }</p>
                </div>
                <div class="fields">
                    <label>Entry Time</label>
                  <p class="readonly-field">${
                    visitorData.entryTime || "N/A"
                  }</p>
                </div>
            </div>

            <div class="form-row">
                <div class="fields">
                    <label>Exit Time</label>
                    <p class="readonly-field">${
                      visitorData.exitTime || "N/A"
                    }</p>
                </div>
            </div>
        </fieldset>
            `;
    } else {
      document.getElementById("visitor-detail").textContent =
        "Visitor not found.";
    }
  } catch (error) {
    console.error("Error retrieving visitor details: ", error);
  }
}
