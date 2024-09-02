// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCxaFk8uPcHnLY04WXkqO2PFDZpSnLMjkA",
  authDomain: "user-email-password-auth-14ce4.firebaseapp.com",
  projectId: "user-email-password-auth-14ce4",
  storageBucket: "user-email-password-auth-14ce4.appspot.com",
  messagingSenderId: "370927057472",
  appId: "1:370927057472:web:6b7f7cffca471e65f9bda5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth= getAuth(app);

// export default app;
export default auth;