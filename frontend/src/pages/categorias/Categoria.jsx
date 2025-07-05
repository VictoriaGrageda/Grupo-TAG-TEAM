import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function Categoria() {
  const { categoria } = useParams();
  const navigate = useNavigate();
  const nombre = categoria
    ? categoria.charAt(0).toUpperCase() + categoria.slice(1).toLowerCase()
    : "Categoría";

  const [preguntas, setPreguntas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!categoria) return; // Previene error si no hay categoría

    const obtenerCuestionarios = async () => {
      try {
        const q = query(
          collection(db, "cuestionarios"),
          where("categoria", "==", categoria.toLowerCase())
        );
        const querySnapshot = await getDocs(q);
        const todasPreguntas = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (Array.isArray(data.preguntas)) {
            data.preguntas.forEach((pregunta, index) => {
              todasPreguntas.push({ ...pregunta, docId: doc.id, index });
            });
          }
        });

        setPreguntas(todasPreguntas);
      } catch (error) {
        console.error("❌ Error al obtener preguntas:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerCuestionarios();
  }, [categoria]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Categoría: {nombre}</h2>
      {cargando ? (
        <p>Cargando preguntas...</p>
      ) : preguntas.length === 0 ? (
        <p>No hay preguntas aún en esta categoría.</p>
      ) : (
        preguntas.map((p, i) => (
          <div
            key={i}
            style={{
              marginBottom: "2rem",
              borderBottom: "1px solid #ccc",
              paddingBottom: "1rem",
            }}
          >
            <h4>{p.titulo || "Sin título"}</h4>
            <p>
              <strong>Dificultad:</strong> {p.dificultad || "N/A"}
            </p>
            <button
              onClick={() => navigate(`/resolver/${p.docId}?index=${p.index}`)}
              style={{ marginTop: "1rem" }}
            >
              Resolver
            </button>
          </div>
        ))
      )}
    </div>
  );
}
