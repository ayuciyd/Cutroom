import express from 'express';
import { protect } from '../middleware/auth.js';
import { getCurrentUser } from '../controllers/userController.js';

const router = express.Router();

// GET /api/users/me (requires Auth header)
router.get('/me', protect, getCurrentUser);

export default router;
