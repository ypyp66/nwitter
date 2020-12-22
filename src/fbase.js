import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"; //NoSQL DataBase

const firebaseConfig = {
  apiKey: "AIzaSyCBYvWlaYYNULD2fbDj-oJDq1UeIOJyfIo",
  authDomain: "nwitter-50b7f.firebaseapp.com",
  projectId: "nwitter-50b7f",
  storageBucket: "nwitter-50b7f.appspot.com",
  messagingSenderId: "762366502114",
  appId: "1:762366502114:web:c74b9fa0e157419bb32abb",
  measurementId: "G-8Y4H6GY1YE",
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const dbService = firebase.firestore();
export const authService = firebase.auth();
