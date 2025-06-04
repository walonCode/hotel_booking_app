import express from 'express';
import { protect } from '../middleware/auth';
import {
  getRoomsByHotel,
  createRoom,
  updateRoom,
  deleteRoom
} from "../controllers/roomController";

const router = express.Router();

router.route('/hotel/:hotelId').get(getRoomsByHotel).post(protect, createRoom);
router.route('/:id').put(protect, updateRoom).delete(protect, deleteRoom);

export default router;