import express from 'express'
import { addReview, getReviews } from '../controllers/reviewsController';

const router = express.Router();
router.get('/reviews',  getReviews)
router.post('/reviews', addReview )
export default router;