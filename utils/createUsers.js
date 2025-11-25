const bcrypt = require('bcryptjs');
const { pool } = require('../config/database');

async function createUsers() {
    try {
        console.log('🔐 Creando usuarios de prueba...');
        
        // Contraseña: 123456
        const password = '123456';
        const saltRounds = 10;
        
        // Generar hash de contraseña
        const passwordHash = await bcrypt.hash(password, saltRounds);
        
        console.log('Hash generado:', passwordHash);
        
        // Insertar usuario admin
        await pool.execute(
            'INSERT IGNORE INTO Usuarios (email, password_hash, rol) VALUES (?, ?, ?)',
            ['admin@petexpress.com', passwordHash, 'admin']
        );
        
        // Insertar usuario cliente
        await pool.execute(
            'INSERT IGNORE INTO Usuarios (email, password_hash, rol) VALUES (?, ?, ?)',
            ['cliente@ejemplo.com', passwordHash, 'cliente']
        );
        
        console.log('✅ Usuarios creados exitosamente');
        console.log('📧 admin@petexpress.com / 123456');
        console.log('📧 cliente@ejemplo.com / 123456');
        
    } catch (error) {
        console.error('❌ Error creando usuarios:', error);
    } finally {
        process.exit();
    }
}

createUsers();