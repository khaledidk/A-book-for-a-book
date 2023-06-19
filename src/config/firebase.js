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
    apiKey: "AIzaSyDxXALvwsTsRZpGZliusOq5ar9bfbl-LzM",
    authDomain: "a-book-for-a-book-7bb81.firebaseapp.com",
    databaseURL: "https://a-book-for-a-book-7bb81-default-rtdb.firebaseio.com",
    projectId: "a-book-for-a-book-7bb81",
    storageBucket: "a-book-for-a-book-7bb81.appspot.com",
    messagingSenderId: "133158748554",
    appId: "1:133158748554:web:7c14ea1828834ab03e4873",
    measurementId: "G-EKM93PKSWK"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const DBFire = getFirestore(app);
const DBReal = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { DBReal, DBFire, app, auth, storage };

