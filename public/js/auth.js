// API Base URL
const API_BASE = '/api/auth';


// Funciones para mostrar secciones
function showWelcome() {
    console.log('Mostrando welcome');
    hideAllSections();
    document.getElementById('welcomeSection').classList.remove('hidden');
}

function showLogin() {
    console.log('Mostrando login');
    hideAllSections();
    document.getElementById('loginSection').classList.remove('hidden');
}

function showRegister() {
    console.log('Mostrando register');
    hideAllSections();
    document.getElementById('registerSection').classList.remove('hidden');
}

function hideAllSections() {
    const sections = ['welcomeSection', 'loginSection', 'registerSection'];
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            section.classList.add('hidden');
        }
    });
}

// Notificaciones
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const messageElement = document.getElementById('notificationMessage');
    
    if (notification && messageElement) {
        notification.className = `notification ${type}`;
        messageElement.textContent = message;
        notification.classList.remove('hidden');

        setTimeout(() => {
            hideNotification();
        }, 5000);
    }
}

function hideNotification() {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.classList.add('hidden');
    }
}

// Manejo de eventos
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado - Configurando event listeners');
    
    // Botones principales
    document.getElementById('loginBtn').addEventListener('click', showLogin);
    document.getElementById('registerBtn').addEventListener('click', showRegister);
    
    // Botones de formularios
    document.getElementById('submitLoginBtn').addEventListener('click', handleLoginClick);
    document.getElementById('submitRegisterBtn').addEventListener('click', handleRegisterClick);
    
    // Navegación entre formularios
    document.getElementById('goToRegisterFromLogin').addEventListener('click', showRegister);
    document.getElementById('goToLoginFromRegister').addEventListener('click', showLogin);
    document.getElementById('backToWelcomeFromLogin').addEventListener('click', showWelcome);
    document.getElementById('backToWelcomeFromRegister').addEventListener('click', showWelcome);
    
    // Cerrar notificación
    document.getElementById('closeNotificationBtn').addEventListener('click', hideNotification);
    
    // Prevenir envío de formularios
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
    });
    
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
    });
    
    // Inicializar mostrando solo el welcome
    showWelcome();
});

function handleLoginClick() {
    console.log('Botón login clickeado');
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showNotification('Por favor, completa todos los campos', 'error');
        return;
    }
    
    console.log('Datos login:', { email, password });
    
    // Simular login exitoso
    const btn = document.getElementById('submitLoginBtn');
    const btnText = btn.querySelector('.btn-text');
    const btnLoading = btn.querySelector('.btn-loading');
    
    // Mostrar loading
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');
    btn.disabled = true;
    
    setTimeout(() => {
        showNotification('¡Inicio de sesión exitoso!', 'success');
        
        // Ocultar loading
        btnText.classList.remove('hidden');
        btnLoading.classList.add('hidden');
        btn.disabled = false;
        
        // Volver al inicio después de 2 segundos
        setTimeout(() => {
            showWelcome();
            document.getElementById('loginForm').reset();
        }, 2000);
    }, 1500);
}

function handleRegisterClick() {
    console.log('Botón registro clickeado');
    
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (!email || !password || !confirmPassword) {
        showNotification('Por favor, completa todos los campos', 'error');
        return;
    }
    
    // Validar contraseñas
    if (password !== confirmPassword) {
        showNotification('Las contraseñas no coinciden', 'error');
        return;
    }

    if (password.length < 6) {
        showNotification('La contraseña debe tener al menos 6 caracteres', 'error');
        return;
    }
    
    console.log('Datos registro:', { email, password, confirmPassword });
    
    // Simular registro exitoso
    const btn = document.getElementById('submitRegisterBtn');
    const btnText = btn.querySelector('.btn-text');
    const btnLoading = btn.querySelector('.btn-loading');
    
    // Mostrar loading
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');
    btn.disabled = true;
    
    setTimeout(() => {
        showNotification('¡Registro exitoso! Ahora puedes iniciar sesión.', 'success');
        
        // Ocultar loading
        btnText.classList.remove('hidden');
        btnLoading.classList.add('hidden');
        btn.disabled = false;
        
        // Ir al login después de 2 segundos
        setTimeout(() => {
            showLogin();
            document.getElementById('registerForm').reset();
        }, 2000);
    }, 1500);
}

// Función para manejar login real
async function handleLoginClick() {
    console.log('Botón login clickeado');
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showNotification('Por favor, completa todos los campos', 'error');
        return;
    }
    
    console.log('Datos login:', { email, password });
    
    const btn = document.getElementById('submitLoginBtn');
    const btnText = btn.querySelector('.btn-text');
    const btnLoading = btn.querySelector('.btn-loading');
    
    // Mostrar loading
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');
    btn.disabled = true;
    
    try {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        console.log('Respuesta del servidor:', result);

        if (result.success) {
            showNotification('¡Inicio de sesión exitoso!', 'success');
            
            // Guardar token en localStorage
            if (result.data && result.data.token) {
                localStorage.setItem('token', result.data.token);
                console.log('Token guardado:', result.data.token);
            }
            
            // Volver al inicio después de 2 segundos
            setTimeout(() => {
                showWelcome();
                document.getElementById('loginForm').reset();
            }, 2000);
        } else {
            showNotification(result.message || 'Error en el login', 'error');
        }
    } catch (error) {
        console.error('Error en login:', error);
        showNotification('Error de conexión con el servidor', 'error');
    } finally {
        // Ocultar loading
        btnText.classList.remove('hidden');
        btnLoading.classList.add('hidden');
        btn.disabled = false;
    }
}

// Función para manejar registro real
async function handleRegisterClick() {
    console.log('Botón registro clickeado');
    
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (!email || !password || !confirmPassword) {
        showNotification('Por favor, completa todos los campos', 'error');
        return;
    }
    
    // Validar contraseñas
    if (password !== confirmPassword) {
        showNotification('Las contraseñas no coinciden', 'error');
        return;
    }

    if (password.length < 6) {
        showNotification('La contraseña debe tener al menos 6 caracteres', 'error');
        return;
    }
    
    console.log('Datos registro:', { email, password, confirmPassword });
    
    const btn = document.getElementById('submitRegisterBtn');
    const btnText = btn.querySelector('.btn-text');
    const btnLoading = btn.querySelector('.btn-loading');
    
    // Mostrar loading
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');
    btn.disabled = true;
    
    try {
        const response = await fetch(`${API_BASE}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        console.log('Respuesta del servidor:', result);

        if (result.success) {
            showNotification('¡Registro exitoso! Ahora puedes iniciar sesión.', 'success');
            
            // Ir al login después de 2 segundos
            setTimeout(() => {
                showLogin();
                document.getElementById('registerForm').reset();
            }, 2000);
        } else {
            showNotification(result.message || 'Error en el registro', 'error');
        }
    } catch (error) {
        console.error('Error en registro:', error);
        showNotification('Error de conexión con el servidor', 'error');
    } finally {
        // Ocultar loading
        btnText.classList.remove('hidden');
        btnLoading.classList.add('hidden');
        btn.disabled = false;
    }
}