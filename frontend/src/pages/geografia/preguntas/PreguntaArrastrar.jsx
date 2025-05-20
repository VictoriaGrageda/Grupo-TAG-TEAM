import React, { useState } from "react";
import "./geografia.css";

const piezas = [
  { id: "1", texto: " Europa", correcta: "zona1" },
  { id: "2", texto: " América", correcta: "zona2" },
  { id: "3", texto: " Asia", correcta: "zona3" },
];

const zonas = [
  { id: "zona1", nombre: "Europa" },
  { id: "zona2", nombre: "América" },
  { id: "zona3", nombre: "Asia" },
];

export default function PreguntaPuzzle() {
  const [zonasEstado, setZonasEstado] = useState({
    zona1: null,
    zona2: null,
    zona3: null,
  });

  const [resultado, setResultado] = useState(null);

  const handleDrop = (zonaId, piezaId) => {
    setZonasEstado((prev) => ({
      ...prev,
      [zonaId]: piezas.find((p) => p.id === piezaId),
    }));
    setResultado(null);
  };

  const allowDrop = (e) => e.preventDefault();

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const verificarRespuestas = () => {
    const correcto = piezas.every((pieza) => {
      return zonasEstado[pieza.correcta]?.id === pieza.id;
    });
    setResultado({
      mensaje: correcto ? "¡Correcto! " : "Algunas piezas están mal colocadas",
      tipo: correcto ? "correcto" : "incorrecto",
    });
  };

  return (
    <div className="pregunta">
      <h2> Arrastra cada continente a su zona</h2>
      <div className="puzzle-contenedor">
        <div className="piezas">
          {piezas.map((pieza) => (
            <div
              key={pieza.id}
              className="pieza"
              draggable
              onDragStart={(e) => handleDragStart(e, pieza.id)}
            >
              {pieza.texto}
            </div>
          ))}
        </div>
        <div className="zonas">
          {zonas.map((zona) => (
            <div
              key={zona.id}
              className="zona"
              onDrop={(e) => handleDrop(zona.id, e.dataTransfer.getData("text/plain"))}
              onDragOver={allowDrop}
            >
              <p className="zona-label">{zona.nombre}</p>
              {zonasEstado[zona.id] ? (
                <div className="pieza-colocada" id={zonasEstado[zona.id].id}>
                  {zonasEstado[zona.id].texto}
                </div>
              ) : (
                <div className="espacio-vacio">Suelta aquí</div>
              )}
            </div>
          ))}
        </div>
        <button className="btn-siguiente" onClick={verificarRespuestas}>
          Verificar
        </button>
        {resultado && (
          <p
            className={`mensaje-verificacion ${
              resultado.tipo === "correcto" ? "mensaje-correcto" : "mensaje-incorrecto"
            }`}
          >
            {resultado.mensaje}
          </p>
        )}
      </div>
    </div>
  );
}