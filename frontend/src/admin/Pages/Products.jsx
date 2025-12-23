import React, { useState } from 'react'
import {
  useGetProductsQuery,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
} from '../../features/product/productApi'
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaImage,
  FaSpinner,
  FaTimes,
  FaChair,
  FaTable,
  FaLightbulb,
  FaSeedling,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa'
import { toast } from 'react-toastify'

const Products = () => {
  const { data: products = [], isLoading, error } = useGetProductsQuery()
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation()
  const [editProduct, { isLoading: isEditing }] = useEditProductMutation()
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation()

  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 4

  // Category options based on schema
  const categoryOptions = [
    {
      value: 'lamp',
      label: 'Lamp',
      icon: <FaLightbulb className="inline mr-2" />,
    },
    {
      value: 'table',
      label: 'Table',
      icon: <FaTable className="inline mr-2" />,
    },
    {
      value: 'chair',
      label: 'Chair',
      icon: <FaChair className="inline mr-2" />,
    },
    {
      value: 'pot',
      label: 'Pot',
      icon: <FaSeedling className="inline mr-2" />,
    },
  ]

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: null,
  })

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      description: '',
      image: null,
    })
    setEditingProduct(null)
  }

  // Handle modal open/close
  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product)
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        description: product.description,
        image: null,
      })
    } else {
      resetForm()
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    resetForm()
  }

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle file input
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!formData.name || !formData.category || !formData.price) {
      toast.error('Please fill in all required fields')
      return
    }

    if (!editingProduct && !formData.image) {
      toast.error('Please select an image')
      return
    }

    try {
      const submitData = new FormData()
      submitData.append('name', formData.name)
      submitData.append('category', formData.category)
      submitData.append('price', formData.price)
      submitData.append('description', formData.description)

      if (formData.image) {
        submitData.append('image', formData.image)
      }

      if (editingProduct) {
        await editProduct({
          id: editingProduct._id,
          formData: submitData,
        }).unwrap()
        toast.success('Product updated successfully!')
      } else {
        await addProduct(submitData).unwrap()
        toast.success('Product added successfully!')
      }

      handleCloseModal()
    } catch (error) {
      console.error('Operation failed:', error)
      toast.error(error?.data?.error || 'Operation failed. Please try again.')
    }
  }

  // Handle delete product with Toastify confirmation
  const handleDelete = async (id, productName) => {
    // Store the toast ID
    const toastId = toast.info(
      <div className="text-center">
        <h3 className="font-semibold mb-2">Delete Product?</h3>
        <p>
          Are you sure you want to delete{' '}
          {productName ? `"${productName}"` : 'this product'}?
        </p>
        <p className="text-sm text-gray-600 mt-1">
          This action cannot be undone.
        </p>
        <div className="flex gap-2 mt-4">
          <button
            className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition duration-200"
            onClick={() => handleDeleteConfirm(id, toastId)}
          >
            Yes, Delete
          </button>
          <button
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transition duration-200"
            onClick={() => toast.dismiss(toastId)}
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: 'top-center',
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
        style: { minWidth: '400px' },
      }
    )
  }

  // Separate function for the actual deletion
  const handleDeleteConfirm = async (id, toastId) => {
    toast.dismiss(toastId)
    try {
      await deleteProduct(id).unwrap()
      toast.success('Product deleted successfully!')
      // Reset to first page if the last item on current page is deleted
      if (currentProducts.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1)
      }
    } catch (error) {
      console.error('Delete failed:', error)
      toast.error(error?.data?.error || 'Delete failed. Please try again.')
    }
  }

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory
    return matchesSearch && matchesCategory
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

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategory])

  // Get category icon
  const getCategoryIcon = (category) => {
    const categoryOption = categoryOptions.find((opt) => opt.value === category)
    return categoryOption ? categoryOption.icon : null
  }

  // Get category label
  const getCategoryLabel = (category) => {
    const categoryOption = categoryOptions.find((opt) => opt.value === category)
    return categoryOption ? categoryOption.label : category
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

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 text-center">
          <p className="text-lg font-semibold">Error loading products</p>
          <p className="text-sm">
            {error?.data?.error || 'Please try again later'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Products Management
          </h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200 cursor-pointer"
        >
          <FaPlus className="text-sm" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
          >
            <option value="">All Categories</option>
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Results Count */}
          <div className="flex items-center justify-end text-gray-600">
            Showing {currentProducts.length} of {filteredProducts.length}{' '}
            products
            {filteredProducts.length !== products.length &&
              ` (${products.length} total)`}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-4xl text-blue-600" />
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <FaImage className="mx-auto text-4xl text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-600">
            No products found
          </h3>
          <p className="text-gray-500 mb-4">
            Get started by adding your first product
          </p>
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg cursor-pointer"
          >
            Add Product
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {currentProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200"
              >
                {/* Product Image */}
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800 truncate flex-1">
                      {product.name}
                    </h3>
                    <span className="text-lg font-bold text-blue-600 ml-2">
                      ${product.price}
                    </span>
                  </div>

                  <span className="inline-flex items-center bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded mb-2">
                    {getCategoryIcon(product.category)}
                    {getCategoryLabel(product.category)}
                  </span>

                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {product.description}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenModal(product)}
                      disabled={isEditing}
                      className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 rounded transition duration-200 disabled:opacity-50 cursor-pointer"
                    >
                      <FaEdit className="text-sm" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id, product.name)}
                      disabled={isDeleting}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded transition duration-200 disabled:opacity-50 cursor-pointer"
                    >
                      {isDeleting ? (
                        <FaSpinner className="animate-spin text-sm" />
                      ) : (
                        <FaTrash className="text-sm" />
                      )}
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-lg shadow p-4">
              <div className="text-sm text-gray-600">
                Page {currentPage} of {totalPages} • {indexOfFirstProduct + 1}-
                {Math.min(indexOfLastProduct, filteredProducts.length)} of{' '}
                {filteredProducts.length} products
              </div>

              <div className="flex items-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 cursor-pointer"
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
                      className={`w-10 h-10 flex items-center justify-center border cursor-pointer rounded-lg transition duration-200 ${
                        currentPage === number
                          ? 'bg-blue-600 text-white border-blue-600'
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
                  className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 cursor-pointer"
                >
                  Next
                  <FaChevronRight className="text-sm" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition duration-200 cursor-pointer"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Category Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {editingProduct
                    ? 'Product Image (Leave empty to keep current)'
                    : 'Product Image *'}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {formData.image && (
                  <p className="text-sm text-green-600 mt-1">
                    {formData.image.name} selected
                  </p>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAdding || isEditing}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {(isAdding || isEditing) && (
                    <FaSpinner className="animate-spin" />
                  )}
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Products
