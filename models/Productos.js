const { pool } = require('../config/database');

class Producto {
    static async getAll() {
        const [rows] = await pool.execute(`
            SELECT p.*, c.nombre as categoria_nombre 
            FROM Productos p 
            LEFT JOIN Categorias c ON p.id_categoria = c.id_categoria
        `);
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.execute(`
            SELECT p.*, c.nombre as categoria_nombre 
            FROM Productos p 
            LEFT JOIN Categorias c ON p.id_categoria = c.id_categoria 
            WHERE p.id_producto = ?
        `, [id]);
        return rows[0];
    }

    static async create(productoData) {
        const { id_categoria, nombre, descripcion, precio, stock, imagen_url, certificado_calidad } = productoData;
        const [result] = await pool.execute(
            'INSERT INTO Productos (id_categoria, nombre, descripcion, precio, stock, imagen_url, certificado_calidad) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [id_categoria, nombre, descripcion, precio, stock, imagen_url, certificado_calidad || true]
        );
        return result.insertId;
    }

    static async update(id, productoData) {
        const { id_categoria, nombre, descripcion, precio, stock, imagen_url, certificado_calidad } = productoData;
        const [result] = await pool.execute(
            'UPDATE Productos SET id_categoria = ?, nombre = ?, descripcion = ?, precio = ?, stock = ?, imagen_url = ?, certificado_calidad = ? WHERE id_producto = ?',
            [id_categoria, nombre, descripcion, precio, stock, imagen_url, certificado_calidad, id]
        );
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await pool.execute('DELETE FROM Productos WHERE id_producto = ?', [id]);
        return result.affectedRows;
    }

    static async getByCategoria(idCategoria) {
        const [rows] = await pool.execute('SELECT * FROM Productos WHERE id_categoria = ?', [idCategoria]);
        return rows;
    }
}

module.exports = Producto;