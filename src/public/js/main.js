// Funciones para la gestión de clientes
let clients = [];

// Cargar clientes al iniciar
document.addEventListener('DOMContentLoaded', () => {
    loadClients();
    setupEventListeners();
});

// Configurar event listeners
function setupEventListeners() {
    const clientForm = document.getElementById('clientForm');
    if (clientForm) {
        clientForm.addEventListener('submit', handleClientSubmit);
    }
}

// Cargar clientes desde la API
async function loadClients() {
    try {
        const response = await fetch('/api/clients');
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        clients = Array.isArray(data) ? data : [];
        renderClientsTable(clients);
    } catch (error) {
        console.error('Error al cargar clientes:', error);
        showAlert('Error al cargar los clientes', 'danger');
        clients = [];
        renderClientsTable(clients);
    }
}

// Renderizar tabla de clientes
function renderClientsTable(clientsToRender) {
    const tbody = document.querySelector('#clientsTable tbody');
    if (!tbody) return;

    if (!Array.isArray(clientsToRender)) {
        console.error('clientsToRender no es un array:', clientsToRender);
        clientsToRender = [];
    }

    tbody.innerHTML = clientsToRender.map(client => `
        <tr>
            <td>${client.name || ''}</td>
            <td>${client.surname || ''}</td>
            <td>${client.phone || ''}</td>
            <td>${client.email || ''}</td>
            <td>${client.travel_destination || ''}</td>
            <td>
                <button class="btn btn-sm btn-warning me-2" onclick="editClient(${client.id})">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="deleteClient(${client.id})">Eliminar</button>
            </td>
        </tr>
    `).join('');
}

// Manejar envío del formulario
async function handleClientSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const clientData = Object.fromEntries(formData.entries());
    const clientId = document.getElementById('clientId').value;

    try {
        const url = clientId ? `/api/clients/${clientId}` : '/api/clients';
        const method = clientId ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error en la operación');
        }

        const result = await response.json();
        showAlert(clientId ? 'Cliente actualizado correctamente' : 'Cliente creado correctamente', 'success');
        closeModal();
        loadClients();
    } catch (error) {
        console.error('Error:', error);
        showAlert('Error: ' + error.message, 'danger');
    }
}

// Editar cliente
async function editClient(id) {
    try {
        const response = await fetch(`/api/clients/${id}`);
        if (!response.ok) {
            throw new Error('Error al cargar el cliente');
        }
        
        const client = await response.json();
        if (!client) {
            throw new Error('Cliente no encontrado');
        }
        
        // Llenar el formulario con los datos del cliente
        document.getElementById('clientId').value = client.id;
        document.getElementById('name').value = client.name || '';
        document.getElementById('surname').value = client.surname || '';
        document.getElementById('phone').value = client.phone || '';
        document.getElementById('email').value = client.email || '';
        document.getElementById('travel_destination').value = client.travel_destination || '';
        
        // Actualizar el título del modal
        document.getElementById('modalTitle').textContent = 'Editar Cliente';
        
        // Mostrar el modal
        const modal = new bootstrap.Modal(document.getElementById('clientModal'));
        modal.show();
    } catch (error) {
        console.error('Error al cargar cliente:', error);
        showAlert('Error al cargar el cliente: ' + error.message, 'danger');
    }
}

// Eliminar cliente
async function deleteClient(id) {
    if (!confirm('¿Está seguro de eliminar este cliente?')) return;

    try {
        const response = await fetch(`/api/clients/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Error al eliminar');

        showAlert('Cliente eliminado', 'success');
        loadClients();
    } catch (error) {
        console.error('Error:', error);
        showAlert('Error al eliminar el cliente', 'danger');
    }
}

// Buscar clientes
function searchClients() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredClients = clients.filter(client => 
        client.travel_destination.toLowerCase().includes(searchTerm)
    );
    renderClientsTable(filteredClients);
}

// Ordenar clientes
function sortClients() {
    const sortBy = document.getElementById('sortSelect').value;
    const sortedClients = [...clients].sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        } else {
            return a.travel_destination.localeCompare(b.travel_destination);
        }
    });
    renderClientsTable(sortedClients);
}

// Cerrar modal y limpiar formulario
function closeModal() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('clientModal'));
    modal.hide();
    document.getElementById('clientForm').reset();
    document.getElementById('clientId').value = '';
    document.getElementById('modalTitle').textContent = 'Nuevo Cliente';
}

// Mostrar alertas
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('.container');
    container.insertBefore(alertDiv, container.firstChild);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
} 