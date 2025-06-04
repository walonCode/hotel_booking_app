import express from 'express';
import { protect } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { hotelSchema, reviewSchema } from '../validators/schemas';
import { createHotel, addReview } from '../controllers/hotelController';

const router = express.Router();

router.post('/', protect, validate(hotelSchema), createHotel);
router.post('/:id/reviews', protect, validate(reviewSchema), addReview);

export default router;