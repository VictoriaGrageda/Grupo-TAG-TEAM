
import React, { useEffect, useState } from "react";
import "./vistaCuestionarioEstilo.css";

const VistaCuestionario = () => {
  const [preguntas, setPreguntas] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cuestionarioCompleto") || "[]");
    setPreguntas(data);
  }, []);

  const verificarTodo = () => {
    preguntas.forEach((preg, idx) => {
      const zona = document.getElementById("respuesta-" + idx);
      const textos = Array.from(zona.querySelectorAll(".preview-item p")).map(p => p.textContent);
      const correctos = preg.elementos.filter((e) => e.correcto).map((e) => e.texto);

      const esCorrecto =
        textos.length === correctos.length &&
        textos.every((t) => correctos.includes(t));

      document.getElementById("resultado-" + idx).textContent = esCorrecto
        ? " Correcto"
        : " Incorrecto";
    });
  };

  
  return (
    <div className="vista-cuestionario">
      <h1>Resuelve el Cuestionario</h1>
      {preguntas.map((preg, idx) => (
        <div key={idx} className="pregunta-block">
          <h3>Pregunta {idx + 1}</h3>
          {preg.imagenEnunciado && (
            <img src={preg.imagenEnunciado} alt="" style={{ maxWidth: "300px" }} />
          )}
          <p><strong>{preg.titulo}</strong></p>
          {preg.descripcion && <p className="descripcion-pregunta">{preg.descripcion}</p>}

          <div className="dropzone">
            {[...preg.elementos].sort(() => Math.random() - 0.5).map((e, i) => (
              <div
                key={i}
                className="preview-item"
                draggable
                onDragStart={(ev) => ev.currentTarget.classList.add("dragging")}
                onDragEnd={(ev) => ev.currentTarget.classList.remove("dragging")}
              >
                {e.imagen && <img src={e.imagen} alt="" />}
                <p>{e.texto}</p>
              </div>
            ))}
          </div>

          <p>Arrastra aquí tu respuesta:</p>
          <div
            id={`respuesta-${idx}`}
            className="dropzone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const dragging = document.querySelector(".dragging");
              if (dragging) e.currentTarget.appendChild(dragging);
            }}
          ></div>

          <p id={`resultado-${idx}`}></p>
        </div>
      ))}

      <button onClick={verificarTodo}>Verificar todas las respuestas</button>
    </div>
  );
};

export default VistaCuestionario;
