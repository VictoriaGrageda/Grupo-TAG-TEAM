"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import "./editorCuestionarioEstilo.css";
import { subirImagen } from "../../utils/subirImagen";

export default function EditorCuestionario() {
  const [preguntas, setPreguntas] = useState([]);
  const [nombreGrupo, setNombreGrupo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [vistaActiva, setVistaActiva] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("trabajoEnCurso") || "[]");
    if (data.length > 0) {
      setPreguntas(data);
      setNombreGrupo(data[0]?.grupo || "");
      setCategoria(data[0]?.categoria || "");
      setVistaActiva(true);
      localStorage.removeItem("trabajoEnCurso");
    }
  }, []);

  const agregarPregunta = () => {
    setPreguntas((prev) => [
      ...prev,
      {
        titulo: "",
        descripcion: "",
        dificultad: "facil",
        imagenEnunciado: "",
        elementos: [],
        respuestas: [[]],
      },
    ]);
  };

  const agregarElemento = (pregIndex) => {
    const copia = [...preguntas];
    copia[pregIndex].elementos.push({
      texto: "",
      imagen: "",
      id: crypto.randomUUID(),
    });
    setPreguntas(copia);
  };

  const actualizarImagenEnunciado = (pregIndex, url) => {
    const copia = [...preguntas];
    copia[pregIndex].imagenEnunciado = url;
    setPreguntas(copia);
  };


  const agregarZonaRespuesta = (pregIndex) => {
    const copia = [...preguntas];
    copia[pregIndex].respuestas.push([]);
    setPreguntas(copia);
  };

  const actualizarElemento = (pregIndex, elIndex, campo, valor) => {
    const copia = [...preguntas];
    copia[pregIndex].elementos[elIndex][campo] = valor;
    setPreguntas(copia);
  };

  const eliminarElemento = (pregIndex, elId) => {
  const copia = [...preguntas];
  // Elimina el elemento con el id dado
  copia[pregIndex].elementos = copia[pregIndex].elementos.filter((el) => el.id !== elId);
  // También lo remueve de las zonas de respuesta si estaba usado
  copia[pregIndex].respuestas = copia[pregIndex].respuestas.map((zona) =>
    zona.filter((id) => id !== elId)
  );
  setPreguntas(copia);
};


  const manejarDrop = (e, pregIndex, zonaIndex) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    const copia = [...preguntas];
    const zona = copia[pregIndex].respuestas[zonaIndex];
    if (!zona.includes(id)) zona.push(id);
    setPreguntas(copia);
  };

  const removerDeZona = (pregIndex, idEliminar) => {
    const copia = [...preguntas];
    copia[pregIndex].respuestas = copia[pregIndex].respuestas.map((zona) =>
      zona.filter((id) => id !== idEliminar)
    );
    setPreguntas(copia);
  };

  const guardarTrabajo = async () => {
  if (!categoria) {
    alert("⚠️ Debes seleccionar una categoría antes de guardar.");
    return;
  }

  const cuestionario = {
    titulo: nombreGrupo.trim() || "Cuestionario sin título",
    categoria: categoria.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(),
    preguntas: preguntas.map((p) => ({
      titulo: p.titulo,
      descripcion: p.descripcion,
      dificultad: p.dificultad,
      imagenEnunciado: p.imagenEnunciado,
      elementos: (p.elementos || []).map(({ texto, imagen, id }) => ({
      texto: texto || "",
      imagen: imagen || "",
      id,
      correcto: (p.respuestas || []).some((z) => z.includes(id)),
    })),

      ordenCorrecto: p.respuestas.flat(), // Firestore no admite arrays anidados
    })),
    creadoEn: new Date().toISOString(),
  };

  console.log("Guardando cuestionario:", cuestionario);

  localStorage.setItem("cuestionarioCompleto", JSON.stringify(cuestionario));

  try {
    const docRef = await addDoc(collection(db, "cuestionarios"), cuestionario);
    alert(`✅ Cuestionario guardado con ID: ${docRef.id}`);
    setVistaActiva(true);
  } catch (err) {
    console.error("Error al guardar en Firebase:", err);
    alert("❌ No se pudo guardar en Firebase. Se mantiene copia local.");
  }
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
          <option value="geografia">geografia</option>
          <option value="deportes">deportes</option>
          <option value="tecnologia">tecnologia</option>
          <option value="otros">otros</option>
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
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;
              const url = await subirImagen(file.name, file);
              actualizarElemento(i, j, url);
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
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => actualizarElemento(i, j, "imagen", reader.result);
                reader.readAsDataURL(file);
              }}
            />
            <button onClick={() => eliminarElemento(i, el.id)} style={{ backgroundColor: "#e74c3c" }}>
              Eliminar
            </button>
          </div>
        ))}
         

          <button onClick={() => agregarElemento(i)}>+ Añadir elemento</button>

          <h4>Zona de elementos para arrastrar:</h4>
          <div className="dropzone">
            {preg.elementos.map((el) => (
              <div
                key={el.id}
                className="preview-item"
                draggable
                onDragStart={(e) => e.dataTransfer.setData("id", el.id)}
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
                const el = preg.elementos.find((e) => e.id === id);
                if (!el) return null;
                return (
                  <div
                    key={id}
                    className="preview-item"
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData("id", id)}
                  >
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
      <button disabled={!vistaActiva} onClick={() => navigate("/cuestionario")}>Vista previa</button>
    </div>
  );
}
