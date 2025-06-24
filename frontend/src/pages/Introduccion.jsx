import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/intro.css";

export default function Intro() {
  const navigate = useNavigate();

  return (
    <div className="intro-container">
      <header className="intro-header">
        <h2 className="logo">QuizAR</h2>
      </header>

      <main className="intro-main">
        <h1>
          Bienvenido a la <span>Plataforma de</span> <i>Cuestionarios</i>
        </h1>
        <p className="intro-sub">Explora, aprende y pon a prueba tus conocimientos</p>
        <button className="intro-button" onClick={() => navigate("/login")}>
          Ingresar
        </button>
      </main>
      <footer className="intro-footer"> 2025 QuizAR</footer>
    </div>
  );
}
