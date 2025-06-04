import express from 'express';
import { protect } from '../middleware/auth';
import {
  createBooking,
  getUserBookings,
  cancelBooking
} from "../controllers/bookingController";

const router = express.Router();

router.route('/').post(protect, createBooking).get(protect, getUserBookings);
router.route('/:id/cancel').put(protect, cancelBooking);

export default router;