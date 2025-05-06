const preguntas = JSON.parse(localStorage.getItem("cuestionarioCompleto") || "[]");
const contenedor = document.getElementById("cuestionario");

preguntas.forEach((pregunta, idx) => {
  const div = document.createElement("div");
  div.className = "pregunta-block";

  const h3 = document.createElement("h3");
  h3.textContent = "Pregunta " + (idx + 1);
  div.appendChild(h3);

  if (pregunta.imagenEnunciado) {
    const img = document.createElement("img");
    img.src = pregunta.imagenEnunciado;
    img.style.maxWidth = "300px";
    img.style.display = "block";
    div.appendChild(img);
  }

  const p = document.createElement("p");
  p.textContent = pregunta.titulo;
  div.appendChild(p);

  const zonaOpciones = document.createElement("div");
  zonaOpciones.className = "dropzone";
  zonaOpciones.id = "opciones-" + idx;

  const zonaRespuesta = document.createElement("div");
  zonaRespuesta.className = "dropzone";
  zonaRespuesta.id = "respuesta-" + idx;

  const mezcladas = [...pregunta.elementos].sort(() => Math.random() - 0.5);

  mezcladas.forEach((e, i) => {
    const item = document.createElement("div");
    item.className = "preview-item";
    item.draggable = true;
    item.dataset.texto = e.texto;

    if (e.imagen) {
      const img = document.createElement("img");
      img.src = e.imagen;
      item.appendChild(img);
    }

    const text = document.createElement("p");
    text.textContent = e.texto;
    item.appendChild(text);

    item.addEventListener("dragstart", () => item.classList.add("dragging"));
    item.addEventListener("dragend", () => item.classList.remove("dragging"));

    zonaOpciones.appendChild(item);
  });

  [zonaOpciones, zonaRespuesta].forEach(z => {
    z.addEventListener("dragover", e => e.preventDefault());
    z.addEventListener("drop", e => {
      const dragging = document.querySelector(".dragging");
      if (dragging) z.appendChild(dragging);
    });
  });

  div.appendChild(zonaOpciones);
  const label = document.createElement("p");
  label.textContent = "Arrastra aquí tu respuesta:";
  div.appendChild(label);
  div.appendChild(zonaRespuesta);

  const resultado = document.createElement("p");
  resultado.id = "resultado-" + idx;
  div.appendChild(resultado);

  contenedor.appendChild(div);
});

function verificarTodo() {
  preguntas.forEach((preg, idx) => {
    const zona = document.getElementById("respuesta-" + idx);
    const items = zona.querySelectorAll(".preview-item p");
    const textos = Array.from(items).map(p => p.textContent);
    const correctos = preg.elementos.filter(e => e.correcto).map(e => e.texto);

    const esCorrecto = textos.length === correctos.length &&
      textos.every((t, i) => t === correctos[i]);

    document.getElementById("resultado-" + idx).textContent = esCorrecto
      ? " Correcto"
      : " Incorrecto";
  });
}
