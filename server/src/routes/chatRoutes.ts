import { Router } from 'express';
import { handleChat } from '../controllers/chatController'; // We'll create this next
import { authenticateUser } from '../middleware/auth';

const router = Router();

router.post('/', authenticateUser, handleChat);

export default router;