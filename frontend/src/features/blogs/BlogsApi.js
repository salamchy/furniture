import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from '../../utils/baseUrl.js'

export const blogsApi = createApi({
  reducerPath: 'blogsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/v1/blogs`,
    credentials: 'include',
  }),
  tagTypes: ['Blogs'],
  endpoints: (builder) => ({
    // 🔹 Create Blog
    createBlog: builder.mutation({
      query: (blogData) => ({
        url: '/',
        method: 'POST',
        body: blogData,
      }),
      invalidatesTags: ['Blog'],
    }),

    // 🔹 Get All Blogs
    getAllBlogs: builder.query({
      query: () => '/',
      providesTags: ['Blog'],
    }),

    // 🔹 Get Single Blog
    getSingleBlog: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Blog', id }],
    }),

    // 🔹 Update Blog
    updateBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Blog', id }],
    }),

    // 🔹 Delete Blog
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blog'],
    }),
  }),
})

export const {
  useCreateBlogMutation,
  useGetAllBlogsQuery,
  useGetSingleBlogQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogsApi
