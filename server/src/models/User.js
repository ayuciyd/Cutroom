import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: [
        'creator',
        'actor',
        'crew',
        'writer',
        'investor',
        'equipment_provider',
        'distributor',
        'admin',
      ],
      required: true,
      default: 'actor',
    },
    headline: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    skills: {
      type: [String],
      default: [],
    },
    experience: [
      {
        title: String,
        company: String,
        year: String,
        description: String,
      },
    ],
    portfolio: [
      {
        title: String,
        type: {
          type: String,
          enum: ['image', 'video', 'link'],
          default: 'image',
        },
        url: String,
        thumbnailUrl: String,
      },
    ],
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', userSchema);
export default User;
