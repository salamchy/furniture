import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { IoSearchOutline } from 'react-icons/io5'
import { FaTimes } from 'react-icons/fa'
import { FaBars } from 'react-icons/fa6'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

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
            <NavLink
              to="/"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-md font-medium transition duration-300 cursor-pointer"
            >
              HOME
            </NavLink>
            <NavLink
              to="/shop"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-md font-medium transition duration-300 cursor-pointer"
            >
              SHOP
            </NavLink>
            <NavLink
              to="/about"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-md font-medium transition duration-300 cursor-pointer"
            >
              ABOUT US
            </NavLink>
            <NavLink
              to="/blog"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-md font-medium transition duration-300 cursor-pointer"
            >
              BLOG
            </NavLink>
          </div>

          {/* Desktop icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-indigo-600 p-2 rounded-full hover:bg-gray-100 transition duration-300 cursor-pointer">
              <IoSearchOutline size={22} />
            </button>
            <button className="text-gray-700 hover:text-indigo-600 p-2 rounded-full hover:bg-gray-100 transition duration-300 cursor-pointer">
              <MdOutlineShoppingCart size={22} />
            </button>
            <button className="text-gray-700 hover:text-indigo-600 p-2 rounded-full hover:bg-gray-100 transition duration-300 text-md cursor-pointer">
              Login
            </button>
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
              <NavLink
                to="/"
                className="text-gray-700  block px-3 py-2 rounded-md text-base font-medium transition duration-300"
              >
                HOME
              </NavLink>
              <NavLink
                to="/shop"
                className="text-gray-700  block px-3 py-2 rounded-md text-base font-medium transition duration-300"
              >
                SHOP
              </NavLink>
              <NavLink
                to="/about"
                className="text-gray-700  block px-3 py-2 rounded-md text-base font-medium transition duration-300"
              >
                ABOUT Us
              </NavLink>
              <NavLink
                to="/"
                className="text-gray-700  block px-3 py-2 rounded-md text-base font-medium transition duration-300"
              >
                BLOG
              </NavLink>
            </div>
            <div className="flex justify-center space-x-4 px-2 pt-4 pb-3 border-t border-gray-200">
              <button className="text-gray-700 hover:text-indigo-600 p-2 rounded-full hover:bg-gray-100 transition duration-300">
                <IoSearchOutline size={22} />
              </button>
              <button className="text-gray-700 hover:text-indigo-600 p-2 rounded-full hover:bg-gray-100 transition duration-300">
                <MdOutlineShoppingCart size={22} />
              </button>
              <button className="text-gray-700 hover:text-indigo-600 p-2 rounded-full hover:bg-gray-100 transition duration-300">
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
