import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBvWzm7mvehn_pWZNfnP4Wj9UUJX9DhDtk",
  authDomain: "task-management-board-4ab08.firebaseapp.com",
  projectId: "task-management-board-4ab08",
  storageBucket: "task-management-board-4ab08.appspot.com",
  messagingSenderId: "340064191559",
  appId: "1:340064191559:web:46a76d7cda7bbfba235d62",
  measurementId: "G-K98R252KEE",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export default db;
