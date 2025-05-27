import React from "react";
import "../assets/modal.css";

export default function ModalDificultad({ onSelect, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Selecciona la dificultad</h2>
        <div className="modal-buttons">
          <button onClick={() => onSelect("Fácil")}>Fácil</button>
          <button onClick={() => onSelect("Intermedio")}>Intermedio</button>
          <button onClick={() => onSelect("Difícil")}>Difícil</button>
        </div>
        <button className="modal-close" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}
