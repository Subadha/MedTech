// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-5A5Pi_YH998oslbv8ffbPYiBPHJBT7I",
  authDomain: "medtech-42a96.firebaseapp.com",
  projectId: "medtech-42a96",
  storageBucket: "medtech-42a96.appspot.com",
  messagingSenderId: "714173863142",
  appId: "1:714173863142:web:16aacf195a41f894d25727",
  measurementId: "G-YTG9YGW614"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);