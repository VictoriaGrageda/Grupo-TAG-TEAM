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

// 🔐 Rutas de autenticación
const authRoutes = require('./modules/auth/routes/user.routes');
app.use('/api/auth', authRoutes); // ← añade rutas de login/register

// 📦 Rutas de preguntas
const questionRoutes = require('./question/router/questionRouter');
app.use('/api', questionRoutes);

// Servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

