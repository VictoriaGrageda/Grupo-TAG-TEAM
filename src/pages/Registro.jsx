import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usuarios } from "../usuariosFake";
import "../assets/registro.css";

function Registro() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [rol, setRol] = useState("estudiante");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegistro = (e) => {
    e.preventDefault();

    const existe = usuarios.find((u) => u.correo === correo);
    if (existe) {
      setError("Ya existe una cuenta con ese correo.");
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

    usuarios.push({ correo, contraseña, rol, nombre });
    alert("Cuenta creada correctamente. Ahora puedes iniciar sesión.");
    navigate("/login");
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
            <option value="estudiante">Estudiante</option>
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

export default Registro;
