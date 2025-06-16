const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Busca un usuario por su email
 * @param {string} email
 * @returns {Promise<Object|null>}
 */
const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

/**
 * Crea un nuevo usuario en la base de datos
 * @param {{ nombre: string, email: string, password: string }} data
 * @returns {Promise<Object>}
 */
const createUser = async (data) => {
  return await prisma.user.create({
    data,
  });
};

module.exports = {
  getUserByEmail,
  createUser,
};
