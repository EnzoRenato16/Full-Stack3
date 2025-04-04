const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: String,
  preco: { type: Number, required: true },
  categoria: String
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
