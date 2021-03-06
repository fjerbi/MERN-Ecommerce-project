import express from "express";
import { deleteProduct, getProductbyId, getProducts } from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();


router.route('/').get(getProducts);

router.route('/:id').get(getProductbyId)
.delete(protect,admin,deleteProduct);

export default router;
