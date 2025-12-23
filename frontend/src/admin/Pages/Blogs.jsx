import { useState } from 'react'
import {
  useGetAllBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} from '../../features/blogs/BlogsApi.js'
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSpinner,
  FaTimes,
  FaSearch,
  FaImage,
  FaCalendar,
  FaUser,
  FaEye,
  FaPaperPlane,
} from 'react-icons/fa'
import { toast } from 'react-toastify'

const Blogs = () => {
  const { data, isLoading, error, refetch } = useGetAllBlogsQuery()
  const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation()
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation()
  const [deleteBlog] = useDeleteBlogMutation()

  const blogs = data?.blogs || []

  const [showModal, setShowModal] = useState(false)
  const [editingBlog, setEditingBlog] = useState(null)
  const [search, setSearch] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    text: '',
    image: null,
    imagePreview: '',
  })

  // Open modal
  const openModal = (blog = null) => {
    if (blog) {
      setEditingBlog(blog)
      setFormData({
        title: blog.title,
        text: blog.text?.join('\n\n') || '',
        image: null,
        imagePreview: blog.imageUrl || '',
      })
    } else {
      setEditingBlog(null)
      setFormData({
        title: '',
        text: '',
        image: null,
        imagePreview: '',
      })
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingBlog(null)
    setFormData({
      title: '',
      text: '',
      image: null,
      imagePreview: '',
    })
  }

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }))
    }
  }

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.text.trim()) {
      toast.error('Title and content are required')
      return
    }

    if (!editingBlog && !formData.image) {
      toast.error('Image is required for new blogs')
      return
    }

    const fd = new FormData()
    fd.append('title', formData.title.trim())
    fd.append(
      'text',
      JSON.stringify(formData.text.split('\n\n').filter((p) => p.trim()))
    )

    if (formData.image) {
      fd.append('image', formData.image)
    }

    try {
      if (editingBlog) {
        await updateBlog({
          id: editingBlog._id,
          data: fd,
        }).unwrap()
        toast.success(' Blog updated successfully')
      } else {
        await createBlog(fd).unwrap()
        toast.success(' Blog created successfully')
      }
      closeModal()
      refetch()
    } catch (err) {
      toast.error(err?.data?.message || 'Operation failed')
    }
  }

  // Delete with toast confirmation
  const handleDelete = (id, title) => {
    const toastId = toast.info(
      <div className="text-center p-4">
        <div className="mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <FaTrash className="text-red-600 text-xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Delete Blog Post?
          </h3>
          <p className="text-gray-600">
            Are you sure you want to delete "{title}"? This action cannot be
            undone.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl font-medium transition-all duration-200 active:scale-95 cursor-pointer"
            onClick={() => toast.dismiss(toastId)}
          >
            Cancel
          </button>
          <button
            className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-3 rounded-xl font-medium transition-all duration-200 active:scale-95 cursor-pointer"
            onClick={() => handleDeleteConfirm(id, toastId)}
          >
            Delete
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
        bodyClassName: 'p-0',
      }
    )
  }

  // Separate function for the actual deletion
  const handleDeleteConfirm = async (id, toastId) => {
    toast.dismiss(toastId)

    const loadingToast = toast.loading('Deleting blog post...', {
      position: 'top-center',
    })

    try {
      await deleteBlog(id).unwrap()
      toast.dismiss(loadingToast)
      toast.success(' Blog deleted successfully!', {
        position: 'top-center',
        autoClose: 3000,
      })
      refetch()
    } catch (error) {
      toast.dismiss(loadingToast)
      console.error('Delete failed:', error)
      toast.error(error?.data?.error || 'Delete failed. Please try again.', {
        position: 'top-center',
        autoClose: 3000,
      })
    }
  }

  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  )

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] cursor-default">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Failed to load blogs
        </h2>
        <p className="text-gray-600 mb-6">
          Please check your connection and try again
        </p>
        <button
          onClick={() => refetch()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow hover:shadow-lg cursor-pointer active:scale-95"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 md:mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              Blog Management
            </h1>
            <p className="text-gray-600 mt-1 md:mt-2">
              Create, edit, and manage your blog posts
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-3 md:px-6 rounded-xl font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            <FaPlus className="text-lg" />
            <span>Create New</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search blogs by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 shadow-sm hover:shadow-md cursor-text"
          />
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] cursor-default">
          <FaSpinner className="animate-spin text-4xl text-indigo-600 mb-4" />
          <p className="text-gray-600 text-lg">Loading blogs...</p>
        </div>
      ) : (
        <>
          {/* Blogs Grid */}
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-10 md:py-12 bg-white rounded-2xl shadow-sm border border-gray-200 cursor-default">
              <div className="text-5xl md:text-6xl mb-4">📝</div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">
                {search ? 'No matching blogs found' : 'No blogs yet'}
              </h3>
              <p className="text-gray-500 mb-6 text-sm md:text-base">
                {search
                  ? 'Try a different search term'
                  : 'Create your first blog to get started'}
              </p>
              {!search && (
                <button
                  onClick={() => openModal()}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-xl font-medium inline-flex items-center gap-2 shadow hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
                >
                  <FaPlus />
                  Create Your First Blog
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 group cursor-pointer active:scale-[0.99]"
                  onClick={() => openModal(blog)}
                >
                  {/* Blog Image */}
                  <div className="relative overflow-hidden h-36 md:h-40">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-100 opacity-0" />
                    <div className="absolute top-3 right-3 md:top-4 md:right-4">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-2 py-1 md:px-3 rounded-full">
                        Blog
                      </span>
                    </div>
                  </div>

                  {/* Blog Content */}
                  <div className="p-4 md:p-5">
                    <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-gray-500 mb-2 md:mb-3">
                      <FaCalendar className="text-gray-400" />
                      <span>
                        {new Date(blog.publishedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3 line-clamp-2 transition-colors duration-200 group-hover:text-indigo-600">
                      {blog.title}
                    </h3>

                    <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4 line-clamp-2 md:line-clamp-3">
                      {blog.excerpt || blog.text?.[0]?.substring(0, 30) + '...'}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-3 md:pt-4 border-t border-gray-100">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          openModal(blog)
                        }}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-2 md:py-2.5 px-3 md:px-4 rounded-xl font-medium flex items-center justify-center gap-1 md:gap-2 shadow hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
                      >
                        <FaEdit className="text-xs md:text-sm" />
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(blog._id, blog.title)
                        }}
                        className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-2 md:py-2.5 px-3 md:px-4 rounded-xl font-medium flex items-center justify-center gap-1 md:gap-2 shadow hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
                      >
                        <FaTrash className="text-xs md:text-sm" />
                        <span className="hidden md:inline">Delete</span>
                        <span className="md:hidden">Del</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div
            className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl transform animate-slideUp max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white flex items-center justify-between p-4 md:p-6 border-b border-gray-200 z-10">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  {editingBlog ? 'Edit Blog' : 'Create New Blog'}
                </h2>
                <p className="text-gray-600 text-xs md:text-sm mt-1">
                  {editingBlog
                    ? 'Update your blog post'
                    : 'Share your thoughts with the world'}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800 hover:bg-gray-100 p-2 rounded-full transition-colors duration-200 cursor-pointer"
              >
                <FaTimes className="text-lg md:text-xl" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-4 md:p-6">
              <div className="space-y-4 md:space-y-6">
                {/* Title Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blog Title *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter a captivating title..."
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 shadow-sm hover:shadow-md cursor-text"
                    required
                  />
                </div>

                {/* Content Textarea */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blog Content *
                  </label>
                  <textarea
                    rows="6"
                    placeholder="Write your blog content here... (Use double line breaks for paragraphs)"
                    value={formData.text}
                    onChange={(e) =>
                      setFormData({ ...formData, text: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 shadow-sm hover:shadow-md cursor-text resize-none"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Tip: Use two line breaks (press Enter twice) to separate
                    paragraphs
                  </p>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {editingBlog
                      ? 'Blog Image (Leave unchanged to keep current)'
                      : 'Blog Image *'}
                  </label>
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    {/* Image Preview */}
                    <div className="flex-1">
                      {formData.imagePreview ||
                      (editingBlog && editingBlog.imageUrl) ? (
                        <div className="relative rounded-xl overflow-hidden border border-gray-300 h-40 md:h-48">
                          <img
                            src={formData.imagePreview || editingBlog.imageUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-gray-300 rounded-xl h-40 md:h-48 flex flex-col items-center justify-center text-gray-400">
                          <FaImage className="text-3xl md:text-4xl mb-2 md:mb-3" />
                          <p className="text-sm md:text-base">
                            Image preview will appear here
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Upload Button */}
                    <div className="flex-1">
                      <label className="block cursor-pointer">
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-dashed border-indigo-200 rounded-xl p-4 md:p-6 text-center hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100 transition-all duration-200 group">
                          <div className="bg-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3 transition-transform duration-200 group-hover:scale-110">
                            <FaImage className="text-indigo-600 text-lg md:text-xl" />
                          </div>
                          <p className="font-medium text-gray-700 mb-1 text-sm md:text-base">
                            {formData.image ? 'Change Image' : 'Upload Image'}
                          </p>
                          <p className="text-xs md:text-sm text-gray-500">
                            Click to browse or drag & drop
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            PNG, JPG up to 5MB
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 md:pt-8 mt-4 md:mt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 md:px-6 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow active:scale-95 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-4 md:px-6 rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer"
                >
                  {isCreating || isUpdating ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      {editingBlog ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      {editingBlog ? (
                        <>
                          <FaPaperPlane />
                          Update Blog
                        </>
                      ) : (
                        <>
                          <FaPlus />
                          Create Blog
                        </>
                      )}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Blogs
