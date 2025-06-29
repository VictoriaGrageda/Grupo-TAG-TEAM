import { useNavigate } from "react-router-dom";
import { Monitor, Globe, Gamepad2 } from "lucide-react";
import { useAuth } from "../../AuthContext";
import { useState, useRef, useEffect } from "react";
import CardCategoria from './components/CardCategoria'
import "../../index.css";

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
  <CardCategoria
    icono={<Globe className="card-icon" />}
    nombre="Geografía"
    descripcion="Explora países, capitales y mapas."
    onClick={() => navigate("/categoria/geografia")} // <-- minúscula
  />
  <CardCategoria
    icono={<Gamepad2 className="card-icon" />}
    nombre="Deportes"
    descripcion="Pon a prueba tus conocimientos deportivos."
    onClick={() => navigate("/categoria/deportes")}
  />
  <CardCategoria
    icono={<Monitor className="card-icon" />}
    nombre="Tecnología"
    descripcion="Responde sobre software, hardware e innovación."
    onClick={() => navigate("/categoria/tecnologia")}
  />
  <CardCategoria
    icono={<Globe className="card-icon" />}
    nombre="Aleatorio"
    descripcion="Un mix de todas las categorías."
    onClick={() => navigate("/categoria/aleatorio")}
  />
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
