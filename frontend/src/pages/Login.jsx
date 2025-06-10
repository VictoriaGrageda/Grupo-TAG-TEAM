import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { usuarios } from "../usuariosFake";
import "../assets/login.css";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();  // Ya no usamos "user" aquí
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const usuarioEncontrado = usuarios.find(
      (u) =>
        u.correo.toLowerCase() === correo.toLowerCase() &&
        u.contraseña === contraseña
    );

    if (usuarioEncontrado) {
      login(usuarioEncontrado);
      console.log("Usuario logueado:", usuarioEncontrado);
      navigate("/home");
    } else {
      setError("Correo o contraseña incorrectos");
      setContraseña("");
    }
  };

  return (
    <div className="login-container">
      <h2>Ingresa Correo y contraseña</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
        />
        {error && <p className="login-error">{error}</p>}
        <button type="submit">Ingresar</button>
        <button
          type="button"
          onClick={() => navigate("/registro")}
          className="login-alt-btn"
        >
          Crear cuenta
        </button>
      </form>
    </div>
  );
}

export default Login;
