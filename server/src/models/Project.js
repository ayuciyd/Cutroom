import mongoose from 'mongoose';

const roleRequirementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['actor', 'crew'], default: 'actor' },
  count: { type: Number, default: 1 },
  description: { type: String, default: '' },
  filled: { type: Number, default: 0 },
});

const projectMemberSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  roleTitle: { type: String, required: true },
});

const projectSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    logline: {
      type: String,
      default: '',
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    genre: {
      type: String,
      required: true,
      default: 'drama',
    },
    stage: {
      type: String,
      enum: ['development', 'pre-production', 'production', 'post-production'],
      default: 'development',
    },
    budgetRange: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    coverUrl: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'completed'],
      default: 'draft',
      index: true,
    },
    roles: [roleRequirementSchema],
    members: [projectMemberSchema],
  },
  {
    timestamps: true,
  }
);

// Indexes
projectSchema.index({ status: 1, genre: 1 });
projectSchema.index({ title: 'text', logline: 'text' });

export const Project = mongoose.model('Project', projectSchema);
export default Project;
