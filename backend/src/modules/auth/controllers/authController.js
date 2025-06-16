const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserByEmail, createUser } = require('../models/userModel');

/**
 * Registro de usuario
 * Espera: { nombre, email, password }
 */
const register = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    // Verifica si el usuario ya existe
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ msg: 'El usuario ya está registrado' });
    }

    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea nuevo usuario
    const newUser = await createUser({
      nombre,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ msg: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    res.status(500).json({ msg: 'Error en el servidor', error });
  }
};

/**
 * Inicio de sesión
 * Espera: { email, password }
 */
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
