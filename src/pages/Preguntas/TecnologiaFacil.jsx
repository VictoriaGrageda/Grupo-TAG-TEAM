import React, { useState, useEffect } from "react";
import "../../assets/tecnologia.css";

const piezasOriginales = [
  "piezasComputadora/pieza_0_0.jpg",
  "piezasComputadora/pieza_0_1.jpg",
  "piezasComputadora/pieza_0_2.jpg",
  "piezasComputadora/pieza_1_0.jpg",
  "piezasComputadora/pieza_1_1.jpg",
  "piezasComputadora/pieza_1_2.jpg",
  "piezasComputadora/pieza_2_0.jpg",
  "piezasComputadora/pieza_2_1.jpg",
  "piezasComputadora/pieza_2_2.jpg"
];

function shuffle(array) {
  let copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export default function TecnologiaFacil() {
  const [piezas, setPiezas] = useState(shuffle(piezasOriginales));
  const [seleccionada, setSeleccionada] = useState(null);
  const [completo, setCompleto] = useState(false);

  useEffect(() => {
    if (JSON.stringify(piezas) === JSON.stringify(piezasOriginales)) {
      setCompleto(true);
    } else {
      setCompleto(false);
    }
  }, [piezas]);

  const manejarClick = (index) => {
    if (seleccionada === null) {
      setSeleccionada(index);
    } else {
      const nuevasPiezas = [...piezas];
      [nuevasPiezas[seleccionada], nuevasPiezas[index]] = [nuevasPiezas[index], nuevasPiezas[seleccionada]];
      setPiezas(nuevasPiezas);
      setSeleccionada(null);
    }
  };

  return (
    <div className="rompecabezas-container">
      <h2>🧩 Ordena las piezas para armar la computadora</h2>
      <div className="rompecabezas-grid">
        {piezas.map((pieza, index) => (
          <img
            key={index}
            src={`/${pieza}`}
            alt={`pieza-${index}`}
            className={`rompecabezas-pieza ${seleccionada === index ? "seleccionada" : ""}`}
            onClick={() => manejarClick(index)}
          />
        ))}
      </div>
      {completo && <div className="mensaje-correcto">✅ ¡Rompecabezas completo!</div>}
    </div>
  );
}

