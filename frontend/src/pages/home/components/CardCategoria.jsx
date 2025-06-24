
const CardCategoria = ({ icono, nombre, descripcion, onClick }) => {
  return (
    <div className="card">
      {icono}
      <h2 className="card-title">{nombre}</h2>
      <p className="card-description">{descripcion}</p>
      <button onClick={onClick} className="card-button">
        Ir a {nombre}
      </button>
    </div>
  );
};

export default CardCategoria;