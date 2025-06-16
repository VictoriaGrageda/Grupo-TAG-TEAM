const express = require('express');
const router = express.Router();
const controller = require('../controller/questionController');

router.get('/questions', controller.obtenerTodas);
router.get('/question/:id', controller.obtenerPorId);
router.post('/question', controller.crear);
router.put('/question/:id', controller.actualizar);
router.delete('/question/:id', controller.eliminar);
router.get('/questions/categoria/:categoria', controller.obtenerPorCategoria);

module.exports = router;
