// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBVzOndwLMVuZpt9aBzJfUCGSvhmQl95bQ",
    authDomain: "meuapp-aba75.firebaseapp.com",
    databaseURL: "https://meuapp-aba75-default-rtdb.firebaseio.com",
    projectId: "meuapp-aba75",
    storageBucket: "meuapp-aba75.appspot.com",
    messagingSenderId: "654568322064",
    appId: "1:654568322064:web:78b95f5bd5890d16088695",
    measurementId: "G-TKRXFLJTL9",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const FIREBASE_DB = getDatabase()
export const FIREBASE_AUTH = getAuth(app)
