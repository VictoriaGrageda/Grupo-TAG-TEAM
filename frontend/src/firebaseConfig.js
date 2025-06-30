// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ Copiado desde tu configuración
const firebaseConfig = {
  apiKey: "AIzaSyDXfMHD-Y58HNfTN7R9BzG1JKaVUnbwyN8",
  authDomain: "cuestionario-94f27.firebaseapp.com",
  projectId: "cuestionario-94f27",
  storageBucket: "cuestionario-94f27.firebasestorage.app",
  messagingSenderId: "822777600211",
  appId: "1:822777600211:web:a6663cf4ec24e468cedc26",
  measurementId: "G-L5SHX842LY"
};

// Inicializa la app
const app = initializeApp(firebaseConfig);

// Exporta la instancia de Firestore para usarla en otros archivos
export const db = getFirestore(app);
export const storage = getStorage(app);