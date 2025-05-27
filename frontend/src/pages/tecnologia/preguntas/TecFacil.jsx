import React from "react";
import PreguntaOrdenamiento from "../PreguntaOrdenamiento";

export default function Facil() {
  const elementos = [
  {
    nombre: "Elemento A",
    imagen: "https://via.placeholder.com/100x80.png?text=A"
  },
  {
    nombre: "Elemento B",
    imagen: "https://via.placeholder.com/100x80.png?text=B"
  },
  {
    nombre: "Elemento C",
    imagen: "https://via.placeholder.com/100x80.png?text=C"
  },
  {
    nombre: "Elemento D",
    imagen: "https://via.placeholder.com/100x80.png?text=D"
  }
];


  const ordenCorrecto = [
    "Teléfono fijo",
    "Televisor",
    "Computadora personal",
    "Smartphone"
  ];

  return (
    <PreguntaOrdenamiento
      titulo="Ordena los dispositivos del más antiguo al más moderno"
      elementos={elementos}
      ordenCorrecto={ordenCorrecto}
    />
  );
}
