// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAoG2vkl8G0D_m6FWTPMEvmmM_LDlKM2k",
  authDomain: "questlog-e78a8.firebaseapp.com",
  projectId: "questlog-e78a8",
  storageBucket: "questlog-e78a8.firebasestorage.app",
  messagingSenderId: "539176206910",
  appId: "1:539176206910:web:8fde7b0879ee235d5a076f",
  measurementId: "G-V9VJ5BVWG6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app); // This initializes Firebase Authentication
export { auth };
