import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from '../../utils/baseUrl.js'

export const bannerImgApi = createApi({
  reducerPath: 'carouselApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/v1/bannerImg`,
    credentials: 'include',
  }),
  tagTypes: ['Carousel'],
  endpoints: (builder) => ({
    getCarousels: builder.query({
      query: () => '/',
      providesTags: ['Carousel'],
    }),

    addCarousel: builder.mutation({
      query: (formData) => ({
        url: '/',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Carousel'],
    }),

    deleteCarousel: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Carousel'],
    }),
  }),
})

export const {
  useGetCarouselsQuery,
  useAddCarouselMutation,
  useDeleteCarouselMutation,
} = bannerImgApi
