import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['lamp', 'table', 'chair', 'pot'],
    },
    price: {
      type: Number,
      required: true,
    },
    description: { type: String },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export const ProductModel = mongoose.model('ProductModel', productSchema)
