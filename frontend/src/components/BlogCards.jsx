import React from 'react'
import Img1 from '../assets/blog1.png'
import Img2 from '../assets/blog2.png'
const BlogCards = () => {
  const blogs = [
    {
      id: 1,
      image: Img1,
      date: '29 sep, 2022',
      author: 'soroush norozy',
      title: 'Your office should have only natural materials',
      link: '#',
    },
    {
      id: 2,
      image: Img2,
      date: '29 sep, 2022',
      author: 'soroush norozy',
      title: 'Your office should have only natural materials',
      link: '#',
    },
  ]

  return (
    <div className="w-full py-12 px-10  lg:px-30">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {blogs.map((blog) => (
          <div key={blog.id} className="flex flex-col items-center">
            {/* Image */}
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-[300px] object-cover rounded"
            />

            {/* Content */}
            <div className="text-center mt-4">
              <p className="text-gray-500 text-sm">
                {blog.date} / by {blog.author}
              </p>
              <h3 className="font-semibold text-lg mt-2">{blog.title}</h3>
              <a
                href={blog.link}
                className="text-sm text-gray-600 underline mt-2 inline-block hover:text-black transition"
              >
                read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogCards
