// Import the functions you need from the SDKs you need
const {initializeApp, getApps, getApp} = require('firebase/app')
const {getFirestore} = require('firebase/firestore')
const {getStorage} = require('firebase/storage')

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_Firebase_apiKey,
  authDomain: process.env.REACT_APP_Firebase_authDomain,
  projectId: process.env.REACT_APP_Firebase_projectId,
  storageBucket: process.env.REACT_APP_Firebase_storageBucket,
  messagingSenderId: process.env.REACT_APP_Firebase_messagingSenderId,
  appId: process.env.REACT_APP_Firebase_appId
};

// Initialize Firebase
const fbapp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore()
const storage = getStorage()

export {fbapp, db, storage}