const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET - listar todos
router.get('/', async (req, res) => {
  const produtos = await Product.find();
  res.json(produtos);
});

// POST - criar produto
router.post('/', async (req, res) => {
  const novo = new Product(req.body);
  await novo.save();
  res.json(novo);
});

// PUT - atualizar
router.put('/:id', async (req, res) => {
  const atualizado = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(atualizado);
});

// DELETE - remover
router.delete('/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: "Produto removido" });
});

module.exports = router;
