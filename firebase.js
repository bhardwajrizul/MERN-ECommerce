// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth"

let app = null;
let auth = null;

const firebaseConfig = {
    apiKey: "AIzaSyBCiHxFeqOQqI4_ZKmBBiMNZIIuxFh2f3s",
    authDomain: "mern-ecommerce-firebase.firebaseapp.com",
    projectId: "mern-ecommerce-firebase",
    storageBucket: "mern-ecommerce-firebase.appspot.com",
    messagingSenderId: "1089499623792",
    appId: "1:1089499623792:web:8c1d47c31e5a3120d0dfb5",
    measurementId: "G-JGX72BY61T"
};
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app)
}


export { auth, app };