import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  useGetSingleBlogQuery,
  useGetAllBlogsQuery,
} from '../features/blogs/BlogsApi.js'
import {
  FaCalendar,
  FaArrowLeft,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaBookOpen,
  FaChevronLeft,
} from 'react-icons/fa'

const BlogDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // API returns { success: true, blog:  }
  const { data: blogData, isLoading, error } = useGetSingleBlogQuery(id)

  // API returns { success: true, blogs: [...] }
  const { data: allBlogsData } = useGetAllBlogsQuery()

  // Access the blog data correctly
  const blog = blogData?.blog || {}
  const allBlogs = allBlogsData?.blogs || []

  // Filter out current blog and get related blogs
  const relatedBlogs = allBlogs.filter((b) => b._id !== id).slice(0, 3)

  // Calculate reading time - fix for your data structure
  const calculateReadTime = (textArray) => {
    if (!textArray || !Array.isArray(textArray)) return 3

    // Your model uses 'text' field, not 'paragraph'
    const wordCount = textArray.join(' ').split(/\s+/).length
    return Math.max(3, Math.ceil(wordCount / 200))
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Share functions
  const shareBlog = (platform) => {
    const url = window.location.href
    const title = blog.title || 'Blog Post'
    const text = 'Check out this amazing blog post!'

    switch (platform) {
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          '_blank'
        )
        break
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent(title)}`,
          '_blank'
        )
        break
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
            url
          )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(
            text
          )}`,
          '_blank'
        )
        break
      case 'whatsapp':
        window.open(
          `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`,
          '_blank'
        )
        break
    }
  }

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">
            Loading blog post...
          </p>
        </div>
      </div>
    )
  }

  if (error || !blog || !blog._id) {
    console.error('Error loading blog:', error)
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-lg">
          <div className="text-red-500 text-6xl mb-4">📄</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {error ? 'Error Loading Blog' : 'Blog Not Found'}
          </h2>
          <p className="text-gray-600 mb-6">
            {error
              ? 'There was an error loading the blog post.'
              : "The blog post you're looking for doesn't exist or has been removed."}
          </p>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium shadow hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <FaArrowLeft />
            Back to Blogs
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200 font-medium cursor-pointer"
            >
              <FaArrowLeft />
              All Blogs
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                {formatDate(blog.publishedAt)}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content - 2/3 width */}
          <article className="lg:w-2/3">
            {/* Blog Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                {blog.title || 'Untitled Blog'}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <FaCalendar className="text-gray-400" />
                  <span>{formatDate(blog.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-gray-400" />
                  <span>{calculateReadTime(blog.text)} min read</span>
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative rounded-2xl overflow-hidden mb-8">
                {blog.imageUrl ? (
                  <img
                    src={blog.imageUrl}
                    alt={blog.title || 'Blog image'}
                    className="w-full h-[400px] md:h-[500px] object-cover"
                  />
                ) : (
                  <div className="w-full h-[400px] md:h-[500px] bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-gray-500 text-lg">
                      No image available
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>

              {/* Social Sharing */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
                  Share this post
                </h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => shareBlog('facebook')}
                    className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
                    title="Share on Facebook"
                  >
                    <FaFacebook />
                  </button>
                  <button
                    onClick={() => shareBlog('twitter')}
                    className="w-10 h-10 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
                    title="Share on Twitter"
                  >
                    <FaTwitter />
                  </button>
                  <button
                    onClick={() => shareBlog('linkedin')}
                    className="w-10 h-10 rounded-full bg-blue-700 hover:bg-blue-800 text-white flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
                    title="Share on LinkedIn"
                  >
                    <FaLinkedin />
                  </button>
                  <button
                    onClick={() => shareBlog('whatsapp')}
                    className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
                    title="Share on WhatsApp"
                  >
                    <FaWhatsapp />
                  </button>
                </div>
              </div>

              {/* Blog Content */}
              <div className="prose prose-lg max-w-none">
                {blog.text && Array.isArray(blog.text) ? (
                  blog.text.map((para, index) => (
                    <div key={index} className="mb-8">
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {para}
                      </p>
                      {index < blog.text.length - 1 && (
                        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-8"></div>
                      )}
                    </div>
                  ))
                ) : blog.text ? (
                  // If text is a string instead of array
                  <div className="mb-8">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {blog.text}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                      No content available.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </article>

          {/* Sidebar - 1/3 width */}
          <aside className="lg:w-1/3">
            {/* Related Blogs */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaBookOpen className="text-indigo-600" />
                You Might Also Like
              </h3>
              <div className="space-y-4">
                {relatedBlogs.length > 0 ? (
                  relatedBlogs.map((relatedBlog) => (
                    <Link
                      key={relatedBlog._id}
                      to={`/blogs/${relatedBlog._id}`}
                      className="group block cursor-pointer"
                    >
                      <div className="flex gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          {relatedBlog.imageUrl ? (
                            <img
                              src={relatedBlog.imageUrl}
                              alt={relatedBlog.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
                              <span className="text-gray-500 text-xs">
                                No image
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                            {relatedBlog.title || 'Untitled Blog'}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <FaCalendar className="text-gray-400" />
                            <span>{formatDate(relatedBlog.publishedAt)}</span>
                          </div>
                          {relatedBlog.text && relatedBlog.text[0] && (
                            <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                              {relatedBlog.text[0].substring(0, 60)}...
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm italic">
                    No related blogs found
                  </p>
                )}
              </div>
            </div>

            {/* Reading Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Reading Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-indigo-600">
                    {calculateReadTime(blog.text)}
                  </div>
                  <div className="text-xs text-gray-600 mt-1 font-medium">
                    Minutes to read
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">
                    {blog.text
                      ? Array.isArray(blog.text)
                        ? blog.text.length
                        : 1
                      : 0}
                  </div>
                  <div className="text-xs text-gray-600 mt-1 font-medium">
                    {Array.isArray(blog.text) ? 'Paragraphs' : 'Section'}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Floating Navigation */}
      <div className="fixed right-4 bottom-4 md:right-8 md:bottom-8 flex flex-col gap-3 z-20">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 cursor-pointer"
          title="Back to top"
        >
          <FaChevronLeft className="rotate-90 text-lg" />
        </button>
        <button
          onClick={() => shareBlog('whatsapp')}
          className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 cursor-pointer"
          title="Share on WhatsApp"
        >
          <FaWhatsapp className="text-lg" />
        </button>
      </div>

      {/* Navigation Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200 mt-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200 font-medium cursor-pointer"
          >
            <FaArrowLeft />
            Back to All Blogs
          </Link>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>© {new Date().getFullYear()} Blog Platform</span>
            <span className="hidden sm:inline">•</span>
            <span>All rights reserved</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogDetail
