const db = require('../config/database');

class Client {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM clients');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM clients WHERE id = ?', [id]);
    return rows[0];
  }

  static async findByDestination(destination) {
    const [rows] = await db.query('SELECT * FROM clients WHERE travel_destination LIKE ?', [`%${destination}%`]);
    return rows;
  }

  static async create(clientData) {
    const { name, surname, phone, email, travel_destination } = clientData;
    const [result] = await db.query(
      'INSERT INTO clients (name, surname, phone, email, travel_destination) VALUES (?, ?, ?, ?, ?)',
      [name, surname, phone, email, travel_destination]
    );
    return result.insertId;
  }

  static async update(id, clientData) {
    const { name, surname, phone, email, travel_destination } = clientData;
    const [result] = await db.query(
      'UPDATE clients SET name = ?, surname = ?, phone = ?, email = ?, travel_destination = ? WHERE id = ?',
      [name, surname, phone, email, travel_destination, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM clients WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Client; 