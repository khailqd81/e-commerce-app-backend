// Import the functions you need from the SDKs you need
const admin = require("firebase-admin");
const getAnalytics = require('firebase/analytics');
const {getStorage} = require('firebase/storage');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD2dD2tRSn6-mMbsM5an8OcULyHT8-t4dY",
    authDomain: "my-e-commerce-6a736.firebaseapp.com",
    projectId: "my-e-commerce-6a736",
    storageBucket: "my-e-commerce-6a736.appspot.com",
    messagingSenderId: "249268010415",
    appId: "1:249268010415:web:e49d27fe969e62dcdc435a",
    measurementId: "G-XL9QW5NSMB"
};


// Initialize Firebase
admin.initializeApp(firebaseConfig);
// const analytics = getAnalytics.getAnalytics(app);
const storage = admin.storage().bucket();
module.exports = storage;