const Client = require('../models/clientModel');

const clientController = {
  // Obtener todos los clientes
  async getAllClients(req, res) {
    try {
      const clients = await Client.findAll();
      res.json(clients || []);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
      res.status(500).json({ error: 'Error al obtener los clientes', clients: [] });
    }
  },

  // Obtener un cliente por ID
  async getClientById(req, res) {
    try {
      const client = await Client.findById(req.params.id);
      if (!client) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
      res.json(client);
    } catch (error) {
      console.error('Error al obtener cliente:', error);
      res.status(500).json({ error: 'Error al obtener el cliente' });
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
      const client = await Client.create(req.body);
      res.status(201).json(client);
    } catch (error) {
      console.error('Error al crear cliente:', error);
      res.status(500).json({ error: 'Error al crear el cliente' });
    }
  },

  // Actualizar un cliente
  async updateClient(req, res) {
    try {
      const client = await Client.update(req.params.id, req.body);
      if (!client) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
      res.json(client);
    } catch (error) {
      console.error('Error al actualizar cliente:', error);
      res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
  },

  // Eliminar un cliente
  async deleteClient(req, res) {
    try {
      const result = await Client.delete(req.params.id);
      if (!result) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
      res.json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
      res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
  }
};

module.exports = clientController; 