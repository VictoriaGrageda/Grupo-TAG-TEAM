import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalDificultad from "../assets/ModalDificultad";


export default function Geografia() {
  const [mostrarModal, setMostrarModal] = useState(true);
  const [dificultad, setDificultad] = useState(null);
  const navigate = useNavigate(); //  Importante

  const manejarSeleccion = (nivel) => {
    setDificultad(nivel);
    setMostrarModal(false);
  };

  const manejarCancelar = () => {
    navigate("/"); //  Redirige al home
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-10 flex flex-col items-center justify-center text-center">
      {mostrarModal && (
        <ModalDificultad
          onSelect={manejarSeleccion}
          onClose={manejarCancelar} //  Aquí está el cambio
        />
      )}
      {!mostrarModal && (
        <>
          <h1 className="text-4xl font-bold text-blue-700 mb-4">Categoría: Geografía</h1>
          <p className="text-gray-700 text-lg max-w-xl">
            Dificultad seleccionada: <strong>{dificultad}</strong>
          </p>
        </>
      )}
    </div>
  );
}
