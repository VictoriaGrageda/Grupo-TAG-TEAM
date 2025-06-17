const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener usuario por email, incluyendo sus preguntas y respuestas
const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email }
  });
};

// Crear nuevo usuario
const createUser = async ({ nombre, email, password }) => {
  return await prisma.user.create({
    data: {
      nombre,
      email,
      password,
    }
  });
};

// Obtener usuario por ID (útil si quieres acceder desde middleware u otros endpoints)
const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      preguntas: {
        include: { respuestas: true }
      }
    }
  });
};

module.exports = {
  getUserByEmail,
  getUserById,
  createUser,
};
