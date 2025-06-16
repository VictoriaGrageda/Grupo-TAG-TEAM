const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

const createUser = async (data) => {
  return await prisma.user.create({
    data,
  });
};

module.exports = {
  getUserByEmail,
  createUser,
};
