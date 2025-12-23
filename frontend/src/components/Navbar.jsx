import React, { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { IoSearchOutline } from 'react-icons/io5'
import { FaTimes, FaBars } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../features/auth/authSlice'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state) => state.auth.user)

  // ✅ ALTERNATIVE METHOD: Access cart items directly from state
  const cartItems = useSelector((state) => state.cart?.items || [])
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleLogout = () => {
    dispatch(logOut())
    navigate('/')
  }

  const navLinkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-md text-md font-medium transition duration-300 cursor-pointer ${
      isActive ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
    }`

  const mobileNavLinkClasses = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${
      isActive ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
    }`

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-[#2B2B2B] font-primary">
              Soudemy
            </span>
          </div>

          {/* Desktop navigation links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={navLinkClasses}>
              HOME
            </NavLink>
            <NavLink to="/shop" className={navLinkClasses}>
              SHOP
            </NavLink>
            <NavLink to="/about" className={navLinkClasses}>
              ABOUT US
            </NavLink>
            <NavLink to="/blog" className={navLinkClasses}>
              BLOG
            </NavLink>
          </div>

          {/* Desktop icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-indigo-600 p-2 rounded-full hover:bg-gray-100 transition duration-300 cursor-pointer">
              <IoSearchOutline size={22} />
            </button>

            {/* Cart Icon with Badge */}
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-indigo-600 p-2 rounded-full hover:bg-gray-100 transition duration-300 cursor-pointer"
            >
              <MdOutlineShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Login / Logout */}
            {user ? (
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-gray-100 transition duration-300 text-md cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-gray-700 hover:text-indigo-600 p-2 rounded-full hover:bg-gray-100 transition duration-300 text-md cursor-pointer"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none p-2 rounded-md"
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-3 px-2 pt-2 pb-3">
              <NavLink to="/" className={mobileNavLinkClasses}>
                HOME
              </NavLink>
              <NavLink to="/shop" className={mobileNavLinkClasses}>
                SHOP
              </NavLink>
              <NavLink to="/about" className={mobileNavLinkClasses}>
                ABOUT US
              </NavLink>
              <NavLink to="/blog" className={mobileNavLinkClasses}>
                BLOG
              </NavLink>
            </div>

            {/* Mobile Icons */}
            <div className="flex justify-center space-x-4 px-2 pt-4 pb-3 border-t border-gray-200">
              <button className="text-gray-700 hover:text-indigo-600 p-2 rounded-full hover:bg-gray-100 transition duration-300">
                <IoSearchOutline size={22} />
              </button>

              {/* Cart Icon with Badge */}
              <Link
                to="/cart"
                className="relative text-gray-700 hover:text-indigo-600 p-2 rounded-full hover:bg-gray-100 transition duration-300"
              >
                <MdOutlineShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Login / Logout */}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-gray-100 transition duration-300 text-md cursor-pointer"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-indigo-600 p-2 rounded-full hover:bg-gray-100 transition duration-300 text-md cursor-pointer"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
