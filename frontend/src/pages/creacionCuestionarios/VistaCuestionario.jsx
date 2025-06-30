// src/pages/creacionCuestionarios/VistaCuestionario.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import "./vistaCuestionarioEstilo.css";

export default function VistaCuestionario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [preguntas, setPreguntas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [usandoLocal, setUsandoLocal] = useState(false);
  const [respuestas, setRespuestas] = useState({});
  const [resultados, setResultados] = useState({});

  useEffect(() => {
    const cargarCuestionario = async () => {
      if (id) {
        try {
          const ref = doc(db, "cuestionarios", id);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            const data = snap.data();
            setPreguntas(data.preguntas || []);
            setTitulo(data.titulo || "");
            setCategoria(data.categoria || "");
            const initRes = {};
            data.preguntas.forEach((_, i) => (initRes[i] = []));
            setRespuestas(initRes);
          } else {
            alert("Cuestionario no encontrado.");
          }
        } catch (err) {
          console.error("Error al cargar de Firebase:", err);
          alert("Error al conectar con Firebase.");
        }
      } else {
        const local = JSON.parse(localStorage.getItem("cuestionarioCompleto") || "{}");
        if (local.preguntas) {
          setPreguntas(local.preguntas);
          setTitulo(local.titulo || "");
          setCategoria(local.categoria || "");
          setUsandoLocal(true);
          const initRes = {};
          local.preguntas.forEach((_, i) => (initRes[i] = []));
          setRespuestas(initRes);
        }
      }
    };
    cargarCuestionario();
  }, [id]);

  const handleDrop = (pregIndex, slotIndex, el) => {
    setRespuestas((prev) => {
      const nuevaRespuesta = [...(prev[pregIndex] || [])];
      nuevaRespuesta[slotIndex] = el;
      return { ...prev, [pregIndex]: nuevaRespuesta };
    });
  };

  const verificarTodo = () => {
    const nuevosResultados = {};
    preguntas.forEach((preg, i) => {
      const correctos = preg.elementos.filter(e => e.correcto).map(e => e.texto);
      const respuestasTexto = (respuestas[i] || []).map(e => e?.texto || "");
      const esCorrecto =
        respuestasTexto.length === correctos.length &&
        respuestasTexto.every((t, idx) => t === correctos[idx]);
      nuevosResultados[i] = esCorrecto;
    });
    setResultados(nuevosResultados);
  };

  const reiniciarRespuestas = () => {
    const reinicio = {};
    preguntas.forEach((_, i) => (reinicio[i] = []));
    setRespuestas(reinicio);
    setResultados({});
  };

  const volverAEditar = () => {
    const cuestionarioCompleto = JSON.parse(localStorage.getItem("cuestionarioCompleto") || "{}");
    if (cuestionarioCompleto.preguntas) {
      localStorage.setItem("trabajoEnCurso", JSON.stringify(cuestionarioCompleto.preguntas));
    }
    navigate("/editor");
  };

  if (!preguntas.length) return <p>Cargando cuestionario...</p>;

  return (
    <div className="vista-cuestionario">
      <h1>{titulo || "Cuestionario sin título"}</h1>
      <p>Categoría: <strong>{categoria}</strong></p>

      {preguntas.map((preg, idx) => {
        const correctCount = preg.elementos.filter(e => e.correcto).length;
        const usados = respuestas[idx] || [];
        const disponibles = preg.elementos.filter(
          (e) => !usados.find((r) => r?.id === e.id)
        );

        return (
          <div key={idx} className="pregunta-block">
            <h3>Pregunta {idx + 1}</h3>
            {preg.imagenEnunciado && (
              <img src={preg.imagenEnunciado} alt="" style={{ maxWidth: "300px" }} />
            )}
            <p><strong>{preg.titulo}</strong></p>
            {preg.descripcion && <p className="descripcion-pregunta">{preg.descripcion}</p>}

            <div className="dropzone">
              {disponibles.map((e, i) => (
                <div
                  key={i}
                  className="preview-item"
                  draggable
                  onDragStart={(ev) => ev.dataTransfer.setData("elemento", JSON.stringify(e))}
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
                {Array.from({ length: correctCount }).map((_, slotIdx) => (
                  <div
                    key={slotIdx}
                    className="tarjeta-respuesta"
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
                      e.preventDefault();
                      const data = e.dataTransfer.getData("elemento");
                      if (data) {
                        const el = JSON.parse(data);
                        handleDrop(idx, slotIdx, el);
                      }
                    }}
                  >
                    {respuestas[idx] && respuestas[idx][slotIdx] ? (
                      <>
                        {respuestas[idx][slotIdx].imagen && (
                          <img src={respuestas[idx][slotIdx].imagen} alt="" />
                        )}
                        <p>{respuestas[idx][slotIdx].texto}</p>
                      </>
                    ) : (
                      <span style={{ fontSize: "12px", color: "#666" }}>Espacio {slotIdx + 1}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {resultados[idx] !== undefined && (
              <p
                style={{
                  fontWeight: "bold",
                  color: resultados[idx] ? "green" : "red",
                  marginTop: "10px",
                }}
              >
                {resultados[idx] ? "✅ Correcto" : "❌ Incorrecto"}
              </p>
            )}
          </div>
        );
      })}

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button onClick={verificarTodo}>Verificar todas las respuestas</button>
        <button onClick={reiniciarRespuestas}>Reiniciar respuestas</button>
        <button onClick={volverAEditar} className="boton-volver">Volver al editor</button>
        
      </div>
    </div>
  );
}

