import React, { useState } from "react";
import "./ordenar.css"; // mantiene tu estilo visual

export default function ComponenteOrdenar({ elementos, ordenCorrecto }) {
  const [zonaRespuesta, setZonaRespuesta] = useState([]);
  const [zonaElementos, setZonaElementos] = useState(elementos);
  const [resultado, setResultado] = useState(null);

  const onDrop = (item) => {
    // Evita duplicados en zonaRespuesta
    if (zonaRespuesta.find((e) => e.id === item.id)) return;

    setZonaRespuesta([...zonaRespuesta, item]);
    setZonaElementos(zonaElementos.filter((e) => e.id !== item.id));
  };

  const verificarOrden = () => {
    const ordenUsuario = zonaRespuesta.map((el) => el.id);
    const correcto = JSON.stringify(ordenUsuario) === JSON.stringify(ordenCorrecto);

    setResultado(correcto ? "✅ ¡Orden correcto!" : "❌ Orden incorrecto");
  };

  return (
    <div>
      <h3>Zona de Respuesta</h3>
      <div className="zona-respuesta">
        {zonaRespuesta.map((el, i) => (
          <div key={i} className="elemento">
            <img src={el.imagen} alt={`item-${i}`} />
            <p>{el.texto}</p>
          </div>
        ))}
      </div>

      <h3>Zona de Elementos</h3>
      <div className="zona-elementos">
        {zonaElementos.map((el, i) => (
          <div key={i} className="elemento" onClick={() => onDrop(el)}>
            <img src={el.imagen} alt={`item-${i}`} />
            <p>{el.texto}</p>
          </div>
        ))}
      </div>

      <button onClick={verificarOrden} style={{ marginTop: "1rem" }}>
        Verificar orden
      </button>

      {resultado && <p style={{ marginTop: "10px", fontWeight: "bold" }}>{resultado}</p>}
    </div>
  );
}
