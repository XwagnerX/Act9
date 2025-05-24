require('dotenv').config();
const express = require('express');
const cors = require('cors');
const clientRoutes = require('./routes/clientRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Log de configuración
console.log('Configuración de la base de datos:', {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.PORT
});

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/clients', clientRoutes);

// Ruta de prueba
app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error global:', err);
  res.status(500).json({ 
    message: 'Error interno del servidor',
    error: err.message 
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
}); 