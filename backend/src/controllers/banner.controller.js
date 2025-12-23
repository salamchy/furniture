import { BannerModel } from '../models/Banner.model.js'
import cloudinary from '../config/cloudinary.js'

//----------------add banner image------------------
export const addBannerImg = async (req, res) => {
  try {
    const { title, description } = req.body
    const file = req.file

    if (!file) {
      return res.status(400).json({ error: 'Image is required!' })
    }

    //check if maximun limit reached
    const bannerCount = await BannerModel.countDocuments()
    if (bannerCount >= 5) {
      return res.status(400).json({
        error:
          'Maximum limit of 4 carousel images reached. Please delete an existing image first.',
      })
    }

    // Upload image to Cloudinary
    const uploaded = await cloudinary.uploader.upload(file.path, {
      folder: 'banners',
    })

    const banner = await BannerModel.create({
      imageUrl: uploaded.secure_url,
      title: title || '',
      description: description || '',
    })

    res.status(201).json({
      message: 'Carousel image added successfully',
      banner,
    })
  } catch (error) {
    console.error('Add carousel error:', error)
    res.status(500).json({
      error: 'Failed to add carousel image',
    })
  }
}

//----------------get all banner images------------------
export const getAllBannerImg = async (req, res) => {
  try {
    const bannerImg = await BannerModel.find().sort({ createdAt: -1 })
    res.json({
      success: true,
      bannerImg,
      count: bannerImg.length,
    })
  } catch (error) {
    console.error('Get carousels error:', error)
    res.status(500).json({
      error: 'Failed to fetch carousel images',
    })
  }
}

//----------------delete banner image------------------
export const deleteBannerImg = async (req, res) => {
  try {
    const { id } = req.params
    const deleteBannerImg = await BannerModel.findByIdAndDelete(id)

    if (!deleteBannerImg) {
      return res.status(404).json({ error: 'Carousel image not found' })
    }

    res.json({
      success: true,
      message: 'Carousel image deleted successfully',
    })
  } catch (error) {
    console.error('Delete carousel error:', error)
    res.status(500).json({
      error: 'Failed to delete carousel image',
    })
  }
}
