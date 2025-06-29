// src/pages/categorias/ListaCuestionarios.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function ListaCuestionarios() {
  const { categoria } = useParams();
  const [preguntas, setPreguntas] = useState([]);

  useEffect(() => {
    const obtenerPreguntas = async () => {
      try {
        const q = query(
          collection(db, "cuestionarios"),
          where("categoria", "==", categoria)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPreguntas(data);
      } catch (error) {
        console.error("Error al obtener preguntas:", error);
      }
    };

    obtenerPreguntas();
  }, [categoria]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Categoría: {categoria}</h2>
      {preguntas.length === 0 ? (
        <p>No hay preguntas aún en esta categoría.</p>
      ) : (
        <ul className="space-y-4">
          {preguntas.map((pregunta, index) => (
            <li key={index} className="border p-4 rounded shadow">
              <p className="font-semibold">{pregunta.enunciado}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

