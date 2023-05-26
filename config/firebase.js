// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const {getAuth} = require("firebase/auth");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyozN0fUvcZiRyXv8fN4F_wH4EtZO2Aqg",
  authDomain: "campus-818f1.firebaseapp.com",
  projectId: "campus-818f1",
  storageBucket: "campus-818f1.appspot.com",
  messagingSenderId: "307753471218",
  appId: "1:307753471218:web:6a592749585f50dfc8546b",
  measurementId: "G-RETT0E7VH8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
module.exports = {
    app,
    auth
}