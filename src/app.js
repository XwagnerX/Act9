const express = require('express');
const path = require('path');
const app = express();

// Configuración de middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de Pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Rutas de la API
const clientRoutes = require('./routes/clientRoutes');
app.use('/api/clients', clientRoutes);

// Rutas de las vistas
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/clients', async (req, res) => {
    try {
        const response = await fetch('http://localhost:3000/api/clients');
        const clients = await response.json();
        res.render('clients', { clients });
    } catch (error) {
        console.error('Error:', error);
        res.render('clients', { clients: [] });
    }
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
}); 