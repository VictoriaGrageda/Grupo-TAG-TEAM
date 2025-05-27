import React, { useEffect, useState } from "react";
import "./vistaCuestionarioEstilo.css";

const VistaCuestionario = () => {
  const [preguntas, setPreguntas] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cuestionarioCompleto") || "[]");
    setPreguntas(data);
  }, []);

  const verificarTodo = () => {
    preguntas.forEach((preg, idx) => {
      const zona = document.getElementById("respuesta-" + idx);
      const items = zona.querySelectorAll(".preview-item p");
      const textos = Array.from(items).map((p) => p.textContent);
      const correctos = preg.elementos.filter((e) => e.correcto).map((e) => e.texto);

      const esCorrecto =
        textos.length === correctos.length &&
        textos.every((t, i) => t === correctos[i]);

      document.getElementById("resultado-" + idx).textContent = esCorrecto
        ? " Correcto"
        : " Incorrecto";
    });
  };

  const exportarPDF = () => {
    if (!preguntas.length) return alert("No hay preguntas para exportar.");
    const ventana = window.open("", "_blank");
    ventana.document.write("<html><head><title>Cuestionario PDF</title><style>");
    ventana.document.write("body { font-family: Arial; padding: 20px; }");
    ventana.document.write(".tarjeta { border: 2px solid #333; padding: 15px; border-radius: 10px; margin-bottom: 20px; }");
    ventana.document.write(".tarjeta img { max-width: 200px; display: block; margin-bottom: 10px; }");
    ventana.document.write("</style></head><body>");

    preguntas.forEach((preg, i) => {
      ventana.document.write("<div class='tarjeta'>");
      ventana.document.write("<h3>Pregunta " + (i + 1) + "</h3>");
      if (preg.imagenEnunciado) ventana.document.write("<img src='" + preg.imagenEnunciado + "'/>");
      ventana.document.write("<p><strong>" + preg.titulo + "</strong></p>");
      if (preg.descripcion) ventana.document.write("<p><em>" + preg.descripcion + "</em></p>");
      ventana.document.write("<p><em>Dificultad: " + preg.dificultad + "</em></p>");
      ventana.document.write("<ul>");
      preg.elementos.forEach((e) => ventana.document.write("<li>" + e.texto + "</li>"));
      ventana.document.write("</ul></div>");
    });

    ventana.document.write("</body></html>");
    ventana.document.close();
    ventana.print();
  };

  const copiarEnlace = () => {
    const encoded = encodeURIComponent(localStorage.getItem("cuestionarioCompleto") || "");
    const enlace = location.origin + location.pathname + "?q=" + encoded;
    navigator.clipboard.writeText(enlace);
    alert("Enlace copiado al portapapeles");
  };

  return (
    <div className="vista-cuestionario">
      <h1>Resuelve el Cuestionario</h1>
      {preguntas.map((preg, idx) => (
        <div key={idx} className="pregunta-block">
          <h3>Pregunta {idx + 1}</h3>
          {preg.imagenEnunciado && (
            <img src={preg.imagenEnunciado} alt="" style={{ maxWidth: "300px" }} />
          )}
          <p><strong>{preg.titulo}</strong></p>
          {preg.descripcion && <p style={{ fontStyle: "italic", color: "#555" }}>{preg.descripcion}</p>}

          <div id={`opciones-${idx}`} className="dropzone">
            {[...preg.elementos].sort(() => Math.random() - 0.5).map((e, i) => (
              <div
                key={i}
                className="preview-item"
                draggable
                onDragStart={(ev) => ev.currentTarget.classList.add("dragging")}
                onDragEnd={(ev) => ev.currentTarget.classList.remove("dragging")}
                data-texto={e.texto}
              >
                {e.imagen && <img src={e.imagen} alt="" />}
                <p>{e.texto}</p>
              </div>
            ))}
          </div>

          <p>Arrastra aquí tu respuesta:</p>
          <div
            id={`respuesta-${idx}`}
            className="dropzone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const dragging = document.querySelector(".dragging");
              if (dragging) e.currentTarget.appendChild(dragging);
            }}
          ></div>

          <p id={`resultado-${idx}`}></p>
        </div>
      ))}

      <button onClick={verificarTodo}>Verificar todas las respuestas</button>
      <button onClick={exportarPDF}>Exportar como PDF</button>
      <button onClick={copiarEnlace}>Copiar enlace</button>
    </div>
  );
};

export default VistaCuestionario;