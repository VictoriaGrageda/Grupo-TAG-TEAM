const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:dificultad', (req, res) => {
  const { dificultad } = req.params;
  const sql = `SELECT * FROM preguntas WHERE dificultad = ?`;

  db.query(sql, [dificultad], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

module.exports = router;
