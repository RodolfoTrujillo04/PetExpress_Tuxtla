const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');

class Usuario {
    static async findByEmail(email) {
        try {
            const [rows] = await pool.execute(
                `SELECT u.*, c.nombre, c.apellido 
                 FROM Usuarios u 
                 LEFT JOIN Clientes c ON u.id_cliente = c.id_cliente 
                 WHERE u.email = ? AND u.activo = TRUE`,
                [email]
            );
            return rows[0];
        } catch (error) {
            console.error('Error en findByEmail:', error);
            throw error;
        }
    }

    static async findById(id) {
        try {
            const [rows] = await pool.execute(
                `SELECT u.*, c.nombre, c.apellido 
                 FROM Usuarios u 
                 LEFT JOIN Clientes c ON u.id_cliente = c.id_cliente 
                 WHERE u.id_usuario = ? AND u.activo = TRUE`,
                [id]
            );
            return rows[0];
        } catch (error) {
            console.error('Error en findById:', error);
            throw error;
        }
    }

    static async create(usuarioData) {
        try {
            const { id_cliente, email, password, rol } = usuarioData;
            
            // Hash de la contraseña
            const saltRounds = 10;
            const password_hash = await bcrypt.hash(password, saltRounds);

            const [result] = await pool.execute(
                'INSERT INTO Usuarios (id_cliente, email, password_hash, rol) VALUES (?, ?, ?, ?)',
                [id_cliente || null, email, password_hash, rol || 'cliente']
            );
            return result.insertId;
        } catch (error) {
            console.error('Error en create:', error);
            throw error;
        }
    }

    static async comparePassword(plainPassword, hashedPassword) {
        try {
            return await bcrypt.compare(plainPassword, hashedPassword);
        } catch (error) {
            console.error('Error en comparePassword:', error);
            return false;
        }
    }

    static async updateLastLogin(id) {
        try {
            await pool.execute(
                'UPDATE Usuarios SET fecha_actualizacion = CURRENT_TIMESTAMP WHERE id_usuario = ?',
                [id]
            );
        } catch (error) {
            console.error('Error en updateLastLogin:', error);
            throw error;
        }
    }
}

module.exports = Usuario;