require('dotenv').config();
const express = require('express');
const cors = require('cors');
const clientRoutes = require('./routes/clientRoutes');

const app = express();
const port = process.env.PORT || 3000;

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
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
}); 