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
    apiKey: "AIzaSyBOTSiaTFlWUqRJvEUa9v9AVy7OaprGkiA",
    authDomain: "bookforbook-7dec4.firebaseapp.com",
    projectId: "bookforbook-7dec4",
    storageBucket: "bookforbook-7dec4.appspot.com",
    messagingSenderId: "569934775016",
    appId: "1:569934775016:web:049be6c3cc4705276c7f5d",
    measurementId: "G-SQGXTR8PZ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const DBFire = getFirestore(app);
const DBReal = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { DBReal, DBFire, app, auth, storage };

