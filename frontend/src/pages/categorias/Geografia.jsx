import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalDificultad from "../../assets/ModalDificultad";
import PreguntaOrdenarPlanetas from "../geografia/preguntas/PreguntaOrdenarPlanetas";
import "../geografia/preguntas/geografia.css";

export default function Geografia() {
  const [mostrarModal, setMostrarModal] = useState(true);
  const [dificultad, setDificultad] = useState(null);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const navigate = useNavigate();

  const manejarSeleccion = (nivel) => {
    setDificultad(nivel);
    setMostrarModal(false);
    setPreguntaActual(0);
  };

  const manejarCancelar = () => {
    navigate("/home");
  };

  const preguntasPorNivel = {
    Fácil: [<PreguntaOrdenarPlanetas />],
    Intermedio: [<PreguntaOrdenarPlanetas />],
    Difícil: [<PreguntaOrdenarPlanetas />],
  };

  const preguntas = dificultad ? preguntasPorNivel[dificultad] || [] : [];

  const siguientePregunta = () => {
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(preguntaActual + 1);
    } else {
      alert("¡Has completado todas las preguntas de nivel " + dificultad + "!");
    }
  };

  return (
    <div className="geografia-container">
      {mostrarModal ? (
        <ModalDificultad onSelect={manejarSeleccion} onClose={manejarCancelar} />
      ) : (
        <>
          <button className="btn-regresar" onClick={manejarCancelar}>⬅</button>
          <h1 className="geografia-titulo">Categoría: Geografía</h1>
          <p className="geografia-subtitulo">
            Dificultad seleccionada: <strong>{dificultad}</strong>
          </p>
          <div className="pregunta-box">{preguntas[preguntaActual]}</div>
          {preguntas.length > 1 && (
            <button className="btn-siguiente" onClick={siguientePregunta}>
              Siguiente
            </button>
          )}
        </>
      )}
    </div>
  );
}
