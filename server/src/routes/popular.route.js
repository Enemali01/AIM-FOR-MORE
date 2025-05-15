import express from 'express';
import {
  createPopularProduct,
  getAllTrendingProducts,
  deleteTrendingProduct
} from '../controller/popularController.js';
import upload from "../midlleware/imageMiddleware.js";

const router = express.Router();


router.post('/', upload.single('image'), createPopularProduct);
router.get('/', getAllTrendingProducts);
router.delete('/:id', deleteTrendingProduct);

export default router;
