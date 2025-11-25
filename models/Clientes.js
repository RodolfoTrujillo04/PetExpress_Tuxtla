const { pool } = require('../config/database');

class Cliente {
    static async getAll() {
        const [rows] = await pool.execute('SELECT * FROM Clientes');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.execute('SELECT * FROM Clientes WHERE id_cliente = ?', [id]);
        return rows[0];
    }

    static async create(clienteData) {
        const { nombre, apellido, correo, telefono, direccion, ciudad } = clienteData;
        const [result] = await pool.execute(
            'INSERT INTO Clientes (nombre, apellido, correo, telefono, direccion, ciudad) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre, apellido, correo, telefono, direccion, ciudad]
        );
        return result.insertId;
    }

    static async update(id, clienteData) {
        const { nombre, apellido, correo, telefono, direccion, ciudad } = clienteData;
        const [result] = await pool.execute(
            'UPDATE Clientes SET nombre = ?, apellido = ?, correo = ?, telefono = ?, direccion = ?, ciudad = ? WHERE id_cliente = ?',
            [nombre, apellido, correo, telefono, direccion, ciudad, id]
        );
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await pool.execute('DELETE FROM Clientes WHERE id_cliente = ?', [id]);
        return result.affectedRows;
    }

    static async getMascotas(idCliente) {
        const [rows] = await pool.execute('SELECT * FROM Mascotas WHERE id_cliente = ?', [idCliente]);
        return rows;
    }
}

module.exports = Cliente;