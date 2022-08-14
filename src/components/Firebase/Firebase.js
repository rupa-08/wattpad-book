import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD66xoqXHoHHnK2y-TDdB9BBUW_7yXCH_M",
  authDomain: "wattpad-book.firebaseapp.com",
  projectId: "wattpad-book",
  storageBucket: "wattpad-book.appspot.com",
  messagingSenderId: "707083473152",
  appId: "1:707083473152:web:431c9e0b8e46115ea0a3e5",
  measurementId: "G-K7C8J1102G",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
