import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// Import the functions you need from the SDKs you need

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzqqufngV0oTdbCjfTzj0iF051M3PuBvg",
  authDomain: "journal-app-2021.firebaseapp.com",
  projectId: "journal-app-2021",
  storageBucket: "journal-app-2021.appspot.com",
  messagingSenderId: "545622593771",
  appId: "1:545622593771:web:7cc02bcca3f8376bee6eae",
  measurementId: "G-SK8R4V67NJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const googleAuthProvider = new GoogleAuthProvider()

export {
    db,
    googleAuthProvider
}