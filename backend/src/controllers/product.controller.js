import { ProductModel } from '../models/product.model.js'
import cloudinary from '../config/cloudinary.js'

// 📌 Add Product
export const addProduct = async (req, res) => {
  try {
    const { name, category, price, description } = req.body
    const file = req.file

    if (!file) return res.status(400).json({ error: 'Image is required' })

    // Upload image to Cloudinary
    const uploaded = await cloudinary.uploader.upload(file.path, {
      folder: 'products',
    })

    const product = await ProductModel.create({
      name,
      category,
      price,
      description,
      imageUrl: uploaded.secure_url,
    })

    res.status(201).json({ message: 'Product added successfully', product })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// 📌 Edit Product
export const editProduct = async (req, res) => {
  try {
    const { id } = req.params
    const { name, category, price, description } = req.body

    let updateData = { name, category, price, description }

    if (req.file) {
      const uploaded = await cloudinary.uploader.upload(req.file.path, {
        folder: 'products',
      })
      updateData.imageUrl = uploaded.secure_url
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    )

    if (!updatedProduct)
      return res.status(404).json({ error: 'Product not found' })

    res.json({ message: 'Product updated successfully', updatedProduct })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// 📌 Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params

    const product = await ProductModel.findByIdAndDelete(id)

    if (!product) return res.status(404).json({ error: 'Product not found' })

    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// 📌 Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find()
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// 📌 Get Single Product
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params
    const product = await ProductModel.findById(id)

    if (!product) return res.status(404).json({ error: 'Product not found' })

    res.json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
