import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from '../../utils/baseUrl.js'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/v1/users`,
    credentials: 'include',
  }),

  tagTypes: ['User'],

  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: '/register',
        method: 'POST',
        body: newUser,
      }),
    }),

    loginUser: builder.mutation({
      query: (loginData) => ({
        url: '/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: loginData,
      }),
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/:${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
})

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useDeleteUserMutation,
} = authApi
