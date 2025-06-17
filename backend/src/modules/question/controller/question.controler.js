const preguntaModel = require('../model/question.model');

exports.obtenerTodas = async (req, res) => {
  const preguntas = await preguntaModel.obtenerTodas();
  res.json(preguntas);
};

exports.obtenerPorId = async (req, res) => {
  const pregunta = await preguntaModel.obtenerPorId(parseInt(req.params.id));
  if (!pregunta) return res.status(404).json({ error: 'Pregunta no encontrada' });
  res.json(pregunta);
};

exports.crear = async (req, res) => {
  try {
    const nueva = await preguntaModel.crear({
      ...req.body,
      imagen: req.files?.imagen
    });
    res.status(201).json(nueva);
  } catch (error) {
    console.error('Error al crear:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const actualizada = await preguntaModel.actualizar(parseInt(req.params.id), req.body);
    res.json(actualizada);
  } catch (error) {
    res.status(404).json({ error: 'No se pudo actualizar la pregunta' });
  }
};

exports.eliminar = async (req, res) => {
  try {
    await preguntaModel.eliminar(parseInt(req.params.id));
    res.json({ mensaje: 'Pregunta eliminada correctamente' });
  } catch (error) {
    res.status(404).json({ error: 'No se pudo eliminar la pregunta' });
  }
};

exports.obtenerPorCategoria = async (req, res) => {
  const preguntas = await preguntaModel.obtenerPorCategoria(req.params.categoria);
  if (preguntas.length === 0)
    return res.status(404).json({ error: 'No se encontraron preguntas para esa categoría' });
  res.json(preguntas);
};

exports.obtenerRespuestasPorPregunta = async (req, res) => {
  const respuestas = await preguntaModel.obtenerRespuestasPorPregunta(parseInt(req.params.preguntaId));
  res.json(respuestas);
};

exports.crearRespuesta = async (req, res) => {
  try {
    const nueva = await preguntaModel.crearRespuesta({
      ...req.body,
      imagen: req.files?.imagen,
    });
    res.status(201).json(nueva);
  } catch (error) {
    console.error('Error al crear respuesta:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.actualizarRespuesta = async (req, res) => {
  try {
    const actualizada = await preguntaModel.actualizarRespuesta(parseInt(req.params.id), {
      ...req.body,
      imagen: req.files?.imagen,
    });
    res.json(actualizada);
  } catch (error) {
    console.error('Error al actualizar respuesta:', error);
    res.status(400).json({ error: 'No se pudo actualizar la respuesta' });
  }
};

exports.eliminarRespuesta = async (req, res) => {
  try {
    await preguntaModel.eliminarRespuesta(parseInt(req.params.id));
    res.json({ mensaje: 'Respuesta eliminada correctamente' });
  } catch (error) {
    res.status(404).json({ error: 'No se pudo eliminar la respuesta' });
  }
};
