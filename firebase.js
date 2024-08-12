import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC5Bd4VeooSyVQstWvIwC8l58uE5XLZJQI",
    authDomain: "flashcard-saas-48df9.firebaseapp.com",
    projectId: "flashcard-saas-48df9",
    storageBucket: "flashcard-saas-48df9.appspot.com",
    messagingSenderId: "776106904177",
    appId: "1:776106904177:web:8eabbe9ec8bc25fe9ea9d0"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;