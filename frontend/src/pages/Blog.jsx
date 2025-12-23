import React from 'react'
import { useGetAllBlogsQuery } from '../features/blogs/BlogsApi.js'
import { Link } from 'react-router-dom'

const Blog = () => {
  const { data, isLoading, error } = useGetAllBlogsQuery()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-lg font-medium animate-pulse">Loading blogs...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">Failed to load blogs</div>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-15">
      {/* Page Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Latest Blogs</h1>
        <p className="text-gray-500 mt-2">
          Read insights, tutorials, and stories from our authors
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data?.blogs?.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
          >
            {/* Blog Image */}
            <div className="h-52 w-full overflow-hidden">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="h-full w-full object-cover hover:scale-105 transition duration-300"
              />
            </div>

            {/* Blog Content */}
            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-800 line-clamp-2">
                {blog.title}
              </h2>

              {/* Author & Date */}
              <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                <span>✍️ {blog.author?.name || 'Unknown Author'}</span>
                <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
              </div>

              {/* Read More */}
              <Link
                to={`/blogs/${blog._id}`}
                className="inline-block mt-5 text-indigo-600 font-medium hover:underline"
              >
                Read more →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Blog
