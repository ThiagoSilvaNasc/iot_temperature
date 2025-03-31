import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDsXAAlvWQpoivQxpcJht9rh1aGglXDCW8",
    authDomain: "esp32-309d2.firebaseapp.com",
    databaseURL: "https://esp32-309d2-default-rtdb.firebaseio.com",
    projectId: "esp32-309d2",
    storageBucket: "esp32-309d2.firebasestorage.app",
    messagingSenderId: "132334621417",
    appId: "1:132334621417:web:defeb743b09d836dad5678"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, onValue };
