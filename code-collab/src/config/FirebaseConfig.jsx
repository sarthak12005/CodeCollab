
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider, GithubAuthProvider} from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIRE_API_KEY,
    authDomain: import.meta.env.VITE_FIRE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIRE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIRE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIRE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIRE_APP_ID,
    measurementId: import.meta.env.VITE_FIRE_MEASUREMENT_ID
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export {auth, googleProvider, githubProvider};

