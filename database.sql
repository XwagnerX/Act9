-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS agenda_viajes;
USE agenda_viajes;

-- Crear la tabla de clientes
CREATE TABLE IF NOT EXISTS clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    travel_destination VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar algunos datos de prueba
INSERT INTO clients (name, surname, phone, email, travel_destination) VALUES
('Juan', 'Pérez', '123456789', 'juan@email.com', 'París'),
('María', 'García', '987654321', 'maria@email.com', 'Roma'),
('Carlos', 'López', '456789123', 'carlos@email.com', 'Londres'); 