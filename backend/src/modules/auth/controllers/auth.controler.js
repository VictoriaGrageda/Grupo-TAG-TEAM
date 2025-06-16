const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserByEmail, createUser } = require('../models/user.model');

const register = async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ msg: 'El usuario ya está registrado' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({
      nombre,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { userId: newUser.id, nombre: newUser.nombre },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );
    res.status(201).json({
      msg: 'Usuario registrado exitosamente',
      user: {
        id: newUser.id,
        nombre: newUser.nombre,
        email: newUser.email
      },
      token
    });
  } catch (error) {
    res.status(500).json({ msg: 'Error en el servidor', error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ msg: 'Contraseña incorrecta' });
    }
    const token = jwt.sign(
      { userId: user.id, nombre: user.nombre },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );
    res.json({ msg: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ msg: 'Error al iniciar sesión', error });
  }
};
module.exports = { register, login };
