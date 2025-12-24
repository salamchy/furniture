import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../features/auth/authApi.js'
import authReducer from '../features/auth/authSlice.js'
import { productApi } from '../features/product/productApi.js'
import { bannerImgApi } from '../features/bannerImg/bannerImgApi.js'
import { blogsApi } from '../features/blogs/blogsApi.js'
import cartReducer from '../features/cart/cartSlice.js'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    cart: cartReducer,
    [productApi.reducerPath]: productApi.reducer,
    [bannerImgApi.reducerPath]: bannerImgApi.reducer,
    [blogsApi.reducerPath]: blogsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productApi.middleware,
      bannerImgApi.middleware,
      blogsApi.middleware
    ),
})
export default store
