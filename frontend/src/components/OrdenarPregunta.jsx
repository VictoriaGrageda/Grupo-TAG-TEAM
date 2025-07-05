import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableItem({ item }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "10px",
    margin: "5px",
    border: "2px solid #ccc",
    borderRadius: "10px",
    width: "100px",
    backgroundColor: "white",
    textAlign: "center",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <img src={item.imagen} alt={item.texto} style={{ width: "100%", height: "70px", objectFit: "cover" }} />
      <div>{item.texto}</div>
    </div>
  );
}

export default function OrdenarPregunta({ pregunta }) {
  const [ordenUsuario, setOrdenUsuario] = useState(pregunta.elementos);
  const [resultado, setResultado] = useState(null);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = ordenUsuario.findIndex((item) => item.id === active.id);
      const newIndex = ordenUsuario.findIndex((item) => item.id === over?.id);
      setOrdenUsuario(arrayMove(ordenUsuario, oldIndex, newIndex));
    }
  };

  const verificarOrden = () => {
    const ordenCorrecta = pregunta.respuestas;
    const idsUsuario = ordenUsuario.map((item) => item.id);
    const esCorrecto = JSON.stringify(idsUsuario) === JSON.stringify(ordenCorrecta);
    setResultado(esCorrecto ? "✅ Correcto" : "❌ Incorrecto");
  };

  return (
    <div>
      <h2>{pregunta.titulo}</h2>
      <p>{pregunta.descripcion}</p>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={ordenUsuario.map((item) => item.id)} strategy={verticalListSortingStrategy}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", background: "#f0f0f0", padding: "10px" }}>
            {ordenUsuario.map((item) => (
              <SortableItem key={item.id} item={item} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <button onClick={verificarOrden} style={{ marginTop: "20px" }}>Verificar orden</button>
      {resultado && <p style={{ fontWeight: "bold" }}>{resultado}</p>}
    </div>
  );
}
