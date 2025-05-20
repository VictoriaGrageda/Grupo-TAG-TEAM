import React, { useState, useEffect } from "react";
import "../../assets/tecnologia.css";

const piezasOriginales = Array.from({ length: 5 }, (_, i) =>
  Array.from({ length: 5 }, (_, j) => `piezasDificil/pieza_${i}_${j}.jpg`)
).flat();

function shuffle(array) {
  let copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export default function TecnologiaDificil() {
  const [piezas, setPiezas] = useState(shuffle(piezasOriginales));
  const [seleccionada, setSeleccionada] = useState(null);
  const [completo, setCompleto] = useState(false);
  const [tiempo, setTiempo] = useState(90); // 90 segundos
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
    if (!activo || completo || intentos >= 30) return;

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
    setTiempo(90);
    setIntentos(0);
    setActivo(true);
  };

  return (
    <div className="rompecabezas-container">
      <h2>💻 Rompecabezas de nivel Difícil</h2>
      <div className="info-bar">
        <span>⏱ Tiempo: {tiempo}s</span>
        <span>🔁 Movimientos: {intentos}/30</span>
      </div>

      <div className="rompecabezas-grid-dificil">
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

      {completo && <div className="mensaje-correcto">✅ ¡Completado!</div>}

      {(tiempo === 0 || intentos >= 30) && !completo && (
        <div className="mensaje-error">
          ⛔ Tiempo agotado o máximo de movimientos alcanzado.
          <br />
          <button className="btn-reintentar" onClick={reintentarJuego}>🔁 Reintentar</button>
        </div>
      )}
    </div>
  );
}
