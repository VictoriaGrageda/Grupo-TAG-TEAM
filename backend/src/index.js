const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();
const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload');
require('dotenv').config();

app.use(express.json());
cloudinary.config({ 
  cloud_name: 'dkkpsyzkl', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './tmp/'
}));

// 🔐 AUTENTICACIÓN
const authRoutes = require('./auth/routes/authRoutes');
app.use('/api/auth', authRoutes); // ← añade rutas de login/register


// GET - Todas las preguntas
app.get('/api/questions', async (req, res) => {
  const preguntas = await prisma.pregunta.findMany();
  res.json(preguntas);
});

// GET - Una pregunta por ID
app.get('/api/question/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const pregunta = await prisma.pregunta.findUnique({ where: { id } });
  if (!pregunta) return res.status(404).json({ error: 'Pregunta no encontrada' });
  res.json(pregunta);
});

// POST - Crear nueva pregunta con imagen subida a Cloudinary
app.post('/api/question', async (req, res) => {
  try {
    const { enunciado, categoria, dificultad, respuesta } = req.body;
    let imagenUrl = null;

    if (req.files && req.files.imagen) {
      const resultado = await cloudinary.uploader.upload(req.files.imagen.tempFilePath, {
        folder: 'preguntas'
      });
      imagenUrl = resultado.secure_url;
    }

    const nueva = await prisma.pregunta.create({
      data: {
        enunciado,
        categoria,
        dificultad,
        respuesta,
        url: imagenUrl
      }
    });

    res.status(201).json(nueva);
  } catch (error) {
  console.error("ERROR DETECTADO:", error); // <<<< este log es clave
  res.status(400).json({ error: error.message }); // <<< manda el mensaje real al frontend
}
});

// PUT - Actualizar pregunta
app.put('/api/question/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { enunciado, categoria, dificultad, respuesta } = req.body;
  try {
    const actualizada = await prisma.pregunta.update({
      where: { id },
      data: { enunciado, categoria, dificultad, respuesta }
    });
    res.json(actualizada);
  } catch (error) {
    res.status(404).json({ error: 'No se pudo actualizar la pregunta' });
  }
});

// DELETE - Eliminar pregunta
app.delete('/api/question/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.pregunta.delete({ where: { id } });
    res.json({ mensaje: 'Pregunta eliminada correctamente' });
  } catch (error) {
    res.status(404).json({ error: 'No se pudo eliminar la pregunta' });
  }
});

// GET - Preguntas por categoría
app.get('/api/questions/categoria/:categoria', async (req, res) => {
  const categoria = req.params.categoria;
  try {
    const preguntas = await prisma.pregunta.findMany({
      where: { categoria }
    });

    if (preguntas.length === 0) {
      return res.status(404).json({ error: 'No se encontraron preguntas para esa categoría' });
    }

    res.json(preguntas);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar preguntas por categoría' });
  }
});


// Servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

