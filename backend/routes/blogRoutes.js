import express from "express";
import Blog from "../models/blogModel.js";
import asyncHandler from "express-async-handler";
const router = express.Router();

// @desc Fetch all products
// @route GET /api/products
// @access Public route
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const posts = await Blog.find({});

    res.json(posts);
  })
);

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public route
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const post = await Blog.findById(req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.status(404);
      throw new Error("Post Not Found !");
    }
  })
);

export default router;
