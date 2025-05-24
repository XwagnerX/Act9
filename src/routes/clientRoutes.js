const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Obtener todos los clientes
router.get('/', clientController.getAllClients);

// Buscar clientes por destino
router.get('/search', clientController.getClientsByDestination);

// Obtener un cliente por ID
router.get('/:id', clientController.getClientById);

// Crear un nuevo cliente
router.post('/', clientController.createClient);

// Actualizar un cliente
router.put('/:id', clientController.updateClient);

// Eliminar un cliente
router.delete('/:id', clientController.deleteClient);

module.exports = router; 