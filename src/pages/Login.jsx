import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/login.css";

export default function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");

  const handleLogin = () => {
    if (usuario && clave) {
      // Aquí podrías validar el login con backend si deseas.
      navigate("/home");
    } else {
      alert("Por favor completa ambos campos");
    }
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <h2>QuizAR</h2>
      </header>

      <main className="login-main">
        <h3>Ingresa usuario y contraseña</h3>
        <div className="login-form">
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
          />
          <button onClick={handleLogin}>Ingresar</button>
          <a href="#">¿Olvidaste tu contraseña?</a>
          <button className="crear-cuenta">Crear cuenta</button>
        </div>
      </main>

      <footer className="login-footer">QuizAR</footer>
    </div>
  );
}
