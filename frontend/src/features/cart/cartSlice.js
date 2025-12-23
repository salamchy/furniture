import { createSlice } from '@reduxjs/toolkit'

// Load cart from localStorage safely
const loadCartFromStorage = () => {
  try {
    if (typeof window !== 'undefined') {
      const cartData = localStorage.getItem('cart')
      return cartData ? JSON.parse(cartData) : []
    }
    return []
  } catch (error) {
    console.error('Error loading cart from localStorage:', error)
    return []
  }
}

const initialState = {
  items: loadCartFromStorage(),
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload

      // Ensure state.items exists
      if (!state.items) {
        state.items = []
      }

      const existingItem = state.items.find(
        (item) => item.productId === product._id
      )

      if (existingItem) {
        existingItem.quantity += quantity
        if (existingItem.quantity > product.stock) {
          existingItem.quantity = product.stock
        }
      } else {
        state.items.push({
          id: Date.now().toString(),
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          image: product.imageUrl,
          category: product.category,
          stock: product.stock || 10,
        })
      }

      // Save to localStorage safely
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('cart', JSON.stringify(state.items))
        }
      } catch (error) {
        console.error('Error saving cart to localStorage:', error)
      }
    },

    removeFromCart: (state, action) => {
      if (!state.items) return

      const itemId = action.payload
      state.items = state.items.filter((item) => item.id !== itemId)

      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('cart', JSON.stringify(state.items))
        }
      } catch (error) {
        console.error('Error saving cart to localStorage:', error)
      }
    },

    updateQuantity: (state, action) => {
      if (!state.items) return

      const { itemId, quantity } = action.payload
      const item = state.items.find((item) => item.id === itemId)

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== itemId)
        } else if (quantity <= item.stock) {
          item.quantity = quantity
        } else {
          item.quantity = item.stock
        }
      }

      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('cart', JSON.stringify(state.items))
        }
      } catch (error) {
        console.error('Error saving cart to localStorage:', error)
      }
    },

    clearCart: (state) => {
      state.items = []
      try {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('cart')
        }
      } catch (error) {
        console.error('Error clearing cart from localStorage:', error)
      }
    },

    incrementQuantity: (state, action) => {
      if (!state.items) return

      const itemId = action.payload
      const item = state.items.find((item) => item.id === itemId)

      if (item && item.quantity < item.stock) {
        item.quantity += 1
        try {
          if (typeof window !== 'undefined') {
            localStorage.setItem('cart', JSON.stringify(state.items))
          }
        } catch (error) {
          console.error('Error saving cart to localStorage:', error)
        }
      }
    },

    decrementQuantity: (state, action) => {
      if (!state.items) return

      const itemId = action.payload
      const item = state.items.find((item) => item.id === itemId)

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1
        } else {
          state.items = state.items.filter((item) => item.id !== itemId)
        }
        try {
          if (typeof window !== 'undefined') {
            localStorage.setItem('cart', JSON.stringify(state.items))
          }
        } catch (error) {
          console.error('Error saving cart to localStorage:', error)
        }
      }
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions

export default cartSlice.reducer

// Safe selectors with fallbacks
export const selectCartItems = (state) => state.cart?.items || []
export const selectCartTotal = (state) =>
  (state.cart?.items || []).reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
export const selectCartItemsCount = (state) =>
  (state.cart?.items || []).reduce((count, item) => count + item.quantity, 0)
export const selectCartItemById = (productId) => (state) =>
  (state.cart?.items || []).find((item) => item.productId === productId)
