const express = require('express');
const router = express.Router();
const controller = require('../controller/question.controler');

router.get('/questions', controller.obtenerTodas);
router.get('/question/:id', controller.obtenerPorId);
router.post('/question', controller.crear);
router.put('/question/:id', controller.actualizar);
router.delete('/question/:id', controller.eliminar);
router.get('/questions/categoria/:categoria', controller.obtenerPorCategoria);
router.get('/question/:preguntaId/respuestas', controller.obtenerRespuestasPorPregunta);
router.post('/respuesta', controller.crearRespuesta);
router.put('/respuesta/:id', controller.actualizarRespuesta);
router.delete('/respuesta/:id', controller.eliminarRespuesta);

module.exports = router;
