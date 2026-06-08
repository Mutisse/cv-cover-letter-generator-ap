// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhnPPF9Lnxuvk9uuS97g66QnxSnM3Ycag",
  authDomain: "cv-osorio.firebaseapp.com",
  projectId: "cv-osorio",
  storageBucket: "cv-osorio.firebasestorage.app",
  messagingSenderId: "1063539341503",
  appId: "1:1063539341503:web:7677f29dabf0965c6eae0a",
  measurementId: "G-8FSGN7S8KH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
