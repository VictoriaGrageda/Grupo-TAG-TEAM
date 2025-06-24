import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import "../../assets/login.css";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  const correoValido = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(correo);
  if (!correoValido) {
    setError("Solo se permiten correos @gmail.com");
    return;
  }

  const contraseñaValida = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(contraseña);
  if (!contraseñaValida) {
    setError("La contraseña debe tener mínimo 6 caracteres, una letra y un número");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: correo, password: contraseña }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.msg || "Error al iniciar sesión");
      return;
    }

    login(data.user); // viene de useAuth
    navigate("/Home");
  } catch (err) {
    console.error("Error:", err);
    setError("No se pudo conectar con el servidor");
  }
};

  return (
    <div className="login-wrapper">
      <form className="login-card" onSubmit={handleLogin}>
        <h2 className="login-title">Bienvenido</h2>
        <p className="login-sub">Inicia sesión con tu cuenta</p>

        <div className="input-group">
          <input
            type="email"
            required
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder=" "
          />
          <label>Correo electrónico</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            required
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            placeholder=" "
          />
          <label>Contraseña</label>
        </div>

        {error && <p className="login-error">{error}</p>}

        <button type="submit" className="login-btn primary">Ingresar</button>
        <button
          type="button"
          className="login-btn secondary"
          onClick={() => navigate("/registro")}
        >
          Crear cuenta
        </button>
      </form>
    </div>
  );
}
