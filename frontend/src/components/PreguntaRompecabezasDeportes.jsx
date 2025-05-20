import React, { useState } from "react";
import { motion } from "framer-motion";

const preguntasPorNivel = {
  Fácil: [
    { enunciado: "Arma los elementos básicos del fútbol:", piezas: ["Pelota", "Portería", "Camiseta"] },
    { enunciado: "Ordena los elementos relacionados al árbitro:", piezas: ["Guantes", "Árbitro", "Silbato"] },
    { enunciado: "Secuencia de una jugada con gol:", piezas: ["Balón", "Gol", "Celebración"] },
    { enunciado: "Elementos clave en un equipo:", piezas: ["Cancha", "Equipo", "Entrenador"] },
    { enunciado: "Premiación deportiva:", piezas: ["Medalla", "Podio", "Himno"] },
  ],
  Intermedio: [
    { enunciado: "Etapas de una jugada ofensiva:", piezas: ["Pase", "Desmarque", "Remate"] },
    { enunciado: "Partes del cuerpo permitidas para tocar el balón:", piezas: ["Cabeza", "Pecho", "Pierna"] },
    { enunciado: "Posiciones defensivas clásicas:", piezas: ["Lateral", "Central", "Portero"] },
    { enunciado: "Componentes del equipamiento deportivo:", piezas: ["Camiseta", "Short", "Botines"] },
    { enunciado: "Fases del calentamiento deportivo:", piezas: ["Movilidad articular", "Estiramiento", "Activación"] },
  ],
  Difícil: [
    { enunciado: "Fundamentos tácticos de ataque:", piezas: ["Control de balón", "Conducción", "Finalización"] },
    { enunciado: "Pasos del arbitraje en una jugada dudosa:", piezas: ["Observación", "Interpretación", "Decisión"] },
    { enunciado: "Secuencia de un contraataque efectivo:", piezas: ["Recuperación", "Transición", "Definición"] },
    { enunciado: "Componentes del sistema cardiovascular en deporte:", piezas: ["Corazón", "Vasos sanguíneos", "Sangre"] },
    { enunciado: "Fases de entrenamiento físico intensivo:", piezas: ["Carga", "Tolerancia", "Recuperación"] },
  ],
};

const fondoPorNivel = {
  Fácil: "from-green-100 via-green-200 to-green-300",
  Intermedio: "from-blue-100 via-blue-200 to-blue-300",
  Difícil: "from-rose-100 via-rose-200 to-rose-300",
};

export default function PreguntaRompecabezasDeportes({ nivel }) {
  const preguntas = preguntasPorNivel[nivel] || [];
  const [indiceActual, setIndiceActual] = useState(0);
  const [ordenUsuario, setOrdenUsuario] = useState(
    [...preguntas[0].piezas].sort(() => Math.random() - 0.5)
  );
  const [mensaje, setMensaje] = useState(null);
  const [terminado, setTerminado] = useState(false);

  const mover = (from, to) => {
    const nuevaLista = [...ordenUsuario];
    const [pieza] = nuevaLista.splice(from, 1);
    nuevaLista.splice(to, 0, pieza);
    setOrdenUsuario(nuevaLista);
  };

  const verificar = () => {
    const piezasCorrectas = preguntas[indiceActual].piezas;
    const esCorrecto = JSON.stringify(ordenUsuario) === JSON.stringify(piezasCorrectas);

    if (esCorrecto) {
      if (indiceActual + 1 < preguntas.length) {
        setMensaje(" ¡Correcto! Avanzando...");
        setTimeout(() => {
          const siguiente = indiceActual + 1;
          setIndiceActual(siguiente);
          setOrdenUsuario([...preguntas[siguiente].piezas].sort(() => Math.random() - 0.5));
          setMensaje(null);
        }, 1000);
      } else {
        setMensaje("🎉 ¡Has completado todos los rompecabezas!");
        setTerminado(true);
      }
    } else {
      setMensaje(" Intenta de nuevo");
    }
  };

  if (!preguntas.length) return <p className="text-red-600">No hay preguntas para este nivel.</p>;

  return (
    <div className={`min-h-screen py-10 px-4 bg-gradient-to-b ${fondoPorNivel[nivel]} flex items-center justify-center`}>
      <div className="card w-full max-w-3xl p-6 rounded-xl bg-white shadow-2xl">
        <p className="text-gray-500 mb-1 text-sm text-center">Pregunta {indiceActual + 1} de {preguntas.length}</p>
        <h2 className="text-xl font-bold mb-6 flex justify-center items-center gap-2 text-center">
           {preguntas[indiceActual].enunciado}
        </h2>

        <ul className="flex flex-col items-center gap-3 mb-6">
          {ordenUsuario.map((pieza, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                if (i < ordenUsuario.length - 1) mover(i, i + 1);
                else mover(i, 0);
              }}
              className="pieza bg-white text-gray-700 shadow-md hover:shadow-lg hover:bg-gray-100 border border-gray-300"
            >
              {pieza}
            </motion.li>
          ))}
        </ul>

        {!terminado && (
          <div className="flex justify-center">
            <button
              onClick={verificar}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full font-semibold shadow-md"
            >
               Verificar pedido
            </button>
          </div>
        )}

        {mensaje && (
          <div className="mt-4 text-lg text-center font-semibold">
            {mensaje.includes("") ? (
              <span className="text-purple-600">{mensaje}</span>
            ) : mensaje.includes("") ? (
              <span className="text-green-600">{mensaje}</span>
            ) : (
              <span className="text-red-600">{mensaje}</span>
            )}
          </div>
        )}

        {terminado && (
          <div className="text-center mt-6">
            <h3 className="text-xl font-bold text-green-700 mb-2">¡Buen trabajo! 🎉</h3>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
            >
               Volver a jugar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}




