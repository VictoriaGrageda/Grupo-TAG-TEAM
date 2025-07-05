// utils/subirImagen.js
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";

export async function subirImagen(nombre, archivo) {
  const storageRef = ref(storage, `imagenes/${Date.now()}-${nombre}`);
  await uploadBytes(storageRef, archivo);
  return await getDownloadURL(storageRef);
}
