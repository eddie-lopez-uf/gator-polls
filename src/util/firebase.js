// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// define firebase config
const firebaseConfig = {};
firebaseConfig.apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
firebaseConfig.authDomain = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
firebaseConfig.projectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;
firebaseConfig.storageBucket = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
firebaseConfig.messagingSenderId =
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
firebaseConfig.appId = process.env.REACT_APP_FIREBASE_APP_ID;

// check that none of the config values are undefined
Object.keys(firebaseConfig).forEach((key) => {
    if (firebaseConfig[key] === undefined) {
        throw new Error(`Firebase config value for "${key}" is undefined`);
    }
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
