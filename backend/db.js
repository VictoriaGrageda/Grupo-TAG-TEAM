const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'cuestionarios_interactivos',
});

db.connect((err) => {
  if (err) {
    console.error('❌ Error de conexión:', err);
  } else {
    console.log('✅ Conectado a la base de datos');
  }
});

module.exports = db;
