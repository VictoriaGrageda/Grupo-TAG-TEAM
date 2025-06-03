const express = require('express');
const cors = require('cors');
const preguntasRouter = require('./routes/preguntas');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/preguntas', preguntasRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
