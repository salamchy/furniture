import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useGetProductsQuery } from '../features/product/ProductApi.js'
import { addToCart, selectCartItemById } from '../features/cart/cartSlice'
import {
  FaSpinner,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaImage,
  FaShoppingCart,
  FaCheck,
  FaEye,
  FaArrowRight,
} from 'react-icons/fa'
import { toast } from 'react-toastify'

const Shop = () => {
  const { data: products = [], isLoading, error } = useGetProductsQuery()
  const dispatch = useDispatch()

  // State for filters
  const [selectedCategories, setSelectedCategories] = useState([])
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(1000)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [addedToCart, setAddedToCart] = useState({})
  const productsPerPage = 6

  // Selector to get cart items
  const getCartItem = useSelector(selectCartItemById)

  // Extract unique categories from products
  const categories = React.useMemo(() => {
    const categoryCount = {}
    products.forEach((product) => {
      categoryCount[product.category] =
        (categoryCount[product.category] || 0) + 1
    })
    return Object.entries(categoryCount).map(([name, count]) => ({
      name,
      count,
    }))
  }, [products])

  // Calculate price range from products
  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map((p) => p.price)
      const calculatedMinPrice = Math.floor(Math.min(...prices))
      const calculatedMaxPrice = Math.ceil(Math.max(...prices))
      setMinPrice(calculatedMinPrice)
      setMaxPrice(calculatedMaxPrice)
    }
  }, [products])

  // Toggle category selection
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
    setCurrentPage(1)
  }

  // Handle min price change
  const handleMinPriceChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1)
    setMinPrice(value)
    setCurrentPage(1)
  }

  // Handle max price change
  const handleMaxPriceChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 1)
    setMaxPrice(value)
    setCurrentPage(1)
  }

  // Add to cart function using Redux
  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }))

    // Show success message
    toast.success(`${product.name} added to cart!`, {
      position: 'top-right',
      autoClose: 3000,
    })

    // Update UI state to show checkmark
    setAddedToCart((prev) => ({
      ...prev,
      [product._id]: true,
    }))

    // Reset checkmark after 2 seconds
    setTimeout(() => {
      setAddedToCart((prev) => ({
        ...prev,
        [product._id]: false,
      }))
    }, 2000)
  }

  // Check if product is in cart
  const isProductInCart = (productId) => {
    return getCartItem(productId) !== undefined
  }

  // Filter products based on selected filters and search query
  const filteredProducts = products.filter((product) => {
    // Search filter
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !product.description?.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Category filter
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(product.category)
    ) {
      return false
    }

    // Price filter
    if (product.price < minPrice || product.price > maxPrice) {
      return false
    }

    return true
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  // Previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      const startPage = Math.max(1, currentPage - 2)
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }
    }

    return pageNumbers
  }

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

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
              <p className="text-lg font-semibold">Error loading products</p>
              <p className="text-sm">
                {error?.data?.error || 'Please try again later'}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen mt-16 bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with results count and search bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <p className="text-gray-600">
            Showing {currentProducts.length} of {filteredProducts.length}{' '}
            results
            {filteredProducts.length !== products.length &&
              ` (${products.length} total products)`}
          </p>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <div className="space-y-2 mb-6 max-h-60 overflow-y-auto">
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${index}`}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      checked={selectedCategories.includes(category.name)}
                      onChange={() => toggleCategory(category.name)}
                    />
                    <label
                      htmlFor={`category-${index}`}
                      className="ml-2 text-gray-700 text-sm"
                    >
                      {category.name} ({category.count})
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No categories available</p>
              )}
            </div>

            <h2 className="text-lg font-semibold mb-4">Price Range</h2>
            <div className="mb-6">
              <div className="flex justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">
                  ${minPrice}
                </span>
                <span className="text-sm font-medium text-gray-700">
                  ${maxPrice}
                </span>
              </div>

              {/* Min Price Slider */}
              <div className="mb-4">
                <label className="block text-xs text-gray-500 mb-2">
                  Minimum Price
                </label>
                <input
                  type="range"
                  min={0}
                  max={1000}
                  value={minPrice}
                  onChange={handleMinPriceChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Max Price Slider */}
              <div className="mb-2">
                <label className="block text-xs text-gray-500 mb-2">
                  Maximum Price
                </label>
                <input
                  type="range"
                  min={0}
                  max={1000}
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Price Inputs for precise control */}
              <div className="flex gap-2 mt-4">
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">
                    Min
                  </label>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    min={0}
                    max={maxPrice - 1}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">
                    Max
                  </label>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    min={minPrice + 1}
                    max={1000}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedCategories([])
                setSearchQuery('')
                setCurrentPage(1)
                // Reset price range to original
                if (products.length > 0) {
                  const prices = products.map((p) => p.price)
                  const calculatedMinPrice = Math.floor(Math.min(...prices))
                  const calculatedMaxPrice = Math.ceil(Math.max(...prices))
                  setMinPrice(calculatedMinPrice)
                  setMaxPrice(calculatedMaxPrice)
                }
              }}
              className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200"
            >
              Clear All Filters
            </button>
          </div>

          {/* Products Grid */}
          <div className="w-full md:w-3/4">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <FaImage className="mx-auto text-4xl text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600">
                  No products found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={() => {
                    setSelectedCategories([])
                    setSearchQuery('')
                    setCurrentPage(1)
                    if (products.length > 0) {
                      const prices = products.map((p) => p.price)
                      const calculatedMinPrice = Math.floor(Math.min(...prices))
                      const calculatedMaxPrice = Math.ceil(Math.max(...prices))
                      setMinPrice(calculatedMinPrice)
                      setMaxPrice(calculatedMaxPrice)
                    }
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition duration-200"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {currentProducts.map((product) => (
                    <div
                      key={product._id}
                      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-200 border border-gray-100 relative group"
                    >
                      {/* Stock Badge */}
                      {product.stock === 0 && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
                          Out of Stock
                        </div>
                      )}
                      {product.stock > 0 && product.stock <= 5 && (
                        <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded z-10">
                          Low Stock
                        </div>
                      )}

                      {/* Product Image */}
                      <div className="h-48 bg-gray-200 overflow-hidden">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          onError={(e) => {
                            e.target.src =
                              'https://via.placeholder.com/300x200?text=Product+Image'
                          }}
                        />
                      </div>

                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2 capitalize">
                          {product.category}
                        </p>
                        {product.description && (
                          <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                            {product.description}
                          </p>
                        )}
                        <div className="flex justify-between items-center">
                          <p className="text-indigo-600 font-bold text-lg">
                            ${product.price.toFixed(2)}
                          </p>
                          <div className="flex gap-2">
                            {/* View Details Button */}
                            <Link to={`/product/${product._id}`}>
                              <button className="flex items-center gap-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer">
                                Details
                                <FaArrowRight className="text-xs " />
                              </button>
                            </Link>

                            {/* Circular Add to Cart Button */}
                            <button
                              onClick={() => handleAddToCart(product)}
                              disabled={
                                product.stock === 0 || addedToCart[product._id]
                              }
                              className={`flex items-center justify-center w-10 h-10 rounded-full text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer ${
                                addedToCart[product._id] ||
                                isProductInCart(product._id)
                                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white cursor-default shadow-lg scale-110'
                                  : product.stock === 0
                                  ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white cursor-not-allowed'
                                  : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white'
                              }`}
                              title={
                                addedToCart[product._id] ||
                                isProductInCart(product._id)
                                  ? 'Added to Cart'
                                  : product.stock === 0
                                  ? 'Out of Stock'
                                  : 'Add to Cart'
                              }
                            >
                              {addedToCart[product._id] ||
                              isProductInCart(product._id) ? (
                                <FaCheck className="text-sm" />
                              ) : (
                                <FaShoppingCart className="text-sm" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-lg shadow p-4">
                    <div className="text-sm text-gray-600">
                      Page {currentPage} of {totalPages} •{' '}
                      {indexOfFirstProduct + 1}-
                      {Math.min(indexOfLastProduct, filteredProducts.length)} of{' '}
                      {filteredProducts.length} products
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Previous Button */}
                      <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                      >
                        <FaChevronLeft className="text-sm" />
                        Previous
                      </button>

                      {/* Page Numbers */}
                      <div className="flex gap-1">
                        {getPageNumbers().map((number) => (
                          <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`w-10 h-10 flex items-center justify-center border rounded-lg transition duration-200 ${
                              currentPage === number
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {number}
                          </button>
                        ))}
                      </div>

                      {/* Next Button */}
                      <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                      >
                        Next
                        <FaChevronRight className="text-sm" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop
