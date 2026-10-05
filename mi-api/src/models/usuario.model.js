const pool = require('../config/db');

// ? = placeholder seguro (evita SQL Injection)

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM usuarios ORDER BY id DESC'
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM usuario WHERE id = ?', [id]
  );
  return rows[0]; // undefined si no existe
};

const getByMail = async (correo) => {
    const [filas] = await pool.query(
        `SELECT
            id,
            nombre,
            correo,
            contrasena_hash,
            estado,
            fecha_registro
         FROM usuarios
         WHERE correo = ?`,
        [correo]
    );

    return filas[0];
};

const create = async (nombre, correo, contrasena_hash) => {
  const [result] = await pool.query(
    'INSERT INTO usuarios (nombre, correo, contrasena_hash) VALUES (?, ?, ?)',
    [nombre, correo, contrasena_hash]
  );
  return { id: result.insertId };
};

module.exports = { getAll, getById, getByMail, create};