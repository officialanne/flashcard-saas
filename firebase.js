import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
    apiKey: "AIzaSyCx7KlDatrgzNP4pI6WvZV5acap98ICcJo",
    authDomain: "flashcard-saas-d9af2.firebaseapp.com",
    projectId: "flashcard-saas-d9af2",
    storageBucket: "flashcard-saas-d9af2.appspot.com",
    messagingSenderId: "745584584962",
    appId: "1:745584584962:web:1db2c0ce70c3e5b2933a1b",
    measurementId: "G-WDEG5HY6MP"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
export default db;
