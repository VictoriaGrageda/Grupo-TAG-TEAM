import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/intro.css"; // Estilos de la pantalla de bienvenida

export default function Intro() {
  const navigate = useNavigate();

  return (
    <div className="intro-container">
      <header className="intro-header">
        <h2>QuizAR</h2>
      </header>

      <main className="intro-main">
        <h1>Plataforma de <i>Cuestionarios</i></h1>
        <button className="intro-button" onClick={() => navigate("/login")}>
          Ingresar
        </button>
      </main>

      <footer className="intro-footer">
        QuizAR
      </footer>
    </div>
  );
}
