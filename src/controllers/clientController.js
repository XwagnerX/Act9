const Client = require('../models/clientModel');

const clientController = {
  // Obtener todos los clientes
  async getAllClients(req, res) {
    try {
      const clients = await Client.findAll();
      res.json(clients);
    } catch (error) {
      console.error('Error detallado:', error);
      res.status(500).json({ 
        message: 'Error al obtener los clientes',
        error: error.message 
      });
    }
  },

  // Obtener un cliente por ID
  async getClientById(req, res) {
    try {
      const client = await Client.findById(req.params.id);
      if (!client) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }
      res.json(client);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el cliente' });
    }
  },

  // Buscar clientes por destino
  async getClientsByDestination(req, res) {
    try {
      const { destination } = req.query;
      const clients = await Client.findByDestination(destination);
      res.json(clients);
    } catch (error) {
      res.status(500).json({ message: 'Error al buscar clientes por destino' });
    }
  },

  // Crear un nuevo cliente
  async createClient(req, res) {
    try {
      const clientId = await Client.create(req.body);
      res.status(201).json({ id: clientId, message: 'Cliente creado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el cliente' });
    }
  },

  // Actualizar un cliente
  async updateClient(req, res) {
    try {
      const success = await Client.update(req.params.id, req.body);
      if (!success) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }
      res.json({ message: 'Cliente actualizado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el cliente' });
    }
  },

  // Eliminar un cliente
  async deleteClient(req, res) {
    try {
      const success = await Client.delete(req.params.id);
      if (!success) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }
      res.json({ message: 'Cliente eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el cliente' });
    }
  }
};

module.exports = clientController; 