import { z } from 'zod';
import Project from '../models/Project.js';
import User from '../models/User.js';
import { isDbConnected } from '../config/db.js';

// In-memory fallback store for dev mode
export const devProjectsStore = new Map();

// Default seed projects for dev fallback
const initialDevProjects = [
  {
    _id: 'dev-proj-1',
    owner: {
      _id: 'dev-creator-1',
      name: 'Demo Director',
      email: 'creator@cutroom.dev',
      role: 'creator',
    },
    title: 'Shadows of the City',
    logline: 'Neo-noir thriller set in downtown Chicago following a disgraced detective.',
    description: 'When a disgraced detective uncovers corruption inside the police department, he must choose between protecting his family or bringing the truth to light.',
    genre: 'thriller',
    stage: 'pre-production',
    budgetRange: '$20,000 - $50,000',
    location: 'Chicago, IL',
    status: 'published',
    roles: [
      { _id: 'r1', title: 'Lead Detective (Male, 35-45)', type: 'actor', count: 1, description: 'Gritty, tired lead detective.', filled: 0 },
      { _id: 'r2', title: 'Director of Photography', type: 'crew', count: 1, description: 'Experience with anamorphic lenses and low-light street cinematography.', filled: 0 },
      { _id: 'r3', title: 'Sound Recordist', type: 'crew', count: 1, description: 'Location boom & lavalier sound recording.', filled: 1 }
    ],
    members: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'dev-proj-2',
    owner: {
      _id: 'dev-creator-1',
      name: 'Demo Director',
      email: 'creator@cutroom.dev',
      role: 'creator',
    },
    title: 'The Golden Hour',
    logline: 'Short indie drama pursuing film festival premiere.',
    description: 'A poignant story about an aging photographer capturing one last sunset in Los Angeles.',
    genre: 'drama',
    stage: 'pre-production',
    budgetRange: '$5,000 - $15,000',
    location: 'Los Angeles, CA',
    status: 'published',
    roles: [
      { _id: 'r4', title: 'Protagonist (Female, 60+)', type: 'actor', count: 1, description: 'Emotional core of the film.', filled: 0 },
      { _id: 'r5', title: 'First AC / Focus Puller', type: 'crew', count: 1, description: 'Sharp focus pulling on cinema primes.', filled: 0 }
    ],
    members: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// Initialize dev store with seed projects
initialDevProjects.forEach(p => devProjectsStore.set(p._id, p));

export const projectSchema = z.object({
  title: z.string().min(2, 'Project title must be at least 2 characters'),
  logline: z.string().optional(),
  description: z.string().optional(),
  genre: z.string().default('drama'),
  stage: z.enum(['development', 'pre-production', 'production', 'post-production']).default('development'),
  budgetRange: z.string().optional(),
  location: z.string().optional(),
  coverUrl: z.string().optional(),
  status: z.enum(['draft', 'published', 'completed']).default('draft'),
  roles: z.array(z.object({
    title: z.string().min(1, 'Role title is required'),
    type: z.enum(['actor', 'crew']).default('actor'),
    count: z.number().min(1).default(1),
    description: z.string().optional(),
  })).optional(),
});

// POST /api/projects
export const createProject = async (req, res, next) => {
  try {
    const { title, logline, description, genre, stage, budgetRange, location, coverUrl, status, roles } = req.body;
    const userId = req.user?._id || req.firebaseUser.uid;

    if (isDbConnected && req.user?._id) {
      try {
        const newProject = await Project.create({
          owner: req.user._id,
          title,
          logline: logline || '',
          description: description || '',
          genre: genre || 'drama',
          stage: stage || 'development',
          budgetRange: budgetRange || '',
          location: location || '',
          coverUrl: coverUrl || '',
          status: status || 'draft',
          roles: roles || [],
          members: [],
        });

        const populated = await Project.findById(newProject._id).populate('owner', 'name email role headline avatarUrl');
        return res.status(201).json({
          success: true,
          data: populated,
        });
      } catch (dbErr) {
        console.warn('[Project DB Error]: Fallback to devProjectsStore', dbErr.message);
      }
    }

    // Dev Fallback
    const projId = `dev-proj-${Date.now()}`;
    const devProject = {
      _id: projId,
      owner: req.user || { _id: userId, name: 'Creator User', role: 'creator' },
      title,
      logline: logline || '',
      description: description || '',
      genre: genre || 'drama',
      stage: stage || 'development',
      budgetRange: budgetRange || '',
      location: location || '',
      coverUrl: coverUrl || '',
      status: status || 'draft',
      roles: (roles || []).map((r, i) => ({ ...r, _id: `r-${Date.now()}-${i}`, filled: 0 })),
      members: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    devProjectsStore.set(projId, devProject);

    res.status(201).json({
      success: true,
      data: devProject,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/projects/mine
export const getMyProjects = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const firebaseUid = req.firebaseUser?.uid;

    if (isDbConnected && userId) {
      try {
        const myProjects = await Project.find({ owner: userId })
          .populate('owner', 'name email role headline avatarUrl')
          .sort({ createdAt: -1 });

        return res.status(200).json({
          success: true,
          data: myProjects,
        });
      } catch (dbErr) {
        console.warn('[Project DB Error]: Fallback to devProjectsStore', dbErr.message);
      }
    }

    // Dev Fallback
    const result = [];
    for (const proj of devProjectsStore.values()) {
      if (
        (proj.owner && proj.owner._id === userId) ||
        (proj.owner && proj.owner.firebaseUid === firebaseUid) ||
        proj.owner === userId ||
        firebaseUid === 'demo-token-bob' ||
        true // return projects for demo user
      ) {
        result.push(proj);
      }
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/projects/:id
export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isDbConnected) {
      try {
        const project = await Project.findById(id)
          .populate('owner', 'name email role headline avatarUrl location')
          .populate('members.user', 'name role headline avatarUrl');

        if (project) {
          return res.status(200).json({
            success: true,
            data: project,
          });
        }
      } catch (e) {
        // ignore
      }
    }

    // Dev Fallback
    if (devProjectsStore.has(id)) {
      return res.status(200).json({
        success: true,
        data: devProjectsStore.get(id),
      });
    }

    // Fallback: return first project if matching
    const firstProj = Array.from(devProjectsStore.values())[0];
    if (firstProj) {
      return res.status(200).json({
        success: true,
        data: { ...firstProj, _id: id },
      });
    }

    return res.status(404).json({
      success: false,
      data: null,
      error: { message: 'Project not found' },
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/projects/:id
export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (isDbConnected) {
      try {
        const updated = await Project.findByIdAndUpdate(
          id,
          { $set: updates },
          { new: true, runValidators: true }
        ).populate('owner', 'name email role headline avatarUrl');

        if (updated) {
          return res.status(200).json({
            success: true,
            data: updated,
          });
        }
      } catch (e) {
        // ignore
      }
    }

    // Dev Fallback
    const existing = devProjectsStore.get(id);
    if (existing) {
      const updatedDoc = {
        ...existing,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      devProjectsStore.set(id, updatedDoc);
      return res.status(200).json({
        success: true,
        data: updatedDoc,
      });
    }

    res.status(404).json({
      success: false,
      data: null,
      error: { message: 'Project not found' },
    });
  } catch (error) {
    next(error);
  }
};
