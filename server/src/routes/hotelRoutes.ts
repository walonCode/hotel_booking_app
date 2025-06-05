import express from 'express';
import { protect } from '../middleware/auth';
// import { hotelSchema, reviewSchema } from '../validators/schemas';
import { createHotel, addReview } from '../controllers/hotelController';

const router = express.Router();

router.post('/', protect, createHotel);
router.post('/:id/reviews', protect, addReview);

export default router;