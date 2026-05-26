const Product = require("../models/product.models");

const insertSampleProduct = async (req, res) => {
  try {
    let sampleProduct = [
      {
        name: "Wireless Mouse",
        category: "Electronics",
        price: 29.99,
        inStock: true,
        tags: ["computer", "accessories", "wireless"],
      },
      {
        name: "Mechanical Keyboard",
        category: "Electronics",
        price: 89.99,
        inStock: true,
        tags: ["computer", "gaming", "accessories"],
      },
      {
        name: "Gaming Monitor",
        category: "Electronics",
        price: 249.99,
        inStock: false,
        tags: ["computer", "gaming", "monitor"],
      },
      {
        name: "Running Shoes",
        category: "Fitness",
        price: 79.99,
        inStock: true,
        tags: ["shoes", "sports", "apparel"],
      },
      {
        name: "Yoga Mat",
        category: "Fitness",
        price: 19.99,
        inStock: true,
        tags: ["sports", "exercise"],
      },
      {
        name: "Protein Shaker",
        category: "Fitness",
        price: 12.5,
        inStock: false,
        tags: ["accessories", "exercise"],
      },
      {
        name: "Coffee Mug",
        category: "Kitchen",
        price: 14.99,
        inStock: true,
        tags: ["home", "accessories"],
      },
      {
        name: "Chef Knife",
        category: "Kitchen",
        price: 45.0,
        inStock: true,
        tags: ["home", "tools"],
      },
    ];

    const result = await Product.insertMany(sampleProduct);
    res.status(201).json({
      success: 1,
      data: `Inserted ${result.length}`,
    });
  } catch (error) {
    console.log(error, "error");
    res.status(400).json({
      success: 0,
      message: "some error occured!",
      error,
    });
  }
};

const getProductStats = async (req, res) => {
  try {
    let finalProduct = await Product.aggregate([
      {
        $match: {
          inStock: true,
          price: {
            $gte: 10,
          },
        },
      },
      {
        $group: {
          _id: "$category",
          totalAmount: {
            $sum: "$price",
          },
          avgPrice: {
            $avg: "$price",
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    res.status(200).json({
      product: finalProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: "some errror occured",
      error,
    });
  }
};

const getProductAnalysis = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $match: {
          category: "Fitness",
        },
      },

      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$price",
          },
          avgPrice: {
            $avg: "$price",
          },
          maxProductPrice: {
            $max: "$price",
          },
          minProductPrice: {
            $min: "$price",
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
          avgPrice: 1,
          maxProductPrice: 1,
          minProductPrice: 1,
          priceRange: {
            $subtract: ["$maxProductPrice", "$minProductPrice"],
          },
        },
      },
    ]);

    res.status(200).json({
      success: 1,
      data: result,
    });
  } catch (e) {
    console.log(e, "E");
    res.status(500).json({
      success: 0,
      message: "Some error occured",
    });
  }
};

module.exports = {
  insertSampleProduct,
  getProductStats,
  getProductAnalysis,
};
