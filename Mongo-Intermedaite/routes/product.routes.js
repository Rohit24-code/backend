const express = require("express");
const { insertSampleProduct, getProductStats,getProductAnalysis } = require("../controllers/product.controllers");

const productRoute = express.Router();

productRoute.post("/add", insertSampleProduct);
productRoute.get("/",getProductStats)
productRoute.get("/analysis",getProductAnalysis)

module.exports = productRoute;
