import React, { useState, useEffect } from 'react';
import "./OrdenarPlanetasEstilo.css"

const planetasIniciales = [
  { nombre: "Mercurio", orden: 1, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_true_color.jpg/100px-Mercury.jpg" },
  { nombre: "Venus", orden: 2, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Venus-real_color.jpg/100px-Venus.jpg" },
  { nombre: "Tierra", orden: 3, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/100px-Earth_seen.jpg" },
  { nombre: "Marte", orden: 4, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/100px-Mars.jpg" },
  { nombre: "Júpiter", orden: 5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Jupiter.jpg/100px-Jupiter.jpg" },
  { nombre: "Saturno", orden: 6, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/100px-Saturn.jpg" },
  { nombre: "Urano", orden: 7, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/100px-Uranus.jpg" },
  { nombre: "Neptuno", orden: 8, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Neptune_Full.jpg/100px-Neptune.jpg" },
];

export default function PuzzlePlanetas() {
  const [piezas, setPiezas] = useState([]);
  const [dropzone, setDropzone] = useState([]);
  const [resultado, setResultado] = useState("");

  useEffect(() => {
    const mezclado = [...planetasIniciales].sort(() => Math.random() - 0.5);
    setPiezas(mezclado);
  }, []);

  const handleDragStart = (e, planeta, fromDropzone) => {
    e.dataTransfer.setData('planeta', JSON.stringify({ planeta, fromDropzone }));
  };

  const handleDrop = (e, toDropzone) => {
    e.preventDefault();
    const { planeta, fromDropzone } = JSON.parse(e.dataTransfer.getData('planeta'));

    if (toDropzone) {
      // evitar duplicados
      if (!dropzone.find(p => p.nombre === planeta.nombre)) {
        setDropzone([...dropzone, planeta]);
        if (fromDropzone) {
          setDropzone(dropzone.filter(p => p.nombre !== planeta.nombre));
        } else {
          setPiezas(piezas.filter(p => p.nombre !== planeta.nombre));
        }
      }
    } else {
      // devolver al pool de piezas
      if (!piezas.find(p => p.nombre === planeta.nombre)) {
        setPiezas([...piezas, planeta]);
        setDropzone(dropzone.filter(p => p.nombre !== planeta.nombre));
      }
    }
  };

  const verificarOrden = () => {
    if (dropzone.length !== 8) {
      setResultado(" Debes colocar los 8 planetas.");
      return;
    }

    const correcto = dropzone.every((p, i, arr) => {
      return i === 0 || arr[i - 1].orden <= p.orden;
    });

    setResultado(correcto ? " ¡Correcto! Ordenaste los planetas." : " El orden no es correcto.");
  };

  return (
    <div className="contenedor-planetas">
      <h1>Ordena los planetas del sistema solar</h1>

      <div
        className="zona-drop"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, true)}
      >
        {dropzone.map((p, i) => (
          <div key={i} className="item-planeta" draggable
            onDragStart={(e) => handleDragStart(e, p, true)}>
            <img src={p.img} alt={p.nombre} />
            <p>{p.nombre}</p>
          </div>
        ))}
      </div>

      <div
        className="zona-piezas"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, false)}
      >
        {piezas.map((p, i) => (
          <div key={i} className="item-planeta" draggable
            onDragStart={(e) => handleDragStart(e, p, false)}>
            <img src={p.img} alt={p.nombre} />
            <p>{p.nombre}</p>
          </div>
        ))}
      </div>

      <button onClick={verificarOrden}>Verificar Orden</button>
      <p>{resultado}</p>
    </div>
  );
}