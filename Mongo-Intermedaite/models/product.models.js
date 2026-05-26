const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  inStock: Boolean,
  tags: [String],
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

module.exports = Product
