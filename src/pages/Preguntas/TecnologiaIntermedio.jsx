import React, { useState, useEffect } from "react";
import "../../assets/tecnologia.css";

const piezasOriginales = [
  "piezasIntermedio/pieza_0_0.jpg", "piezasIntermedio/pieza_0_1.jpg", "piezasIntermedio/pieza_0_2.jpg", "piezasIntermedio/pieza_0_3.jpg",
  "piezasIntermedio/pieza_1_0.jpg", "piezasIntermedio/pieza_1_1.jpg", "piezasIntermedio/pieza_1_2.jpg", "piezasIntermedio/pieza_1_3.jpg",
  "piezasIntermedio/pieza_2_0.jpg", "piezasIntermedio/pieza_2_1.jpg", "piezasIntermedio/pieza_2_2.jpg", "piezasIntermedio/pieza_2_3.jpg",
  "piezasIntermedio/pieza_3_0.jpg", "piezasIntermedio/pieza_3_1.jpg", "piezasIntermedio/pieza_3_2.jpg", "piezasIntermedio/pieza_3_3.jpg"
];

function shuffle(array) {
  let copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export default function TecnologiaIntermedio() {
  const [piezas, setPiezas] = useState(shuffle(piezasOriginales));
  const [seleccionada, setSeleccionada] = useState(null);
  const [completo, setCompleto] = useState(false);
  const [tiempo, setTiempo] = useState(120); // 2 minutos
  const [intentos, setIntentos] = useState(0);
  const [activo, setActivo] = useState(true);

  useEffect(() => {
    let timer;
    if (activo) {
      timer = setInterval(() => {
        setTiempo((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setActivo(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activo]);

  useEffect(() => {
    if (JSON.stringify(piezas) === JSON.stringify(piezasOriginales)) {
      setCompleto(true);
      setActivo(false);
    }
  }, [piezas]);

  const manejarClick = (index) => {
    if (!activo || completo) return;

    if (seleccionada === null) {
      setSeleccionada(index);
    } else {
      const nuevasPiezas = [...piezas];
      [nuevasPiezas[seleccionada], nuevasPiezas[index]] = [nuevasPiezas[index], nuevasPiezas[seleccionada]];
      setPiezas(nuevasPiezas);
      setSeleccionada(null);
      setIntentos((prev) => prev + 1);
    }
  };

  const reintentarJuego = () => {
    setPiezas(shuffle(piezasOriginales));
    setSeleccionada(null);
    setCompleto(false);
    setTiempo(120);
    setIntentos(0);
    setActivo(true);
  };

  return (
    <div className="rompecabezas-container">
      <h2>🧩 Arma el interior de la computadora</h2>
      <div className="info-bar">
        <span>⏱ Tiempo restante: {tiempo}s</span>
        <span>🔁 Movimientos: {intentos}</span>
      </div>

      <div className="rompecabezas-grid-intermedio">
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

      {completo && <div className="mensaje-correcto">✅ ¡Rompecabezas completado!</div>}
      {tiempo === 0 && !completo && (
        <div className="mensaje-error">
          ⛔ Tiempo agotado. Inténtalo de nuevo.
          <br />
          <button className="btn-reintentar" onClick={reintentarJuego}>🔁 Reintentar</button>
        </div>
      )}
    </div>
  );
}