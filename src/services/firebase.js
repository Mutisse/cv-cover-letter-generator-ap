import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
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

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;