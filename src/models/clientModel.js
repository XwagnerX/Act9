const db = require('../config/database');

class Client {
  static async findAll() {
    try {
      const [rows] = await db.query('SELECT * FROM clients ORDER BY name');
      return rows;
    } catch (error) {
      console.error('Error en findAll:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM clients WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error('Error en findById:', error);
      throw error;
    }
  }

  static async findByDestination(destination) {
    try {
      const [rows] = await db.query('SELECT * FROM clients WHERE travel_destination LIKE ?', [`%${destination}%`]);
      return rows;
    } catch (error) {
      console.error('Error en findByDestination:', error);
      throw error;
    }
  }

  static async create(clientData) {
    try {
      const { name, surname, phone, email, travel_destination } = clientData;
      const [result] = await db.query(
        'INSERT INTO clients (name, surname, phone, email, travel_destination) VALUES (?, ?, ?, ?, ?)',
        [name, surname, phone, email, travel_destination]
      );
      return this.findById(result.insertId);
    } catch (error) {
      console.error('Error en create:', error);
      throw error;
    }
  }

  static async update(id, clientData) {
    try {
      const { name, surname, phone, email, travel_destination } = clientData;
      const [result] = await db.query(
        'UPDATE clients SET name = ?, surname = ?, phone = ?, email = ?, travel_destination = ? WHERE id = ?',
        [name, surname, phone, email, travel_destination, id]
      );
      
      if (result.affectedRows === 0) {
        return null;
      }
      
      return this.findById(id);
    } catch (error) {
      console.error('Error en update:', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const [result] = await db.query('DELETE FROM clients WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error en delete:', error);
      throw error;
    }
  }
}

module.exports = Client; 