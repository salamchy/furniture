// components/CarouselManagement.jsx
import React, { useState } from 'react'
import {
  useGetCarouselsQuery,
  useAddCarouselMutation,
  useDeleteCarouselMutation,
} from '../../features/bannerImg/BannerImgApi.js'
import {
  FaPlus,
  FaTrash,
  FaSpinner,
  FaTimes,
  FaImage,
  FaExclamationTriangle,
} from 'react-icons/fa'
import { toast } from 'react-toastify'

const Banner = () => {
  const { data: response, isLoading, error, refetch } = useGetCarouselsQuery()
  const [addCarousel, { isLoading: isAdding }] = useAddCarouselMutation()
  const [deleteCarousel, { isLoading: isDeleting }] =
    useDeleteCarouselMutation()

  // Handle different response structures based on your backend
  const carousels = response?.bannerImg || response?.carousels || response || []
  const currentCount = response?.count || carousels.length

  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
  })

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: null,
    })
  }

  const handleOpenModal = () => {
    resetForm()
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    resetForm()
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.image) {
      toast.error('Please select an image')
      return
    }

    // Check if maximum limit reached (4 images based on your backend)
    if (currentCount >= 4) {
      toast.error(
        'Maximum limit of 4 carousel images reached. Please delete an existing image first.'
      )
      return
    }

    try {
      const submitData = new FormData()
      submitData.append('image', formData.image)
      submitData.append('title', formData.title)
      submitData.append('description', formData.description)

      await addCarousel(submitData).unwrap()
      toast.success('Carousel image added successfully!')
      handleCloseModal()
      refetch() // Refresh the list
    } catch (error) {
      console.error('Add carousel failed:', error)
      toast.error(
        error?.data?.error || 'Failed to add carousel image. Please try again.'
      )
    }
  }

  const handleDelete = async (id, title) => {
    // Store the toast ID
    const toastId = toast.info(
      <div className="text-center">
        <h3 className="font-semibold mb-2">Delete Carousel Image?</h3>
        <p>
          Are you sure you want to delete{' '}
          {title ? `"${title}"` : 'this carousel image'}?
        </p>
        <div className="flex gap-2 mt-3">
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
        style: { minWidth: '350px' },
      }
    )
  }

  // Separate function for the actual deletion
  const handleDeleteConfirm = async (id, toastId) => {
    toast.dismiss(toastId)
    try {
      await deleteCarousel(id).unwrap()
      toast.success('Carousel image deleted successfully!')
      refetch()
    } catch (error) {
      console.error('Delete failed:', error)
      toast.error(error?.data?.error || 'Delete failed. Please try again.')
    }
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 text-center">
          <p className="text-lg font-semibold">Error loading carousel images</p>
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
            Carousel Management
          </h1>
          <p className="text-gray-600">
            Manage homepage banner images (Max: 4)
          </p>
        </div>

        <button
          onClick={handleOpenModal}
          disabled={currentCount >= 4}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition duration-200"
        >
          <FaPlus className="text-sm" />
          Add Image {currentCount >= 4 && '(Max Reached)'}
        </button>
      </div>

      {/* Max Limit Warning */}
      {currentCount >= 4 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <FaExclamationTriangle className="text-yellow-500 text-xl" />
            <div>
              <h3 className="font-semibold text-yellow-800">
                Maximum Limit Reached
              </h3>
              <p className="text-yellow-700 text-sm">
                You have reached the maximum limit of 4 carousel images. Please
                delete an existing image to add a new one.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Carousel Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-4xl text-blue-600" />
        </div>
      ) : currentCount === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <FaImage className="mx-auto text-4xl text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-600">
            No carousel images
          </h3>
          <p className="text-gray-500 mb-4">
            Add up to 4 banner images for your homepage carousel
          </p>
          <button
            onClick={handleOpenModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200"
          >
            Add First Image
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {carousels.map((carousel, index) => (
            <div
              key={carousel._id || index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200"
            >
              {/* Carousel Image */}
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img
                  src={carousel.imageUrl}
                  alt={carousel.title || `Carousel ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      'https://via.placeholder.com/400x300?text=Image+Error'
                  }}
                />
              </div>

              {/* Carousel Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-500">
                    Image {index + 1}
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Active
                  </span>
                </div>

                {/* Title */}
                {carousel.title && (
                  <h3 className="font-semibold text-gray-800 truncate mb-2">
                    {carousel.title}
                  </h3>
                )}

                {/* Description */}
                {carousel.description && (
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {carousel.description}
                  </p>
                )}

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(carousel._id, carousel.title)}
                  disabled={isDeleting}
                  className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded transition duration-200 disabled:opacity-50"
                >
                  {isDeleting ? (
                    <FaSpinner className="animate-spin text-sm" />
                  ) : (
                    <FaTrash className="text-sm" />
                  )}
                  Delete Image
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Image Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">Add Carousel Image</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition duration-200"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Carousel Image *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition duration-200">
                  <FaImage className="mx-auto text-3xl text-gray-400 mb-3" />
                  <p className="text-sm text-gray-600 mb-2">
                    {formData.image
                      ? formData.image.name
                      : 'Choose an image file'}
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="carousel-image"
                  />
                  <label
                    htmlFor="carousel-image"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition duration-200"
                  >
                    Choose File
                  </label>
                </div>
                {formData.image && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 text-sm">
                      <strong>Selected:</strong> {formData.image.name}
                    </p>
                    <p className="text-green-600 text-xs">
                      Size: {(formData.image.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title (Optional)
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter banner title"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Optional)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter banner description"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAdding || !formData.image}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 flex items-center justify-center gap-2"
                >
                  {isAdding && <FaSpinner className="animate-spin" />}
                  Add Image
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Count Summary */}
      {currentCount > 0 && (
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Showing {currentCount} of 4 carousel images
          </p>
          {currentCount < 4 && (
            <p className="text-sm text-gray-500 mt-1">
              You can add {4 - currentCount} more image
              {4 - currentCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default Banner
