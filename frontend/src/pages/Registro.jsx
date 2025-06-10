import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usuarios } from "../usuariosFake";

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

    usuarios.push({ correo, contraseña, rol, nombre });
    alert("Cuenta creada correctamente. Ahora puedes iniciar sesión.");
    navigate("/login");
  };

  return (
    <div className="login-container">
      <h2>Crear cuenta</h2>
      <form onSubmit={handleRegistro}>
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
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
        <select value={rol} onChange={(e) => setRol(e.target.value)}>
          <option value="estudiante">Estudiante</option>
          <option value="profesor">Profesor</option>
        </select>

        {error && <p className="login-error">{error}</p>}

        <button type="submit">Registrarse</button>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="login-alt-btn"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default Registro;