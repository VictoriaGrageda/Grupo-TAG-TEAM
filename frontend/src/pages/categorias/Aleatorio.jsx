import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalDificultad from "../../assets/ModalDificultad";
import "../../assets/aleatorio.css";

export default function Aleatorio() {
  const [mostrarModal, setMostrarModal] = useState(true);
  const [dificultad, setDificultad] = useState(null);
  const navigate = useNavigate();

  const manejarSeleccion = (nivel) => {
    setDificultad(nivel);
    setMostrarModal(false);
  };

  const manejarCancelar = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-300 p-10 flex flex-col items-center justify-center text-center">
      {mostrarModal && (
        <ModalDificultad onSelect={manejarSeleccion} onClose={manejarCancelar} />
      )}
      {!mostrarModal && (
        <>
          <h1 className="text-4xl font-bold text-yellow-700 mb-4">Categoría: Aleatorio</h1>
          <p className="text-gray-700 text-lg max-w-xl">
            Dificultad seleccionada: <strong>{dificultad}</strong>
          </p>
        </>
      )}
    </div>
  );
}
