// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvWzm7mvehn_pWZNfnP4Wj9UUJX9DhDtk",
  authDomain: "task-management-board-4ab08.firebaseapp.com",
  projectId: "task-management-board-4ab08",
  storageBucket: "task-management-board-4ab08.appspot.com",
  messagingSenderId: "340064191559",
  appId: "1:340064191559:web:46a76d7cda7bbfba235d62",
  measurementId: "G-K98R252KEE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
