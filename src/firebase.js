// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAZqr3kbYYiF_vWe1GNXSl61Y8z4p6EKLg",
    authDomain: "reels-bf341.firebaseapp.com",
    projectId: "reels-bf341",
    storageBucket: "reels-bf341.appspot.com",
    messagingSenderId: "630187545309",
    appId: "1:630187545309:web:456fb9771c6dcdfd71c134"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth =firebase.auth() 
let firestore = firebase.firestore()
export const database = {
  users: firestore.collection('users'),
  posts: firestore.collection('posts'),
  getTimeStamp: firebase.firestore.FieldValue.serverTimestamp()
}

export const storage = firebase.storage()