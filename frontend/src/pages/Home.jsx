import { useNavigate } from "react-router-dom";
import { Monitor, Globe, Gamepad2, User } from "lucide-react";
import { useAuth } from "../AuthContext";
import "../index.css";

export default function Home() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // ahora sacamos el user completo

  const categorias = [
    {
      id: "geografia",
      nombre: "Geografía",
      descripcion: "Explora países, capitales y mapas.",
      icono: <Globe className="card-icon" />,
      color: "bg-indigo",
    },
    {
      id: "deportes",
      nombre: "Deportes",
      descripcion: "Pon a prueba tus conocimientos deportivos.",
      icono: <Gamepad2 className="card-icon" />,
      color: "bg-green",
    },
    {
      id: "tecnologia",
      nombre: "Tecnología",
      descripcion: "Responde sobre software, hardware e innovación.",
      icono: <Monitor className="card-icon" />,
      color: "bg-blue",
    },
    {
      id: "aleatorio",
      nombre: "Aleatorio",
      descripcion: "Un mix de todas las categorías.",
      icono: <Globe className="card-icon" />,
      color: "bg-yellow",
    },
  ];

  return (
    <div className="home-container">
      {/* Sección de cuenta */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <User />
          <span>
            {user?.nombre} ({user?.rol})
          </span>
        </div>
        <button onClick={logout} className="card-button bg-red-600 text-white">
          Cerrar sesión
        </button>
      </div>

      <h1 className="home-title">Plataforma de Cuestionarios</h1>
      <p className="home-description">
        ¡Pon a prueba tus conocimientos en distintas categorías! Selecciona una para comenzar.
      </p>

      <div className="card-grid">
        {categorias.map((cat, index) => (
          <div key={index} className="card">
            {cat.icono}
            <h2 className="card-title">{cat.nombre}</h2>
            <p className="card-description">{cat.descripcion}</p>
            <button
              onClick={() => navigate(`/${cat.id}`)}
              className={`card-button ${cat.color}`}
            >
              Ir a {cat.nombre}
            </button>
          </div>
        ))}
      </div>

      {user?.rol === "profesor" && (
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <button
            className="card-button bg-black text-white"
            onClick={() => navigate("/editor")}
          >
            Crear Cuestionario
          </button>
        </div>
      )}
    </div>
  );
}
