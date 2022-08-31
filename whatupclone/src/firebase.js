// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAURBLzg9liTVwzIsfarQEfngVnfOvz3JI",
  authDomain: "whatup-application.firebaseapp.com",
  projectId: "whatup-application",
  storageBucket: "whatup-application.appspot.com",
  messagingSenderId: "339114417204",
  appId: "1:339114417204:web:5ef7b8e87b5c38716bfe61",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);