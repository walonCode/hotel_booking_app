import { Router } from 'express';
import { authenticateUser } from '../middleware/auth';
import { isAdmin } from '../middleware/roleCheck';
import {
  getDashboardData,
  getStats,
  updateRoomPricing,
} from '../controllers/adminController';

const router = Router();

router.get('/dashboard', authenticateUser, isAdmin, getDashboardData);
router.get('/stats', authenticateUser, isAdmin, getStats);
router.put('/pricing/:roomId', authenticateUser, isAdmin, updateRoomPricing);

export default router;