import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDdMEocfdhlskp6yAQ7HYKI934Vxn44_Ds",
  authDomain: "semana5db.firebaseapp.com",
  projectId: "semana5db",
  storageBucket: "semana5db.firebasestorage.app",
  messagingSenderId: "241602209671",
  appId: "1:241602209671:web:184b6ca32968d872039522",
  databaseURL: "https://semana5db-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);
export const storage = getStorage(app);
