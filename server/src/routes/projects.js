import express from 'express';
import { protect } from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';
import { validate } from '../middleware/validate.js';
import { 
  createProject, 
  getMyProjects, 
  getProjectById, 
  updateProject, 
  projectSchema 
} from '../controllers/projectController.js';

const router = express.Router();

// Creator Only: Create new project
router.post('/', protect, requireRole('creator'), validate(projectSchema), createProject);

// Creator Only: Get projects created by current user
router.get('/mine', protect, requireRole('creator'), getMyProjects);

// Auth Required: Get project details by ID
router.get('/:id', protect, getProjectById);

// Owner/Creator: Update project details
router.patch('/:id', protect, updateProject);

export default router;
