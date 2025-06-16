import React, { useState } from "react";
import "./PreguntaOrdenamiento.css";

export default function PreguntaOrdenamiento({ titulo, elementos, ordenCorrecto }) {
  const [respuesta, setRespuesta] = useState([]);
  const [arrastrando, setArrastrando] = useState(null);
  const [resultado, setResultado] = useState(null);

  const manejarArrastrar = (nombre) => {
    setArrastrando(nombre);
  };

  const soltarEnRespuesta = () => {
    if (!respuesta.includes(arrastrando)) {
      setRespuesta([...respuesta, arrastrando]);
    }
  };

  const verificarOrden = () => {
    const esCorrecto = JSON.stringify(respuesta) === JSON.stringify(ordenCorrecto);
    setResultado(esCorrecto ? "¡Correcto! 🎉" : "Incorrecto 😢");
  };

  return (
    <div className="pregunta-contenedor">
      <h2>{titulo}</h2>

      <div
        className="zona-respuesta"
        onDragOver={(e) => e.preventDefault()}
        onDrop={soltarEnRespuesta}
      >
        {respuesta.map((nombre, i) => (
          <div key={i} className="tarjeta">{nombre}</div>
        ))}
      </div>

      <div className="zona-opciones">
        {elementos.map((el, i) => (
          <div
            key={i}
            className="tarjeta"
            draggable
            onDragStart={() => manejarArrastrar(el.nombre)}
          >
            <img src={el.imagen} alt={el.nombre} />
            <p>{el.nombre}</p>
          </div>
        ))}
      </div>

      <button onClick={verificarOrden}>Verificar Orden</button>
      {resultado && <p>{resultado}</p>}
    </div>
  );
}
