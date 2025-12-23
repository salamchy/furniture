import { BlogModel } from '../models/blog.model.js'
import cloudinary from '../config/cloudinary.js'

/**
 * Create a new blog
 */
export const createBlog = async (req, res) => {
  try {
    const { title, text } = req.body
    const file = req.file

    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'Image is required',
      })
    }

    // Upload image to Cloudinary
    const uploaded = await cloudinary.uploader.upload(file.path, {
      folder: 'blogs',
    })

    const blog = await BlogModel.create({
      title,
      text,
      imageUrl: uploaded.secure_url,
    })

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      blog,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

/**
 *    Get all blogs
 */
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find().sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

/**
 *   Get single blog
 */
export const getSingleBlog = async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.id)

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      })
    }

    res.status(200).json({
      success: true,
      blog,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

/**
 *   Update blog
 */
export const updateBlog = async (req, res) => {
  try {
    const { title, text } = req.body
    const file = req.file

    let blog = await BlogModel.findById(req.params.id)

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      })
    }

    let imageUrl = blog.imageUrl

    // Upload new image if exists
    if (file) {
      const uploaded = await cloudinary.uploader.upload(file.path, {
        folder: 'blogs',
      })
      imageUrl = uploaded.secure_url
    }

    blog = await BlogModel.findByIdAndUpdate(
      req.params.id,
      {
        title,
        text,
        imageUrl,
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true }
    )

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      blog,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

/**
 *   Delete blog
 */
export const deleteBlog = async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.id)

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
