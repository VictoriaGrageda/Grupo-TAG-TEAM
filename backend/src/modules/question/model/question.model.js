const { PrismaClient } = require('@prisma/client');
const cloudinary = require('cloudinary').v2;
const prisma = new PrismaClient();

// Obtener todas las preguntas (incluye autor y respuestas)
async function obtenerTodas() {
  return await prisma.pregunta.findMany({
    include: {
      user: true,
      respuestas: true,
    }
  });
}

// Obtener pregunta por ID
async function obtenerPorId(id) {
  return await prisma.pregunta.findUnique({
    where: { id },
    include: {
      user: true,
      respuestas: true,
    }
  });
}

// Crear nueva pregunta (requiere userId)
async function crear({ enunciado, categoria, dificultad, respuesta, imagen, userId }) {
  let imagenUrl = null;
  userId=parseInt(userId)

  if (imagen) {
    const resultado = await cloudinary.uploader.upload(imagen.tempFilePath, {
      folder: 'preguntas',
    });
    imagenUrl = resultado.secure_url;
  }

  return await prisma.pregunta.create({
    data: {
      enunciado,
      categoria,
      dificultad,
      respuesta,
      imagenUrl,
      userId,
    }
  });
}

// Actualizar pregunta
async function actualizar(id, data) {
  const datosActualizados = { ...data };

  if (data.imagen) {
    const resultado = await cloudinary.uploader.upload(data.imagen.tempFilePath, {
      folder: 'preguntas',
    });
    datosActualizados.imagenUrl = resultado.secure_url;
    delete datosActualizados.imagen;
  }

  return await prisma.pregunta.update({
    where: { id },
    data: datosActualizados
  });
}

// Eliminar pregunta
async function eliminar(id) {
  return await prisma.pregunta.delete({ where: { id } });
}

// Buscar preguntas por categoría
async function obtenerPorCategoria(categoria) {
  return await prisma.pregunta.findMany({
    where: { categoria },
    include: {
      user: true,
      respuestas: true,
    }
  });
}

// Obtener todas las respuestas de una pregunta
async function obtenerRespuestasPorPregunta(preguntaId) {
  return await prisma.respuesta.findMany({
    where: { preguntaId: parseInt(preguntaId) },
  });
}

// Crear una nueva respuesta (opcional con imagen)
async function crearRespuesta({ texto, imagen, preguntaId }) {
  let imagenUrl = null;

  if (imagen) {
    const resultado = await cloudinary.uploader.upload(imagen.tempFilePath, {
      folder: 'respuestas',
    });
    imagenUrl = resultado.secure_url;
  }

  return await prisma.respuesta.create({
    data: {
      texto,
      imagenUrl,
      preguntaId: parseInt(preguntaId),
    },
  });
}

// Actualizar una respuesta
async function actualizarRespuesta(id, data) {
  const datosActualizados = { ...data };

  if (data.imagen) {
    const resultado = await cloudinary.uploader.upload(data.imagen.tempFilePath, {
      folder: 'respuestas',
    });
    datosActualizados.imagenUrl = resultado.secure_url;
    delete datosActualizados.imagen;
  }

  return await prisma.respuesta.update({
    where: { id: parseInt(id) },
    data: datosActualizados,
  });
}

// Eliminar una respuesta
async function eliminarRespuesta(id) {
  return await prisma.respuesta.delete({
    where: { id: parseInt(id) },
  });
}


module.exports = {
  obtenerTodas,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
  obtenerPorCategoria,
  obtenerRespuestasPorPregunta,
  crearRespuesta,
  actualizarRespuesta,
  eliminarRespuesta
};
