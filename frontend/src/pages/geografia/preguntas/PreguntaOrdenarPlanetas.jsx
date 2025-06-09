
import React, { useState, useEffect } from 'react';
import "./OrdenarPlanetasEstilo.css";

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
  const [dropzone, setDropzone] = useState(Array(8).fill(null));
  const [resultado, setResultado] = useState("");

  useEffect(() => {
    const mezclado = [...planetasIniciales.slice(0, 8)].sort(() => Math.random() - 0.5);
    setPiezas(mezclado);
  }, []);

  const handleDragStart = (e, planeta) => {
    e.dataTransfer.setData('planeta', JSON.stringify(planeta));
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const planeta = JSON.parse(e.dataTransfer.getData('planeta'));

    const nuevaZona = [...dropzone];
    const yaEsta = nuevaZona.find(p => p?.nombre === planeta.nombre);
    if (!yaEsta) {
      nuevaZona[index] = planeta;
      setDropzone(nuevaZona);
      setPiezas(piezas.filter(p => p.nombre !== planeta.nombre));
    }
  };

  const handleRemove = (index) => {
    const planeta = dropzone[index];
    if (planeta) {
      setPiezas([...piezas, planeta]);
      const nuevaZona = [...dropzone];
      nuevaZona[index] = null;
      setDropzone(nuevaZona);
    }
  };

  const verificarOrden = () => {
    const completados = dropzone.filter(p => p);
    if (completados.length !== 8) {
      setResultado("⚠️ Debes colocar los 8 planetas.");
      return;
    }

    const correcto = completados.every((p, i) => {
      return i === 0 || (completados[i - 1].orden <= p.orden);
    });

    setResultado(correcto ? " ¡Correcto! Ordenaste los planetas." : " El orden no es correcto.");
  };

  return (
    <div className="contenedor-planetas">
      <h1>Ordena los planetas del sistema solar</h1>

      <p className="descripcion-pregunta">
        Arrastra los planetas en orden desde el más cercano al Sol hasta el más lejano. 
        Debes colocar los 8 planetas en las tarjetas. Puedes devolverlos si necesitas cambiar.
      </p>

      <div className="zona-drop">
        {dropzone.map((p, i) => (
          <div
            key={i}
            className="item-planeta"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, i)}
            onDoubleClick={() => handleRemove(i)}
          >
            <span className="espacio-label">Espacio {i + 1}</span>
            {p ? (
              <>
                <img src={p.img} alt={p.nombre} />
                <p>{p.nombre}</p>
              </>
            ) : (
              <p style={{ opacity: 0.5 }}>Arrastra aquí</p>
            )}
          </div>
        ))}
      </div>

      <div className="zona-piezas">
        {piezas.map((p, i) => (
          <div
            key={i}
            className="item-planeta"
            draggable
            onDragStart={(e) => handleDragStart(e, p)}
          >
            <img src={p.img} alt={p.nombre} />
            <p>{p.nombre}</p>
          </div>
        ))}
      </div>

      <button onClick={verificarOrden}>Verificar Orden</button>
      <p id="resultado">{resultado}</p>
    </div>
  );
}
