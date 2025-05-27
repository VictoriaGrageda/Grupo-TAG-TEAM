import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalDificultad from "../assets/ModalDificultad";
import TecFacil from "./tecnologia/preguntas/TecFacil";
import TecIntermedio from "./tecnologia/preguntas/TecIntermedio";
import TecDificil from "./tecnologia/preguntas/TecDificil";
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
    if (dificultad === "Fácil") return <TecFacil />;
    if (dificultad === "Intermedio") return <TecIntermedio />;
    if (dificultad === "Difícil") return <TecDificil />;
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

