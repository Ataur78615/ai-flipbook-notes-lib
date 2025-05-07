import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    author: {
      type: String,
      default: "Anonymous"
    },
    coverImage: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true,
  }
);

// Add text index for search functionality
// noteSchema.index({ title: 'text', content: 'text' });

const Note = mongoose.model('Note', noteSchema);

export default Note;