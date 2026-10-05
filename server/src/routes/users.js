import express from 'express';
import { protect } from '../middleware/auth.js';
import { getCurrentUser, updateProfile, getUserById } from '../controllers/userController.js';

const router = express.Router();

// GET /api/users/me (current user)
router.get('/me', protect, getCurrentUser);

// PATCH /api/users/me (update own profile)
router.patch('/me', protect, updateProfile);

// GET /api/users/:id (public user profile)
router.get('/:id', protect, getUserById);

export default router;
