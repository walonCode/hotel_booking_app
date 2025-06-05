import { Router } from 'express';
import { authenticateUser } from '../middleware/auth';
import { bookingValidation } from '../validators/schemas';
import {
  createBooking,
  getUserBookings,
  // getHotelBookings
} from '../controllers/bookingController';

const router = Router();

router.post('/', authenticateUser, createBooking);
router.get('/user/:id', authenticateUser, getUserBookings);
// router.get('/hotel/:id', authenticateUser, getHotelBookings);

export default router;