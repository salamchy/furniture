import React, { useState } from 'react'

const Shop = () => {
  const productsData = [
    {
      id: 1,
      name: 'Modern table',
      price: 73.0,
      category: 'Modem',
      color: 'Black',
    },
    {
      id: 2,
      name: 'Modern sofa',
      price: 73.0,
      category: 'Modem',
      color: 'Blue',
    },
    {
      id: 3,
      name: 'Modern chair',
      price: 73.0,
      category: 'Wood',
      color: 'Roat',
    },
    {
      id: 4,
      name: 'Modern sofa',
      price: 73.0,
      category: 'Floor',
      color: 'Green',
    },
    {
      id: 5,
      name: 'Modern sofa',
      price: 73.0,
      category: 'Leaf',
      color: 'Yellow',
    },
    {
      id: 6,
      name: 'Modern sofa',
      price: 73.0,
      category: 'Retro',
      color: 'Grey',
    },
    {
      id: 7,
      name: 'Modern sofa',
      price: 85.0,
      category: 'Caring',
      color: 'Black',
    },
    {
      id: 8,
      name: 'Modern sofa',
      price: 65.0,
      category: 'Wood',
      color: 'Blue',
    },
    {
      id: 9,
      name: 'Modern sofa',
      price: 120.0,
      category: 'Floor',
      color: 'Roat',
    },
  ]

  const categories = [
    { name: 'Caring', count: 25 },
    { name: 'Floor', count: 35 },
    { name: 'Leaf', count: 25 },
    { name: 'Modem', count: 25 },
    { name: 'Retro', count: 25 },
    { name: 'Wood', count: 15 },
  ]

  const colors = [
    { name: 'Black', count: 25 },
    { name: 'Blue', count: 25 },
    { name: 'Roat', count: 35 },
    { name: 'Green', count: 25 },
    { name: 'Yellow', count: 25 },
    { name: 'Grey', count: 25 },
  ]

  // State for filters
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [priceRange, setPriceRange] = useState([4, 800])
  const [searchQuery, setSearchQuery] = useState('')

  // Toggle category selection
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  // Toggle color selection
  const toggleColor = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color))
    } else {
      setSelectedColors([...selectedColors, color])
    }
  }

  // Filter products based on selected filters and search query
  const filteredProducts = productsData.filter((product) => {
    // Search filter
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase())
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

    // Color filter
    if (selectedColors.length > 0 && !selectedColors.includes(product.color)) {
      return false
    }

    // Price filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false
    }

    return true
  })

  return (
    <div className="min-h-screen mt-16 bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with results count and search bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {productsData.length} results
          </p>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
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
            <h2 className="text-lg font-semibold mb-4">Category</h2>
            <div className="space-y-2 mb-6">
              {categories.map((category, index) => (
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
                    className="ml-2 text-gray-700"
                  >
                    {category.name} ({category.count})
                  </label>
                </div>
              ))}
            </div>

            <h2 className="text-lg font-semibold mb-4">Color</h2>
            <div className="space-y-2 mb-6">
              {colors.map((color, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`color-${index}`}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={selectedColors.includes(color.name)}
                    onChange={() => toggleColor(color.name)}
                  />
                  <label
                    htmlFor={`color-${index}`}
                    className="ml-2 text-gray-700"
                  >
                    {color.name} ({color.count})
                  </label>
                </div>
              ))}
            </div>

            <h2 className="text-lg font-semibold mb-4">Price</h2>
            <div className="mb-4">
              <p className="text-gray-700">
                ${priceRange[0]} - ${priceRange[1]}
              </p>
              <input
                type="range"
                min="4"
                max="800"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], parseInt(e.target.value)])
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition">
              Filter
            </button>
          </div>

          {/* Products Grid */}
          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
                >
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Product Image</span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-indigo-600 font-semibold mt-2">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop
