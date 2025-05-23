import React, { useState, useref } from "react";
import "./editorCuestionarioEstilo.css";


const EditorCuestionario = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [nombreGrupo, setNombreGrupo] = useState("");
  const [vistaActiva, setVistaActiva] = useState(false);

  const agregarPregunta = () => {
    setPreguntas((prev) => [
      ...prev,
      {
        titulo: "",
        dificultad: "facil",
        imagenEnunciado: "",
        elementos: [],
        respuesta: [],
      },
    ]);
  };

  const agregarElemento = (index) => {
    const copia = [...preguntas];
    copia[index].elementos.push({
      texto: "",
      imagen: "",
      id: Date.now() + Math.random(),
    });
    setPreguntas(copia);
  };

  const actualizarElemento = (index, elIndex, campo, valor) => {
    const copia = [...preguntas];
    copia[index].elementos[elIndex][campo] = valor;
    setPreguntas(copia);
  };

  const manejarDrop = (e, index, zona) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    const copia = [...preguntas];
    const yaEsta = copia[index].respuesta.includes(id);
    if (zona === "respuesta" && !yaEsta) {
      copia[index].respuesta.push(id);
    } else if (zona === "creacion") {
      copia[index].respuesta = copia[index].respuesta.filter((i) => i !== id);
    }
    setPreguntas(copia);
  };

  const guardarTrabajo = () => {
    const cuestionarioFinal = preguntas.map((p) => ({
      ...p,
      elementos: p.elementos.map((e) => ({
        ...e,
        correcto: p.respuesta.includes(e.id.toString()),
      })),
      grupo: nombreGrupo,
    }));
    localStorage.setItem("cuestionarioCompleto", JSON.stringify(cuestionarioFinal));
    alert("Trabajo guardado correctamente");
    setVistaActiva(true);
  };

  return (
    <div className="vista-cuestionario">
      <h1>Creador de Cuestionarios Interactivos</h1>
      <section>
        <label>Nombre del cuestionario:</label>
        <input
          type="text"
          placeholder="Dale un título atractivo"
          value={nombreGrupo}
          onChange={(e) => setNombreGrupo(e.target.value)}
        />
      </section>

      {preguntas.map((preg, i) => (
        <div key={i} className="pregunta-block">
          <label>Enunciado:</label>
          <input
            type="text"
            placeholder="Texto de la pregunta"
            value={preg.titulo}
            onChange={(e) => {
              const copia = [...preguntas];
              copia[i].titulo = e.target.value;
              setPreguntas(copia);
            }}
          />

          <label>Imagen del enunciado:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                  const copia = [...preguntas];
                  copia[i].imagenEnunciado = reader.result;
                  setPreguntas(copia);
                };
                reader.readAsDataURL(file);
              }
            }}
          />

          <label>Dificultad:</label>
          <select
            value={preg.dificultad}
            onChange={(e) => {
              const copia = [...preguntas];
              copia[i].dificultad = e.target.value;
              setPreguntas(copia);
            }}
          >
            <option value="facil">Fácil</option>
            <option value="intermedio">Intermedio</option>
            <option value="dificil">Difícil</option>
          </select>

          {preg.elementos.map((el, j) => (
            <div className="elemento" key={el.id}>
              <input
                type="text"
                placeholder="Texto"
                value={el.texto}
                onChange={(e) => actualizarElemento(i, j, "texto", e.target.value)}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => actualizarElemento(i, j, "imagen", reader.result);
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
          ))}

          <button onClick={() => agregarElemento(i)}>+ Añadir elemento</button>

          <h4>Elementos creados:</h4>
          <div
            className="dropzone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => manejarDrop(e, i, "creacion")}
          >
            {preg.elementos
              .filter((el) => !preg.respuesta.includes(el.id.toString()))
              .map((el) => (
                <div
                  className="preview-item"
                  key={el.id}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData("id", el.id.toString())}
                >
                  {el.imagen && <img src={el.imagen} alt="" />}
                  <p>{el.texto}</p>
                </div>
              ))}
          </div>

          <h4>Arrastra aquí para definir la respuesta/s correcta:</h4>
          <div
            className="dropzone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => manejarDrop(e, i, "respuesta")}
          >
            {preg.elementos
              .filter((el) => preg.respuesta.includes(el.id.toString()))
              .map((el) => (
                <div
                  className="preview-item"
                  key={el.id}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData("id", el.id.toString())}
                >
                  {el.imagen && <img src={el.imagen} alt="" />}
                  <p>{el.texto}</p>
                </div>
              ))}
          </div>
        </div>
      ))}

      <button onClick={agregarPregunta}>Crear nueva pregunta</button>
      <button onClick={guardarTrabajo}>Guardar trabajo</button>
      <button disabled={!vistaActiva} onClick={() => window.location.href = "/vista"}>
        Vista previa
      </button>
    </div>
  );
};

export default EditorCuestionario;
