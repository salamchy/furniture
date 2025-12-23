import mongoose from 'mongoose'

const productOfWeekSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

export const ProductOfTheWeekModel = mongoose.model(
  'ProductOfTheWeek',
  productOfWeekSchema
)
