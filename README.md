# Agenda de Viajes API

API REST para la gestión de clientes de una agencia de viajes desarrollada con Node.js, Express y MySQL.

## Requisitos Previos

- Node.js (v14 o superior)
- MySQL (v8.0 o superior)
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd agenda-viajes
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
- Copiar el archivo `.env.example` a `.env`
- Modificar las variables según tu configuración

4. Configurar la base de datos:
- Ejecutar el script `database.sql` en tu servidor MySQL

## Ejecución

Para desarrollo:
```bash
npm run dev
```

Para producción:
```bash
npm start
```

## Endpoints de la API

### Clientes

- `GET /api/clients` - Obtener todos los clientes
- `GET /api/clients/:id` - Obtener un cliente por ID
- `GET /api/clients/search?destination=Paris` - Buscar clientes por destino
- `POST /api/clients` - Crear un nuevo cliente
- `PUT /api/clients/:id` - Actualizar un cliente existente
- `DELETE /api/clients/:id` - Eliminar un cliente

### Ejemplo de uso

Crear un nuevo cliente:
```bash
curl -X POST http://localhost:3000/api/clients \
-H "Content-Type: application/json" \
-d '{
  "name": "Juan",
  "surname": "Pérez",
  "phone": "123456789",
  "email": "juan@email.com",
  "travel_destination": "París"
}'
```

## Estructura del Proyecto

```
src/
├── config/
│   └── database.js
├── controllers/
│   └── clientController.js
├── models/
│   └── clientModel.js
├── routes/
│   └── clientRoutes.js
└── index.js
```

## Despliegue en Railway.app

1. Crear una cuenta en Railway.app
2. Conectar el repositorio de GitHub
3. Configurar las variables de entorno en Railway
4. Desplegar la aplicación

## Licencia

MIT 