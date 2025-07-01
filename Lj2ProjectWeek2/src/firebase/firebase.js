// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase-configuratie van jouw project
const firebaseConfig = {
    apiKey: "AIzaSyB9HRXizvnSPsifAaRC2elzTFVio-ezHYM",
    authDomain: "lj2projectweek2.firebaseapp.com",
    projectId: "lj2projectweek2",
    storageBucket: "lj2projectweek2.firebasestorage.app",
    messagingSenderId: "915295700635",
    appId: "1:915295700635:web:375a921b0d842670c7283e"
};

// Firebase initialiseren
const app = initializeApp(firebaseConfig);

// Diensten ophalen
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Exporteren om in de rest van je app te gebruiken
export { db, auth, storage };
