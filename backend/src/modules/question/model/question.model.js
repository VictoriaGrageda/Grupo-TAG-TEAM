const { PrismaClient } = require('@prisma/client');
const cloudinary = require('cloudinary').v2;
const prisma = new PrismaClient();

async function obtenerTodas() {
  return await prisma.pregunta.findMany();
}

async function obtenerPorId(id) {
  return await prisma.pregunta.findUnique({ where: { id } });
}

async function crear({ enunciado, categoria, dificultad, respuesta, imagen }) {
  let imagenUrl = null;

  if (imagen) {
    const resultado = await cloudinary.uploader.upload(imagen.tempFilePath, {
      folder: 'preguntas'
    });
    imagenUrl = resultado.secure_url;
  }

  return await prisma.pregunta.create({
    data: { enunciado, categoria, dificultad, respuesta, url: imagenUrl }
  });
}

async function actualizar(id, data) {
  return await prisma.pregunta.update({
    where: { id },
    data
  });
}

async function eliminar(id) {
  return await prisma.pregunta.delete({ where: { id } });
}

async function obtenerPorCategoria(categoria) {
  return await prisma.pregunta.findMany({ where: { categoria } });
}

module.exports = {
  obtenerTodas,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
  obtenerPorCategoria
};
