// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"; // Importa Firestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCiv14tevJYy7ydm8XSoq4RYPmCMBsDehk",
  authDomain: "appstore-841d0.firebaseapp.com",
  projectId: "appstore-841d0",
  storageBucket: "appstore-841d0.firebasestorage.app",
  messagingSenderId: "732920288253",
  appId: "1:732920288253:web:4c3e04d33fe315e9d77f94"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

export const db = getFirestore(app); // Exporta Firestore

