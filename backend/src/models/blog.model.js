import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: [5, 'Title must be at least 5 characters'],
    maxlength: [50, 'Title cannot exceed 50 characters'],
  },
  text: [
    {
      type: String,
      required: [true, 'Content is required'],
      minlength: [50, 'Content must be at least 50 characters'],
      maxlength: [300, 'Excerpt cannot exceed 300 characters'],
    },
  ],
  imageUrl: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export const BlogModel = mongoose.model('BlogModel', blogSchema)
