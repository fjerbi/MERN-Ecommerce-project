import express from "express";
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

// @desc Fetch all products
// @route GET /api/products
// @access Public route
const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: { $regex: req.query.keyword, $options: "i" },
      }
    : {};

  const products = await Product.find({ ...keyword });

  res.json(products);
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public route
const getProductbyId = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found !");
  }
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product Deleted" });
  } else {
    res.status(404);
    throw new Error("Product Not Found !");
  }
});

export { getProducts, getProductbyId, deleteProduct };
