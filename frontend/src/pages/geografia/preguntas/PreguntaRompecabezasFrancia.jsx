import React, { useState } from "react";
import "./RompecabezasFrancia.css";

const filas = 3;
const columnas = 3;

function generarPiezas() {
  const piezas = [];
  for (let y = 0; y < filas; y++) {
    for (let x = 0; x < columnas; x++) {
      piezas.push({ id: `${x}-${y}`, x, y });
    }
  }
  return piezas.sort(() => Math.random() - 0.5); // Desordenar
}

export default function PreguntaRompecabezasFrancia() {
  const [piezas, setPiezas] = useState(generarPiezas());
  const [tablero, setTablero] = useState(Array(filas * columnas).fill(null));
  const [mostrarPregunta, setMostrarPregunta] = useState(false);
  const [seleccion, setSeleccion] = useState(null);
  const [mensajeError, setMensajeError] = useState(null);

  const manejarDrop = (index, pieza) => {
    const nuevoTablero = [...tablero];
    nuevoTablero[index] = pieza;
    setTablero(nuevoTablero);

    const completo = nuevoTablero.every((p, i) => {
      const xEsperado = i % columnas;
      const yEsperado = Math.floor(i / columnas);
      return p && p.x === xEsperado && p.y === yEsperado;
    });

    if (nuevoTablero.every((p) => p !== null)) {
      const armadoCorrectamente = nuevoTablero.every((p, i) => {
        const xEsperado = i % columnas;
        const yEsperado = Math.floor(i / columnas);
        return p.x === xEsperado && p.y === yEsperado;
      });

      if (armadoCorrectamente) {
        setMostrarPregunta(true);
        setMensajeError(null);
      } else {
        setMensajeError("Upsi. El rompecabezas no está armado correctamente");
      }
    }


    // Remover de la lista de piezas disponibles
    setPiezas(piezas.filter((p) => p.id !== pieza.id));
  };

  const permitirDrop = (e) => e.preventDefault();

  return (
    <div className="rompe-container">
      <h2>Arma el rompecabezas</h2>
      <div className="rompe-tablero">
        {tablero.map((pieza, index) => (
          <div
            key={index}
            className="rompe-celda"
            onDragOver={permitirDrop}
            onDrop={(e) =>
              manejarDrop(index, JSON.parse(e.dataTransfer.getData("pieza")))
            }
          >
            {pieza && (
              <div
                className="pieza"
                style={{
                  backgroundPosition: `-${pieza.x * 100}px -${pieza.y * 100}px`,
                }}
              ></div>
            )}
          </div>
        ))}
      </div>

      <div className="rompe-piezas">
        {piezas.map((pieza) => (
          <div
            key={pieza.id}
            className="pieza"
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData("pieza", JSON.stringify(pieza))
            }
            style={{
              backgroundPosition: `-${pieza.x * 100}px -${pieza.y * 100}px`,
            }}
          ></div>
        ))}
      </div>

      {mensajeError && (
        <div style={{ color: "red", marginTop: "10px", fontWeight: "bold" }}>
          {mensajeError}
        </div>
      )}

      {mostrarPregunta && (
        <div className="rompe-pregunta">
          <h3>¿Qué país armaste?</h3>
          <div className="opciones">
            <button onClick={() => setSeleccion("Francia")}>Francia</button>
            <button onClick={() => setSeleccion("Italia")}>Italia</button>
            <button onClick={() => setSeleccion("España")}>España</button>
          </div>
          {seleccion && (
            <p className="respuesta">
              {seleccion === "Francia"
                ? "¡Correcto!, muy bien echo"
                : "Incorrecto. Era Francia."}
            </p>
          )}
        </div>
      )}
    </div>
  );
}