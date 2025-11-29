// Verificar autenticación al cargar
document.addEventListener('DOMContentLoaded', function() {
    if (!requireAuth()) return;

    // Cargar datos del dashboard
    loadDashboardStats();
    
    // Cargar categorías inicialmente
    loadCategorias();

    // Configurar formularios
    setupEventListeners();
});

// Navegación entre secciones
function showSection(sectionName) {
    // Ocultar todas las secciones
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remover clase active de todos los enlaces
    document.querySelectorAll('.admin-sidebar a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Mostrar sección seleccionada
    document.getElementById(`${sectionName}-section`).classList.add('active');
    
    // Activar enlace correspondiente
    event.target.classList.add('active');

    // Cargar datos específicos de la sección
    switch(sectionName) {
        case 'categorias':
            loadCategorias();
            break;
        case 'productos':
            loadProductos();
            break;
        case 'clientes':
            loadClientes();
            break;
        // Agregar más casos según sea necesario
    }
}

// Dashboard
async function loadDashboardStats() {
    try {
        const response = await fetch('/api/admin/dashboard', {
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`
            }
        });
        
        if (response.ok) {
            const stats = await response.json();
            document.getElementById('totalClientes').textContent = stats.totalClientes;
            document.getElementById('totalProductos').textContent = stats.totalProductos;
            document.getElementById('pedidosPendientes').textContent = stats.pedidosPendientes;
            document.getElementById('ingresosMensuales').textContent = `$${stats.ingresosMensuales}`;
        }
    } catch (error) {
        console.error('Error cargando estadísticas:', error);
    }
}

// CRUD para Categorías
async function loadCategorias() {
    try {
        const response = await fetch('/api/admin/categorias', {
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`
            }
        });
        
        const categorias = await response.json();
        const tbody = document.getElementById('categoriasTableBody');
        
        tbody.innerHTML = categorias.map(categoria => `
            <tr>
                <td>${categoria.id_categoria}</td>
                <td>${categoria.nombre}</td>
                <td>${categoria.descripcion || '-'}</td>
                <td>
                    <button class="btn-edit" onclick="editCategory(${categoria.id_categoria})">Editar</button>
                    <button class="btn-delete" onclick="deleteCategory(${categoria.id_categoria})">Eliminar</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error cargando categorías:', error);
    }
}

// Modal functions para Categorías
function openCategoryModal(categoria = null) {
    const modal = document.getElementById('categoryModal');
    const title = document.getElementById('modalCategoryTitle');
    const form = document.getElementById('categoryForm');
    
    if (categoria) {
        title.textContent = 'Editar Categoría';
        document.getElementById('categoryId').value = categoria.id_categoria;
        document.getElementById('categoryName').value = categoria.nombre;
        document.getElementById('categoryDescription').value = categoria.descripcion || '';
    } else {
        title.textContent = 'Nueva Categoría';
        form.reset();
        document.getElementById('categoryId').value = '';
    }
    
    modal.style.display = 'block';
}

function closeCategoryModal() {
    document.getElementById('categoryModal').style.display = 'none';
}

// Configurar event listeners
function setupEventListeners() {
    // Formulario de categorías
    document.getElementById('categoryForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const categoriaId = document.getElementById('categoryId').value;
        const formData = {
            nombre: document.getElementById('categoryName').value,
            descripcion: document.getElementById('categoryDescription').value
        };
        
        try {
            const url = categoriaId ? `/api/admin/categorias/${categoriaId}` : '/api/admin/categorias';
            const method = categoriaId ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Auth.getToken()}`
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                closeCategoryModal();
                loadCategorias();
            } else {
                alert('Error guardando categoría');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión');
        }
    });
}

// Editar categoría
async function editCategory(id) {
    try {
        const response = await fetch(`/api/admin/categorias/${id}`, {
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`
            }
        });
        
        if (response.ok) {
            const categoria = await response.json();
            openCategoryModal(categoria);
        }
    } catch (error) {
        console.error('Error cargando categoría:', error);
    }
}

// Eliminar categoría
async function deleteCategory(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/admin/categorias/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`
            }
        });
        
        if (response.ok) {
            loadCategorias();
        } else {
            alert('Error eliminando categoría');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión');
    }
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    const modal = document.getElementById('categoryModal');
    if (event.target === modal) {
        closeCategoryModal();
    }
}