const express = require('express');
const cors = require('cors');
const preguntasRouter = require('./routes/preguntas');
const cuestionariosRouter = require('./routes/cuestionarios'); // ESTA ES LA LÍNEA QUE FALTABA

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/preguntas', preguntasRouter);
app.use('/api/cuestionarios', cuestionariosRouter); //  YA NO FALLA

const PORT = 3001;
app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});
