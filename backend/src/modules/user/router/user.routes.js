const express = require('express');
const router = express.Router();
const controller = require('../controller/user.controller');
const { verificarToken } = require('../../auth/middleware/authMiddleware');

router.get('/users', verificarToken, controller.obtenerTodos);
router.get('/user/:id', verificarToken, controller.obtenerPorId);
router.put('/user/:id', verificarToken, controller.actualizar);
router.delete('/user/:id', verificarToken, controller.eliminar);

module.exports = router;
