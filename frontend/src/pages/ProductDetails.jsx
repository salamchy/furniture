import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetProductByIdQuery } from '../features/product/productApi'
import {
  FaSpinner,
  FaArrowLeft,
  FaShoppingCart,
  FaHeart,
  FaShare,
  FaStar,
  FaTruck,
  FaShieldAlt,
  FaUndo,
} from 'react-icons/fa'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: product, isLoading, error } = useGetProductByIdQuery(id)

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  if (isLoading) {
    return (
      <div className="min-h-screen mt-16 bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-4xl text-blue-600" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen mt-16 bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="text-red-500 text-center">
              <p className="text-lg font-semibold">Error loading product</p>
              <p className="text-sm">
                {error?.data?.error || 'Product not found'}
              </p>
              <button
                onClick={() => navigate('/shop')}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition duration-200"
              >
                Back to Shop
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen mt-16 bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Product Not Found
            </h2>
            <button
              onClick={() => navigate('/shop')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition duration-200"
            >
              Back to Shop
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Mock product images array (in real app, this would come from product data)
  const productImages = [
    product.imageUrl,
    product.imageUrl, // You can replace with additional images
    product.imageUrl,
    product.imageUrl,
  ]

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      user: 'John Doe',
      rating: 5,
      comment: 'Excellent product! Very comfortable and high quality.',
      date: '2024-01-15',
    },
    {
      id: 2,
      user: 'Jane Smith',
      rating: 4,
      comment: 'Good value for money. Would recommend to others.',
      date: '2024-01-10',
    },
  ]

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Added ${quantity} of ${product.name} to cart`)
    // You can integrate with your cart context or Redux here
  }

  const handleBuyNow = () => {
    // Buy now logic here
    console.log(`Buying ${quantity} of ${product.name}`)
  }

  return (
    <div className="min-h-screen mt-16 bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/shop')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition duration-200"
        >
          <FaArrowLeft className="text-sm" />
          Back to Shop
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      'https://via.placeholder.com/600x600?text=Product+Image'
                  }}
                />
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index
                        ? 'border-indigo-600'
                        : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`w-5 h-5 ${
                          star <= averageRating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      ({reviews.length} reviews)
                    </span>
                  </div>
                  <span className="inline-block bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                    In Stock
                  </span>
                </div>
                <p className="text-3xl font-bold text-indigo-600 mb-4">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              {/* Category and Description */}
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Category:{' '}
                  <span className="font-medium capitalize">
                    {product.category}
                  </span>
                </p>
                {product.description && (
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">
                  Quantity:
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-900 transition duration-200"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-gray-900 border-l border-r border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:text-gray-900 transition duration-200"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition duration-200 flex items-center justify-center gap-2"
                >
                  <FaShoppingCart className="text-sm" />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-gray-900 hover:bg-black text-white py-3 px-6 rounded-lg font-medium transition duration-200"
                >
                  Buy Now
                </button>
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200">
                  <FaHeart className="text-gray-600 hover:text-red-500" />
                </button>
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200">
                  <FaShare className="text-gray-600 hover:text-indigo-600" />
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <FaTruck className="text-green-600 text-xl" />
                  <div>
                    <p className="font-medium text-sm">Free Shipping</p>
                    <p className="text-xs text-gray-600">On orders over $50</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaUndo className="text-blue-600 text-xl" />
                  <div>
                    <p className="font-medium text-sm">Easy Returns</p>
                    <p className="text-xs text-gray-600">
                      30-day return policy
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaShieldAlt className="text-purple-600 text-xl" />
                  <div>
                    <p className="font-medium text-sm">2-Year Warranty</p>
                    <p className="text-xs text-gray-600">
                      Manufacturer warranty
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information Tabs */}
          <div className="border-t border-gray-200">
            <div className="px-8 py-6">
              <div className="border-b border-gray-200">
                <nav className="flex gap-8">
                  <button className="pb-4 px-1 border-b-2 border-indigo-600 text-sm font-medium text-indigo-600">
                    Description
                  </button>
                  <button className="pb-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700">
                    Specifications
                  </button>
                  <button className="pb-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700">
                    Reviews ({reviews.length})
                  </button>
                  <button className="pb-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700">
                    Shipping & Returns
                  </button>
                </nav>
              </div>

              {/* Description Content */}
              <div className="py-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Product Description
                </h3>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <p>
                    {product.description ||
                      `This ${product.name} is crafted with premium materials and designed for exceptional comfort and durability. Perfect for modern homes and offices, it combines style with functionality.`}
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li>• High-quality materials and construction</li>
                    <li>• Designed for comfort and durability</li>
                    <li>• Easy to maintain and clean</li>
                    <li>• Suitable for various room settings</li>
                    <li>• Eco-friendly manufacturing process</li>
                  </ul>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="py-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-6">
                  Customer Reviews ({reviews.length})
                </h3>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-200 pb-6 last:border-b-0"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">
                          {review.user}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {review.date}
                        </span>
                      </div>
                      <div className="flex items-center mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* You can map through related products here */}
            <div className="text-center py-8 text-gray-500">
              Related products would be displayed here
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
