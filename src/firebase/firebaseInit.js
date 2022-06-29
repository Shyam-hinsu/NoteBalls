// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAsDsbBHHjfLd5iWF3TSn7aP8yihFlowM",
  authDomain: "noteballs-a3a77.firebaseapp.com",
  projectId: "noteballs-a3a77",
  storageBucket: "noteballs-a3a77.appspot.com",
  messagingSenderId: "870096575330",
  appId: "1:870096575330:web:e6b435f975dbeedabf2a3b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { db, auth };
