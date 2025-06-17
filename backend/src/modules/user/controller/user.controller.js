const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userModel = require('../model/user.model');
exports.obtenerTodos = async (req, res) => {
  const usuarios = await userModel.getAllUsers();
  res.json(usuarios);
};

exports.obtenerPorId = async (req, res) => {
  const usuario = await userModel.getUserById(parseInt(req.params.id));
  if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado' });
  res.json(usuario);
};

exports.actualizar = async (req, res) => {
  try {
    const usuario = await userModel.updateUser(parseInt(req.params.id), req.body);
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    await userModel.deleteUser(parseInt(req.params.id));
    res.json({ msg: 'Usuario eliminado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};