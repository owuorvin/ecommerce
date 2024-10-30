import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAhJktKFkuoht1wziutZ1Cn4xCdjhuq_6Q",
  authDomain: "ecommerce-b1856.firebaseapp.com",
  projectId: "ecommerce-b1856",
  storageBucket: "ecommerce-b1856.firebasestorage.app",
  messagingSenderId: "17140459388",
  appId: "1:17140459388:web:b69b1c0571ffa7c088e6f9",
  measurementId: "G-1MQZSMJ73Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };