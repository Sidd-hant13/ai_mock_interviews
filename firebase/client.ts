// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfFBRiXt8rrw3KgQEFsmRMWKELUPI7s-s",
  authDomain: "prepwise-f4a87.firebaseapp.com",
  projectId: "prepwise-f4a87",
  storageBucket: "prepwise-f4a87.firebasestorage.app",
  messagingSenderId: "218721282167",
  appId: "1:218721282167:web:087a7615a7c8437b447e72",
  measurementId: "G-V1BB8M1707"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);