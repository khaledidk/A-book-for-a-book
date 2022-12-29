// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore"
import { getDatabase } from 'firebase/database';

import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAlDyxLWQRNVxlX4PTW7uUyMI_52OB43WM",
    authDomain: "a-book-for-book.firebaseapp.com",
    databaseURL: "https://a-book-for-book-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "a-book-for-book",
    storageBucket: "a-book-for-book.appspot.com",
    messagingSenderId: "753287459704",
    appId: "1:753287459704:web:aa707bf183fee1cabcce8d",
    measurementId: "G-QC2T22KS1K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const DBFire = getFirestore(app);
const DBReal = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);
export  { DBReal, DBFire ,app, auth , storage };

