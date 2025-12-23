import React, { useState } from 'react'
import {
  FaUser,
  FaLock,
  FaGoogle,
  FaFacebook,
  FaTwitter,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginUserMutation } from '../features/auth/authApi.js'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { setUser } from '../features/auth/authSlice.js'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loginUser, { isLoading }] = useLoginUserMutation()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic client-side validation
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields', {
        position: 'top-right',
        autoClose: 3000,
      })
      return
    }

    try {
      const res = await loginUser(formData).unwrap()
      console.log('✅ Login success:', res)

      // Save user in Redux and localStorage via the auth slice
      dispatch(
        setUser({
          user: res.user,
          token: res.token,
        })
      )

      // Store token separately if your auth slice doesn't handle it
      if (res.token) {
        localStorage.setItem('token', res.token)
      }

      toast.success(res.message || 'Login Successful! 🎉', {
        position: 'top-right',
        autoClose: 3000,
      })

      // Redirect based on role or default route
      const user = res.user
      if (user?.role === 'admin') {
        navigate('/dashboard')
      } else {
        navigate('/')
      }
    } catch (err) {
      console.error('❌ Login failed:', err)

      // Enhanced error handling
      const errorMessage =
        err?.data?.error ||
        err?.data?.message ||
        err?.error ||
        'Login Failed. Please try again.'

      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 3000,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-blue-100 mt-2">Sign in to access your account</p>
        </div>

        {/* Login Form */}
        <div className="p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600 transition duration-200 cursor-pointer" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition duration-200 cursor-pointer" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded cursor-pointer"
                  disabled={isLoading}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500 transition duration-200"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Login Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button
                type="button"
                disabled={isLoading}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition duration-200 cursor-pointer"
              >
                <FaGoogle className="h-5 w-5 text-red-500" />
              </button>
              <button
                type="button"
                disabled={isLoading}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition duration-200 cursor-pointer"
              >
                <FaFacebook className="h-5 w-5 text-blue-600" />
              </button>
              <button
                type="button"
                disabled={isLoading}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition duration-200 cursor-pointer"
              >
                <FaTwitter className="h-5 w-5 text-blue-400" />
              </button>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-500 transition duration-200"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
