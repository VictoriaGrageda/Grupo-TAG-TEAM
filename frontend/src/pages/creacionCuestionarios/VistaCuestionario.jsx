// src/pages/creacionCuestionarios/VistaCuestionario.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import "./vistaCuestionarioEstilo.css";

export default function VistaCuestionario() {
  const { id } = useParams();
  const [cuestionario, setCuestionario] = useState(null);
  const [usandoLocal, setUsandoLocal] = useState(false);
  const [respuestaUsuario, setRespuestaUsuario] = useState([]);
  const [verificado, setVerificado] = useState(false);
  const [esCorrecto, setEsCorrecto] = useState(false);

  useEffect(() => {
    const cargarCuestionario = async () => {
      if (id) {
        const ref = doc(db, "cuestionarios", id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setCuestionario(snap.data());
        } else {
          alert("Cuestionario no encontrado");
        }
      } else {
        const local = localStorage.getItem("cuestionarioCompleto");
        if (local) {
          setCuestionario(JSON.parse(local));
          setUsandoLocal(true);
        }
      }
    };
    cargarCuestionario();
  }, [id]);

  const verificarRespuestas = () => {
    if (!cuestionario) return;
    const correctas = cuestionario.preguntas[0].respuestas;
    const iguales = JSON.stringify(correctas) === JSON.stringify(respuestaUsuario);
    setEsCorrecto(iguales);
    setVerificado(true);
  };

  if (!cuestionario) return <p>Cargando cuestionario...</p>;

  const pregunta = cuestionario.preguntas[0];

  return (
    <div className="vista-resolver">
      <h1>{cuestionario.titulo}</h1>
      <p>
        Categoría: <strong>{cuestionario.categoria}</strong> | Dificultad: <strong>{pregunta.dificultad}</strong>
      </p>

      <div className="preg-resolver">
        <h2>{pregunta.titulo}</h2>
        <p>{pregunta.descripcion}</p>
        {pregunta.imagenEnunciado && <img src={pregunta.imagenEnunciado} alt="enunciado" className="img-enunciado" />}

        <h3>Zona de respuesta:</h3>
        <div className="zona-respuestas">
          {respuestaUsuario.map((id, index) => {
            const el = pregunta.elementos.find((e) => e.id === id);
            return (
              <div key={index} className="slot-respuesta">
                {el?.imagen && <img src={el.imagen} alt="" className="img-mini" />}
                <p>{el?.texto}</p>
              </div>
            );
          })}
        </div>

        <h3>Elementos disponibles:</h3>
        <div className="zona-elementos">
          {pregunta.elementos.map((el) => (
            <div
              key={el.id}
              className="item-elemento"
              draggable
              onDragStart={(e) => e.dataTransfer.setData("id", el.id)}
            >
              {el.imagen && <img src={el.imagen} alt="" className="img-mini" />}
              <p>{el.texto}</p>
            </div>
          ))}
        </div>

        <div
          className="zona-drop"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const id = e.dataTransfer.getData("id");
            if (!respuestaUsuario.includes(id)) {
              setRespuestaUsuario([...respuestaUsuario, id]);
            }
          }}
        >
          <p>Arrastra aquí los elementos en el orden correcto</p>
        </div>

        <button onClick={verificarRespuestas} className="btn-verificar">Verificar respuesta</button>

        {verificado && (
          <p className={esCorrecto ? "correcto" : "incorrecto"}>
            {esCorrecto ? "✅ ¡Correcto!" : "❌ Intenta nuevamente."}
          </p>
        )}
      </div>

      {usandoLocal && <p className="info-local">Esta es una vista previa local (sin guardar en Firebase).</p>}
    </div>
  );
}
