import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalDificultad from "../assets/ModalDificultad";
import TecnologiaFacil from "./preguntas/TecnologiaFacil";
import TecnologiaIntermedio from "./preguntas/TecnologiaIntermedio";
import TecnologiaDificil from "./preguntas/TecnologiaDificil";


import "../assets/tecnologia.css"; 

export default function Tecnologia() {
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

  const renderizarPregunta = () => {
    if (dificultad === "Fácil") return <TecnologiaFacil />;
    if (dificultad === "Intermedio") return <TecnologiaIntermedio />;
    if (dificultad === "Difícil") return <TecnologiaDificil />;
    return null;
  };

  return (
    <div className="tecnologia-container">
      {mostrarModal && (
        <ModalDificultad onSelect={manejarSeleccion} onClose={manejarCancelar} />
      )}

      {!mostrarModal && (
        <>
          <button className="btn-regresar" onClick={() => navigate("/home")}>
            ⬅ Volver
          </button>

          <h1 className="tecnologia-titulo">Categoría: Tecnología</h1>
          <p className="tecnologia-subtitulo">
            Dificultad seleccionada: <strong>{dificultad}</strong>
          </p>

          {renderizarPregunta()}
        </>
      )}
    </div>
  );
}

