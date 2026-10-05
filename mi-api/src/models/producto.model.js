const pool = require('../config/db');

// ? = placeholder seguro (evita SQL Injection)

const getAll = async (usuarioId) => {
  const [rows] = await pool.query(
    'SELECT * FROM productos WHERE usuario_id = ? ORDER BY id DESC', [usuarioId]
  );
  return rows;
};

const getById = async (productoId, usuarioId) => {
  const [rows] = await pool.query(
    'SELECT * FROM productos WHERE id = ? AND usuario_id = ?', [productoId, usuarioId]
  );
  return rows[0]; // undefined si no existe
};

const create = async ({ nombre, precio, stock, usuarioId }) => {
  const [result] = await pool.query(
    'INSERT INTO productos (nombre, precio, stock, usuario_id) VALUES (?, ?, ?, ?)',
    [nombre, precio, stock, usuarioId]
  );
  return { id: result.insertId, nombre, precio, stock };
};

module.exports = { getAll, getById, create };