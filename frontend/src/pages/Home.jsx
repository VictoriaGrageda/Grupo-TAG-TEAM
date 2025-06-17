import { useNavigate } from "react-router-dom";
import { Monitor, Globe, Gamepad2 } from "lucide-react";
import { useAuth } from "../AuthContext";
import { useState, useRef, useEffect } from "react";
import "../index.css";

export default function Home() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const avatarLetter = user?.nombre?.charAt(0).toUpperCase() || "U";

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

  if (!user) return <div className="loading">Cargando usuario...</div>;

  return (
    <div className="home-container">
      <div className="user-google-style" ref={menuRef}>
        <div className="avatar" onClick={() => setMenuOpen(!menuOpen)}>
          {avatarLetter}
        </div>
        {menuOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-header">
              <div className="dropdown-avatar">{avatarLetter}</div>
              <div>
                <div className="dropdown-name">{user?.nombre}</div>
              </div>
            </div>
            <hr />
            <button onClick={() => alert("Gestionar cuenta próximamente 😅")}>
              Gestionar cuenta
            </button>
            <button onClick={logout}>Cerrar sesión</button>
          </div>
        )}
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
