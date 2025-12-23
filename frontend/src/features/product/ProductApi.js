import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from '../../utils/baseUrl.js'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/v1/products`,
    credentials: 'include',
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/',
      providesTags: ['Product'],
    }),
    getProductById: builder.query({
      query: (id) => `/${id}`,
      providesTags: ['Product'],
    }),
    addProduct: builder.mutation({
      query: (formData) => ({
        url: '/',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Product'],
    }),
    editProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
    purchaseProduct: builder.mutation({
      query: (id) => ({
        url: `/${id}/purchase`,
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  usePurchaseProductMutation,
} = productApi
