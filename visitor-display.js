// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
import firebaseConfig from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.attachFormListenerss = async function() {
    const visitorList = document.getElementById('visitor-list'); 
    visitorList.innerHTML = ''; 

    await displayVisitors(visitorList); 
}
// Function to retrieve visitor data from Firestore and display it
async function displayVisitors(visitorList) {
    try {
        const visitorCollectionRef = collection(db, "visitors");
        const visitorSnapshot = await getDocs(visitorCollectionRef);

        visitorSnapshot.forEach((doc) => {
            const visitorData = doc.data();
            const row = document.createElement('tr');

            row.setAttribute('data-id', doc.id);

            // Create table cells for each data field
            const photoCell = document.createElement('td');
            const firstNameCell = document.createElement('td');
            const lastNameCell = document.createElement('td');
            const nationalityCell = document.createElement('td');
            const emailCell = document.createElement('td');

            // Set cell values based on the visitor data
            if (visitorData.photoURL) {
                const img = document.createElement('img');
                img.src = visitorData.photoURL;
                img.style.width = '50px'; 
                img.style.height = '50px';
                photoCell.appendChild(img);
            } else {
                photoCell.textContent = "No Photo";
            }

            firstNameCell.textContent = visitorData.firstName || "N/A";
            lastNameCell.textContent = visitorData.lastName || "N/A";
            nationalityCell.textContent = visitorData.nationality || "N/A";
            emailCell.textContent = visitorData.email || "N/A";

            // Append cells to the row
            row.appendChild(photoCell);
            row.appendChild(firstNameCell);
            row.appendChild(lastNameCell);
            row.appendChild(nationalityCell);
            row.appendChild(emailCell);

            // Append the row to the table body
            visitorList.appendChild(row);

            row.addEventListener('click', () => {
                window.location.href = `visitor-detail.html?id=${doc.id}`;
            });
        });
    } catch (error) {
        console.error("Error retrieving visitor data: ", error);
    }
}
