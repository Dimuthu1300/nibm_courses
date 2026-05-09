import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyC7r_vUtZasjz8meo-2Jv8qQaA_Umxggc0",
    authDomain: "nibm-web-app.firebaseapp.com",
    projectId: "nibm-web-app",
    storageBucket: "nibm-web-app.firebasestorage.app",
    messagingSenderId: "277708820057",
    appId: "1:277708820057:web:ced227418ed5312117ab48",
    measurementId: "G-P1YB0QYHF0"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);