const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  id: Number, //{type: Number, unique: true}
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number
})

const Product = mongoose.model('Product', ProductSchema);

module.exports = { Product };