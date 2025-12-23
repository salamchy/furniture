// components/CartPage.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
  selectCartItems,
  selectCartTotal,
  selectCartItemsCount,
} from '../features/cart/cartSlice'
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaShoppingBag,
  FaArrowLeft,
  FaCreditCard,
  FaLock,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaExclamationTriangle,
} from 'react-icons/fa'
import { toast } from 'react-toastify'

const Cart = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)
  const cartItemsCount = useSelector(selectCartItemsCount)

  // Safe calculations with fallbacks
  const shippingFee = cartTotal > 50 ? 0 : 25.0
  const taxRate = 0.08
  const tax = (cartTotal || 0) * taxRate
  const total = (cartTotal || 0) + shippingFee + tax

  // Debug log to check state
  React.useEffect(() => {
    console.log('Cart State:', { cartItems, cartTotal, cartItemsCount })
  }, [cartItems, cartTotal, cartItemsCount])

  // Cart actions
  const handleIncrement = (itemId) => {
    dispatch(incrementQuantity(itemId))
  }

  const handleDecrement = (itemId) => {
    dispatch(decrementQuantity(itemId))
  }

  const handleRemoveItem = (itemId, productName) => {
    dispatch(removeFromCart(itemId))
    toast.success(`${productName} removed from cart!`)
  }

  const handleClearCart = () => {
    if (cartItems.length > 0) {
      dispatch(clearCart())
      toast.success('Cart cleared successfully!')
    }
  }

  const handleCheckout = () => {
    toast.info('Proceeding to checkout...')
  }

  // Show loading state while cart is being initialized
  if (cartItems === undefined) {
    return (
      <div className="min-h-screen mt-16 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading cart...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen mt-16 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-8 transition duration-200"
          >
            <FaArrowLeft className="text-sm" />
            Continue Shopping
          </Link>

          {/* Empty Cart */}
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaShoppingBag className="text-3xl text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start
              shopping to discover amazing products!
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition duration-200 shadow-lg hover:shadow-xl"
            >
              <FaShoppingBag className="text-sm" />
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen mt-16 bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Shopping Cart
            </h1>
            <p className="text-gray-600">
              {cartItemsCount} item{cartItemsCount !== 1 ? 's' : ''} in your
              cart
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition duration-200"
          >
            <FaArrowLeft className="text-sm" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* Cart Header */}
              <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Cart Items
                  </h2>
                  <button
                    onClick={handleClearCart}
                    className="text-red-600 hover:text-red-700 text-sm font-medium transition duration-200"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 rounded-lg object-cover"
                          onError={(e) => {
                            e.target.src =
                              'https://via.placeholder.com/100x100?text=Product+Image'
                          }}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <div>
                            <Link to={`/product/${item.productId}`}>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-indigo-600 transition duration-200">
                                {item.name}
                              </h3>
                            </Link>
                            <p className="text-gray-600 text-sm capitalize mb-2">
                              {item.category}
                            </p>
                            <p className="text-lg font-bold text-indigo-600">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => handleDecrement(item.id)}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition duration-200"
                              >
                                <FaMinus className="text-xs text-gray-600" />
                              </button>

                              <span className="w-12 text-center font-medium text-gray-900">
                                {item.quantity}
                              </span>

                              <button
                                onClick={() => handleIncrement(item.id)}
                                disabled={item.quantity >= item.stock}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                              >
                                <FaPlus className="text-xs text-gray-600" />
                              </button>
                            </div>

                            {/* Stock Info */}
                            <p
                              className={`text-xs ${
                                item.stock > 10
                                  ? 'text-green-600'
                                  : item.stock > 0
                                  ? 'text-yellow-600'
                                  : 'text-red-600'
                              }`}
                            >
                              {item.stock > 10
                                ? 'In Stock'
                                : item.stock > 0
                                ? `Only ${item.stock} left`
                                : 'Out of Stock'}
                            </p>
                          </div>
                        </div>

                        {/* Item Total and Remove */}
                        <div className="flex justify-between items-center mt-4">
                          <p className="text-gray-700 font-medium">
                            Total:{' '}
                            <span className="text-indigo-600">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </p>
                          <button
                            onClick={() => handleRemoveItem(item.id, item.name)}
                            className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition duration-200"
                            title="Remove item"
                          >
                            <FaTrash className="text-sm" />
                          </button>
                        </div>

                        {/* Low Stock Warning */}
                        {item.stock > 0 && item.stock <= 5 && (
                          <div className="mt-2 flex items-center gap-2 text-yellow-600 text-sm">
                            <FaExclamationTriangle className="text-xs" />
                            Low stock - order soon!
                          </div>
                        )}

                        {/* Out of Stock Warning */}
                        {item.stock === 0 && (
                          <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                            <FaExclamationTriangle className="text-xs" />
                            Out of stock - remove from cart
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
                <FaTruck className="text-green-600 text-xl mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">
                  {cartTotal > 50 ? 'Free Shipping' : 'Standard Shipping'}
                </p>
                <p className="text-xs text-gray-600">
                  {cartTotal > 50
                    ? 'Applied to your order'
                    : '$25 on orders under $50'}
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
                <FaUndo className="text-blue-600 text-xl mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">
                  Easy Returns
                </p>
                <p className="text-xs text-gray-600">30-day return policy</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
                <FaShieldAlt className="text-purple-600 text-xl mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">
                  Secure Payment
                </p>
                <p className="text-xs text-gray-600">Your data is safe</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItemsCount} items)</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shippingFee === 0 ? 'text-green-600' : ''}>
                    {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                {/* Free Shipping Progress */}
                {cartTotal < 50 && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex justify-between text-sm text-blue-800 mb-2">
                      <span>Free shipping on orders over $50</span>
                      <span>${(50 - cartTotal).toFixed(2)} to go</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min((cartTotal / 50) * 100, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  />
                  <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200 text-sm">
                    Apply
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 mb-4"
              >
                <FaLock className="text-sm" />
                Proceed to Checkout
              </button>

              {/* Secure Payment Info */}
              <div className="text-center">
                <div className="flex justify-center gap-3 mb-2">
                  <FaCreditCard className="text-gray-400" />
                  <FaCreditCard className="text-gray-400" />
                  <FaCreditCard className="text-gray-400" />
                </div>
                <p className="text-xs text-gray-600">
                  Your payment is secure and encrypted
                </p>
              </div>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <FaTruck className="text-green-600" />
                    Free shipping on orders over $50
                  </p>
                  <p className="flex items-center gap-2">
                    <FaUndo className="text-blue-600" />
                    30-day money-back guarantee
                  </p>
                  <p className="flex items-center gap-2">
                    <FaShieldAlt className="text-purple-600" />
                    24/7 customer support
                  </p>
                </div>
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Need More Items?
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Continue shopping to discover more amazing products for your
                home.
              </p>
              <Link
                to="/shop"
                className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center gap-2"
              >
                <FaShoppingBag className="text-sm" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Recently Viewed (Optional) */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* You can map through related products here */}
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                <FaShoppingBag className="text-2xl text-gray-400" />
              </div>
              <p className="font-medium text-gray-900 mb-1">Modern Plant Pot</p>
              <p className="text-indigo-600 font-semibold">$49.99</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                <FaShoppingBag className="text-2xl text-gray-400" />
              </div>
              <p className="font-medium text-gray-900 mb-1">Wooden Bookshelf</p>
              <p className="text-indigo-600 font-semibold">$179.99</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                <FaShoppingBag className="text-2xl text-gray-400" />
              </div>
              <p className="font-medium text-gray-900 mb-1">Desk Organizer</p>
              <p className="text-indigo-600 font-semibold">$29.99</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                <FaShoppingBag className="text-2xl text-gray-400" />
              </div>
              <p className="font-medium text-gray-900 mb-1">Floor Lamp</p>
              <p className="text-indigo-600 font-semibold">$89.99</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
