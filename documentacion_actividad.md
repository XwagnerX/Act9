# Documentación de la Actividad: Agenda de Viajes

## 1. Descripción del Proyecto
El proyecto "Agenda de Viajes" es una aplicación web que permite gestionar clientes de una agencia de viajes. La aplicación incluye:
- Página de presentación con el nombre del alumno
- Sección de gestión de clientes con funcionalidades CRUD
- API REST para la comunicación con la base de datos

## 2. Estructura del Proyecto

### 2.1 Frontend
- Página principal con diseño responsivo
- Sección de gestión de clientes que incluye:
  - Tabla de clientes
  - Formularios para añadir/editar clientes
  - Buscador de clientes
  - Acciones de editar/eliminar por cliente

### 2.2 Backend
- API REST con endpoints para todas las operaciones CRUD
- Base de datos MySQL para almacenamiento persistente
- Estructura organizada en carpetas:
  ```
  src/
  ├── config/         # Configuración de la base de datos
  ├── controllers/    # Lógica de negocio
  ├── models/         # Modelos de datos
  ├── routes/         # Definición de rutas
  └── index.js        # Punto de entrada
  ```

## 3. Pasos Realizados

### 3.1 Inicialización del Proyecto
1. **Configuración Inicial**:
   - Instalación de Node.js y npm
   - Creación del proyecto base
   - Instalación de dependencias:
     ```bash
     npm install express mysql2 cors dotenv
     ```

2. **Estructura de Carpetas**:
   - Creación de la estructura MVC
   - Implementación del endpoint de prueba `/api/ping`

### 3.2 Base de Datos MySQL
1. **Diseño de la Base de Datos**:
   ```sql
   CREATE TABLE clients (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       surname VARCHAR(100) NOT NULL,
       phone VARCHAR(20) NOT NULL,
       email VARCHAR(100) NOT NULL,
       travel_destination VARCHAR(100) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

2. **Datos de Prueba**:
   ```sql
   INSERT INTO clients (name, surname, phone, email, travel_destination) VALUES
   ('Juan', 'Pérez', '123456789', 'juan@email.com', 'París'),
   ('María', 'García', '987654321', 'maria@email.com', 'Roma'),
   ('Carlos', 'López', '456789123', 'carlos@email.com', 'Londres');
   ```

### 3.3 API REST
1. **¿Qué es una API REST?**
   Una API REST (Representational State Transfer) es un estilo de arquitectura para sistemas distribuidos. Características principales:
   - Cliente-Servidor
   - Sin estado (stateless)
   - Caché
   - Interfaz uniforme
   - Sistema en capas

2. **Métodos HTTP Implementados**:
   - POST `/api/clients`: Crear cliente
   - GET `/api/clients`: Listar todos los clientes
   - GET `/api/clients/:id`: Obtener cliente por ID
   - GET `/api/clients/search`: Buscar por destino
   - PUT `/api/clients/:id`: Actualizar cliente
   - DELETE `/api/clients/:id`: Eliminar cliente

3. **Ubicación de las Rutas**:
   Las rutas están definidas en `src/routes/clientRoutes.js`

4. **Pruebas de la API**:
   - Herramienta utilizada: Postman
   - Ejemplos de peticiones:
     ```bash
     # GET /api/clients
     GET http://localhost:3000/api/clients

     # POST /api/clients
     POST http://localhost:3000/api/clients
     {
         "name": "Ana",
         "surname": "Martínez",
         "phone": "555123456",
         "email": "ana@email.com",
         "travel_destination": "Madrid"
     }
     ```

5. **Resultados Esperados**:
   - GET: Lista de clientes o cliente específico
   - POST: Cliente creado (201)
   - PUT: Cliente actualizado (200)
   - DELETE: Cliente eliminado (200)
   - Errores: 404 (No encontrado), 500 (Error interno)

### 3.4 Configuración de la Base de Datos
1. **Archivo .env**:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=agenda_viajes
   PORT=3000
   ```

2. **Archivo .env.example**:
   ```
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=your_database
   PORT=3000
   ```

### 3.5 Despliegue en Railway.app
1. **Pasos de Despliegue**:
   - Creación de cuenta en Railway.app
   - Conexión con repositorio GitHub
   - Configuración de variables de entorno
   - Despliegue de la aplicación

2. **Variables de Entorno en Railway**:
   - DB_HOST
   - DB_USER
   - DB_PASSWORD
   - DB_NAME

## 4. Verificación del Funcionamiento

### 4.1 Pruebas de Endpoints
- Todos los endpoints funcionan correctamente
- Se han probado las siguientes operaciones:
  - Búsqueda de clientes
  - Añadir nuevos registros
  - Modificar datos existentes
  - Eliminar registros

### 4.2 Manejo de Errores
- Errores de conexión a la base de datos
- Errores de validación de datos
- Errores de recursos no encontrados

## 5. Capturas de Pantalla Necesarias
[Nota: Se deben incluir las siguientes capturas]

1. Estructura del proyecto en el IDE
2. Interfaz de la aplicación
3. Pruebas en Postman
4. Panel de Railway.app
5. Base de datos en HeidiSQL 