import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDGcqc978tys0cuBlJZ_rZog49DcyVVwMg",
  authDomain: "detodounpoco-9aaec.firebaseapp.com",
  projectId: "detodounpoco-9aaec",
  storageBucket: "detodounpoco-9aaec.firebasestorage.app",
  messagingSenderId: "409710017570",
  appId: "1:409710017570:web:eeaa9519c1fb9b89d35e7b"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta los servicios que usarás
export const db = getFirestore(app);
export const auth = getAuth(app);