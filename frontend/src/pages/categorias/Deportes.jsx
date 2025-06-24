import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalDificultad from "../../assets/ModalDificultad";

 

export default function Deportes() {
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
    if (dificultad === "Fácil");
    if (dificultad === "Intermedio") ;
    if (dificultad === "Difícil");
    return null;
  };

  return (
    <div className="Deportes-container">
      {mostrarModal && (
        <ModalDificultad onSelect={manejarSeleccion} onClose={manejarCancelar} />
      )}

      {!mostrarModal && (
        <>
          <button className="btn-regresar" onClick={() => navigate("/home")}>
            ⬅ 
          </button>

          <h1 className="Deportes-titulo">Categoría: Deportes</h1>
          <p className="Deportes-subtitulo">
            Dificultad seleccionada: <strong>{dificultad}</strong>
          </p>

          {renderizarPregunta()}
        </>
      )}
    </div>
  );
}
