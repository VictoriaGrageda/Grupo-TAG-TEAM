import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";


export default function Categoria() {
  const { categoria } = useParams();
  const nombre = categoria.charAt(0).toUpperCase() + categoria.slice(1).toLowerCase();
  const [preguntas, setPreguntas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerCuestionarios = async () => {
      try {
        const q = query(
          collection(db, "cuestionarios"),
          where("categoria", "==", categoria.toLowerCase())
        );
        const querySnapshot = await getDocs(q);

        console.log("📄 Documentos encontrados:", querySnapshot.size);

        if (!querySnapshot.empty) {
          const todasPreguntas = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.preguntas && Array.isArray(data.preguntas)) {
              todasPreguntas.push(...data.preguntas);
            } else {
              console.warn("⚠️ Documento sin campo 'preguntas':", doc.id);
            }
          });
          setPreguntas(todasPreguntas);
        } else {
          setPreguntas([]);
        }
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
              marginBottom: "1.5rem",
              borderBottom: "1px solid #ccc",
              paddingBottom: "1rem",
            }}
          >
            <h4>{p.titulo || "Sin título"}</h4>
            <p><strong>Dificultad:</strong> {p.dificultad || "N/A"}</p>
            <p><em>{p.descripcion}</em></p>
            {Array.isArray(p.elementos) && p.elementos.length > 0 ? (
  <ul>
    {p.elementos.map((el, idx) => (
      <li key={idx}>
        {el.texto || "Sin texto"} {el.correcto ? "✅" : ""}
      </li>
    ))}
  </ul>
) : (
  <p>❌ Esta pregunta no tiene elementos.</p>
)}

          </div>
        ))
      )}
    </div>
  );
  
}
