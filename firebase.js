// Import the functions you need from the SDKs you need
const {initializeApp, getApps, getApp} = require('firebase/app')
const {getFirestore} = require('firebase/firestore')
const {getStorage} = require('firebase/storage')
const dotEnv = require('dotenv')
dotEnv.config()

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.Firebase_apiKey,
  authDomain: process.env.Firebase_authDomain,
  projectId: process.env.Firebase_projectId,
  storageBucket: process.env.Firebase_storageBucket,
  messagingSenderId: process.env.Firebase_messagingSenderId,
  appId: process.env.Firebase_appId
};

// Initialize Firebase
const fbapp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore()
const storage = getStorage()
module.exports = {fbapp, db, storage}