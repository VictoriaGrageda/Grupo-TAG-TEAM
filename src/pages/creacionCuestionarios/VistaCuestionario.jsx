
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./vistaCuestionarioEstilo.css";

const VistaCuestionario = () => {
  const [preguntas, setPreguntas] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cuestionarioCompleto") || "[]");
    setPreguntas(data);
  }, []);

  const verificarTodo = () => {
    preguntas.forEach((preg, idx) => {
      const correctos = preg.elementos.filter((e) => e.correcto).map((e) => e.texto);
      const zonas = document.querySelectorAll(`.tarjeta-respuesta[data-preg="${idx}"]`);
      const respuestas = Array.from(zonas).map((zona) => {
        const item = zona.querySelector(".preview-item p");
        return item ? item.textContent : "";
      }).filter(Boolean);

      const esCorrecto =
        respuestas.length === correctos.length &&
        respuestas.every((txt) => correctos.includes(txt));

      document.getElementById("resultado-" + idx).textContent = esCorrecto
        ? " Correcto"
        : " Incorrecto";
    });
  };

  const reiniciarRespuestas = () => {
    const zonas = document.querySelectorAll(".tarjeta-respuesta");
    zonas.forEach((zona) => (zona.innerHTML = '<span style="font-size:12px;color:#666;">Espacio</span>'));
    document.querySelectorAll("[id^='resultado-']").forEach((el) => (el.textContent = ""));
  };

  const volverAEditar = () => {
    window.location.href = "/";
  };

  return (
    <div className="vista-cuestionario">
      <h1>Resuelve el Cuestionario</h1>
      {preguntas.map((preg, idx) => {
        const correctCount = preg.elementos.filter(e => e.correcto).length;

        return (
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

            <p>Arrastra cada respuesta en su tarjeta correspondiente:</p>
            <div
              className="zona-tarjetas-contenedor"
              style={{
                backgroundColor: "#f0e6ff",
                padding: "20px",
                borderRadius: "15px",
                border: "2px solid #d0b3ff",
                marginTop: "10px",
              }}
            >
              <div className="zona-tarjetas" style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                justifyContent: "center"
              }}>
                {Array.from({ length: correctCount }).map((_, tIdx) => (
                  <div
                    key={tIdx}
                    className="tarjeta-respuesta"
                    data-preg={idx}
                    style={{
                      width: "140px",
                      minHeight: "100px",
                      border: "2px dashed #8e44ad",
                      borderRadius: "10px",
                      padding: "10px",
                      background: "#f9f0ff",
                      textAlign: "center"
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      const dragging = document.querySelector(".dragging");
                      if (dragging) {
                        e.currentTarget.innerHTML = "";
                        e.currentTarget.appendChild(dragging);
                      }
                    }}
                  >
                    <span style={{ fontSize: "12px", color: "#666" }}>Espacio {tIdx + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            <p id={`resultado-${idx}`}></p>
          </div>
        );
      })}

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button onClick={verificarTodo}>Verificar todas las respuestas</button>
        <button onClick={reiniciarRespuestas}>Reiniciar respuestas</button>
        <button onClick={() => {
          localStorage.setItem("trabajoEnCurso", JSON.stringify(preguntas));
          navigate("/editor");
        }} className="boton-volver">
          Volver al editor
        </button>
      </div>
    </div>
  );
};

export default VistaCuestionario;
