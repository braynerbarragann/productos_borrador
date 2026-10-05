const ProductoModel = require('../models/producto.model');

// GET /api/productos
const getAll = async (req, res) => {
  try {
    const usuarioId = req.usuario.usuario_id;
    const data = await ProductoModel.getAll(usuarioId);
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};



// GET /api/productos/:id
const getById = async (req, res) => {
  try {
    const productoId = req.params.id;
    const usuarioId = req.usuario.usuario_id;
    
    const data = await ProductoModel.getById(productoId, usuarioId);
    if (!data) return res.status(404)
      .json({ ok: false, msg: 'Producto no encontrado' });
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// POST /api/productos
const create = async (req, res) => {
  try {
    const usuarioId = req.usuario.usuario_id;
    const { nombre, precio, stock } = req.body;
    if (!nombre || !precio)
      return res.status(400).json({ ok: false, msg: 'nombre y precio requeridos' });

    const data = await ProductoModel.create({ nombre, precio, stock, usuarioId });

    res.status(201).json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

module.exports = { getAll, getById, create };