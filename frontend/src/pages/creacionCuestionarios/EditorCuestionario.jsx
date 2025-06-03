
import React, { useState } from "react";
import "./editorCuestionarioEstilo.css";

const EditorCuestionario = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [nombreGrupo, setNombreGrupo] = useState("");
  const [vistaActiva, setVistaActiva] = useState(false);
  const [categoria, setCategoria] = useState("");

  const agregarPregunta = () => {
    setPreguntas((prev) => [
      ...prev,
      {
        titulo: "",
        descripcion: "",
        dificultad: "facil",
        imagenEnunciado: "",
        elementos: [],
        respuestas: [[]], // una o más zonas de respuesta
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

  const agregarZonaRespuesta = (index) => {
    const copia = [...preguntas];
    copia[index].respuestas.push([]);
    setPreguntas(copia);
  };

  const actualizarElemento = (index, elIndex, campo, valor) => {
    const copia = [...preguntas];
    copia[index].elementos[elIndex][campo] = valor;
    setPreguntas(copia);
  };

  const manejarDrop = (e, index, zonaIndex) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    const copia = [...preguntas];
    const zona = copia[index].respuestas[zonaIndex];
    if (!zona.includes(id)) {
      zona.push(id);
    }
    setPreguntas(copia);
  };

  const removerDeZona = (index, idEliminar) => {
    const copia = [...preguntas];
    copia[index].respuestas = copia[index].respuestas.map(zona =>
      zona.filter((id) => id !== idEliminar)
    );
    setPreguntas(copia);
  };

  const guardarTrabajo = () => {
    const cuestionarioFinal = preguntas.map((p) => ({
      ...p,
      elementos: p.elementos.map((e) => ({
        ...e,
        correcto: p.respuestas.some((zona) => zona.includes(e.id.toString())),
      })),
      grupo: nombreGrupo,
      categoria: categoria,
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

        <label>Categoría del cuestionario:</label>
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="">Selecciona una categoría</option>
          <option value="geografia">Geografía</option>
          <option value="deportes">Deportes</option>
          <option value="tecnologia">Tecnología</option>
          <option value="otros">Otros</option>
        </select>
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

          <label>Descripción:</label>
          <textarea
            placeholder="Descripción opcional de la pregunta"
            value={preg.descripcion}
            onChange={(e) => {
              const copia = [...preguntas];
              copia[i].descripcion = e.target.value;
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

          <h4>Zona de elementos para arrastrar:</h4>
          <div className="dropzone">
            {preg.elementos.map((el) => (
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

          <h4>Zonas de respuesta:</h4>
          {preg.respuestas.map((zona, zIndex) => (
            <div
              key={zIndex}
              className="dropzone"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => manejarDrop(e, i, zIndex)}
            >
              {zona.map((id) => {
                const el = preg.elementos.find((e) => e.id.toString() === id);
                if (!el) return null;
                return (
                  <div className="preview-item" key={id} draggable onDragStart={(e) => e.dataTransfer.setData("id", id)}>
                    {el.imagen && <img src={el.imagen} alt="" />}
                    <p>{el.texto}</p>
                  </div>
                );
              })}
            </div>
          ))}
          <button onClick={() => agregarZonaRespuesta(i)}>+ Añadir zona de respuesta</button>
        </div>
      ))}

      <button onClick={agregarPregunta}>Crear nueva pregunta</button>
      <button onClick={guardarTrabajo}>Guardar trabajo</button>
      <button disabled={!vistaActiva} onClick={() => window.location.href = "/cuestionario"}>
        Vista previa
      </button>
    </div>
  );
};

export default EditorCuestionario;
