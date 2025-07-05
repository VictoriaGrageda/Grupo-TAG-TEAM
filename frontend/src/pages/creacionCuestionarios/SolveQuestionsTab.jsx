import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import "./solveEstilos.css";

export default function SolveQuestionsTab() {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const preguntaIndex = parseInt(queryParams.get("index"), 10) || 0;

  const [pregunta, setPregunta] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [slots, setSlots] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const obtenerCuestionario = async () => {
      try {
        const docRef = doc(db, "cuestionarios", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const preguntasArray = data.preguntas;

          if (
            Array.isArray(preguntasArray) &&
            preguntaIndex >= 0 &&
            preguntaIndex < preguntasArray.length
          ) {
            const preg = preguntasArray[preguntaIndex];
            setPregunta(preg);
            setSlots(Array(preg.ordenCorrecto.length).fill(null));
          } else {
            console.warn("❌ Pregunta no encontrada.");
          }
        } else {
          console.warn("❌ Cuestionario no encontrado.");
        }
      } catch (error) {
        console.error("❌ Error al cargar el cuestionario:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerCuestionario();
  }, [id, preguntaIndex]);

  const handleDrop = (e, slotIndex) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    const copia = [...slots];
    if (!copia.includes(id)) {
      copia[slotIndex] = id;
      setSlots(copia);
    }
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("id", id);
  };

  const handleVerificar = () => {
    if (JSON.stringify(slots) === JSON.stringify(pregunta.ordenCorrecto)) {
      setMensaje("✅ ¡Respuesta correcta!");
    } else {
      setMensaje("❌ Respuesta incorrecta. Intenta nuevamente.");
    }
  };

  const handleReiniciar = () => {
    if (pregunta) {
      setSlots(Array(pregunta.ordenCorrecto.length).fill(null));
      setMensaje("");
    }
  };

  return (
    <div className="contenedor-solve">
      <h2 className="titulo-solve">Vista para Resolver Preguntas</h2>
      {cargando ? (
        <p>Cargando...</p>
      ) : !pregunta ? (
        <p>No se encontró la pregunta.</p>
      ) : (
        <div>
          <h3 className="titulo-pregunta">{pregunta.titulo}</h3>
          <p className="descripcion-pregunta"><em>{pregunta.descripcion}</em></p>
          {pregunta.imagenEnunciado && (
            <img
              src={pregunta.imagenEnunciado}
              alt="Imagen del enunciado"
              className="imagen-enunciado"
            />
          )}

          <h4 className="subtitulo-seccion">Ordena correctamente:</h4>
          <div className="zona-slots">
            {slots.map((id, idx) => {
              const elemento = pregunta.elementos.find((el) => el.id === id);
              return (
                <div
                  key={idx}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, idx)}
                  className="slot-drop"
                >
                  {elemento && (
                    <>
                      {elemento.imagen && (
                        <img src={elemento.imagen} alt="" className="imagen-elemento" />
                      )}
                      <p className="texto-elemento">{elemento.texto}</p>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          <h4 className="subtitulo-seccion">Elementos disponibles:</h4>
          <div className="zona-disponibles">
            {pregunta.elementos.map((el) => {
              if (slots.includes(el.id)) return null;
              return (
                <div
                  key={el.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, el.id)}
                  className="elemento-draggable"
                >
                  {el.imagen && (
                    <img src={el.imagen} alt="" className="imagen-elemento" />
                  )}
                  <p className="texto-elemento">{el.texto}</p>
                </div>
              );
            })}
          </div>

          <div className="botones-verificar">
            <button className="btn-verificar" onClick={handleVerificar}>
              Verificar respuesta
            </button>
            <button className="btn-verificar btn-reiniciar" onClick={handleReiniciar}>
              Reiniciar
            </button>
          </div>

          {mensaje && <p className="mensaje-respuesta">{mensaje}</p>}
        </div>
      )}
    </div>
  );
}
