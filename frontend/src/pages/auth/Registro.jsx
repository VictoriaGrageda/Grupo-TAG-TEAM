import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/registro.css";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [rol, setRol] = useState("estudiante");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();
    setError("");

    // Validación básica
    if (!nombre || !correo || !contraseña) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const correoValido = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(correo);
    if (!correoValido) {
      setError("Solo se permiten correos @gmail.com");
      return;
    }

    const passValida = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(contraseña);
    if (!passValida) {
      setError("La contraseña debe tener al menos 6 caracteres, una letra y un número.");
      return;
    }

    // Enviar datos al backend
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombre,
          email: correo,
          password: contraseña,
          rol
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al registrar");
        return;
      }

      alert("Cuenta creada correctamente ✅ Ahora puedes iniciar sesión.");
      navigate("/login");
    } catch (err) {
      console.error("Error al registrar:", err);
      setError("No se pudo conectar al servidor.");
    }
  };

  return (
    <div className="registro-container">
      <form className="registro-card" onSubmit={handleRegistro}>
        <h2 className="registro-title">Crear cuenta</h2>

        <div className="input-group">
          <input
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <label>Nombre completo</label>
        </div>

        <div className="input-group">
          <input
            type="email"
            required
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <label>Correo</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            required
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
          <label>Contraseña</label>
        </div>

        <div className="input-group">
          <select value={rol} onChange={(e) => setRol(e.target.value)} required>
            <option value="profesor">Profesor</option>
          </select>
          <label className="label-select">Rol</label>
        </div>

        {error && <p className="registro-error">{error}</p>}

        <button type="submit" className="registro-btn primary">Registrarse</button>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="registro-btn secondary"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
