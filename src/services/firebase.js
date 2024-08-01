// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "movieapp-imdbclone.firebaseapp.com",
  projectId: "movieapp-imdbclone",
  storageBucket: "movieapp-imdbclone.appspot.com",
  messagingSenderId: "280452417128",
  appId: "1:280452417128:web:8c2b97599d68d15b249ddd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
