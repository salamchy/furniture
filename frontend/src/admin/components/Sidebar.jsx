import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaHome, FaCog, FaSignOutAlt, FaBars } from 'react-icons/fa'
import { BiLogoProductHunt } from 'react-icons/bi'
import { BsCardImage } from 'react-icons/bs'
import { FaBlogger } from 'react-icons/fa6'
import { useLogoutUserMutation } from '../../features/auth/authApi.js'
import { logOut } from '../../features/auth/authSlice'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [logoutUser] = useLogoutUserMutation()

  //Get user from Redux store
  const { user } = useSelector((state) => state.auth)

  const toggleSidebar = () => setIsOpen(!isOpen)

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap()
      // Dispatch logout action to clear Redux state and localStorage
      dispatch(logOut())
      navigate('/')
    } catch (error) {
      // Fallback: dispatch logout even if API call fails
      dispatch(logOut())
      navigate('/')
    }
  }

  const menuItems = [
    {
      name: 'Dashboard',
      icon: <FaHome />,
      path: '/dashboard',
      action: () => navigate('/dashboard'),
    },
    {
      name: 'Banner',
      icon: <BsCardImage />,
      path: '/banner',
      action: () => navigate('/banner'),
    },
    {
      name: 'Products',
      icon: <BiLogoProductHunt />,
      path: '/products',
      action: () => navigate('/products'),
    },
    {
      name: 'Blogs',
      icon: <FaBlogger />,
      path: '/blogs',
      action: () => navigate('/blogs'),
    },
    {
      name: 'Setting',
      icon: <FaCog />,
      path: '/setting',
      action: () => navigate('/setting'),
    },
    {
      name: 'Logout',
      icon: <FaSignOutAlt />,
      action: handleLogout,
    },
  ]

  // Check if a menu item is active
  const isActive = (path) => {
    if (!path) return false
    return (
      location.pathname === path || location.pathname.startsWith(path + '/')
    )
  }

  return (
    <div className="flex">
      <div
        className={`bg-gray-800 text-white h-screen p-5 pt-8 relative duration-300 ${
          isOpen ? 'w-64' : 'w-20'
        }`}
      >
        <FaBars
          className="absolute top-4 right-4 cursor-pointer hover:text-blue-400 transition-colors"
          onClick={toggleSidebar}
        />

        <div className="flex items-center gap-x-4">
          <div className="text-2xl font-bold">Logo</div>
        </div>

        <ul className="pt-6">
          {menuItems.map((item, index) => {
            const active = isActive(item.path)
            return (
              <li
                key={index}
                onClick={item.action}
                className={`
                  flex items-center gap-x-4 p-3 rounded-lg mt-2 cursor-pointer
                  transition-all duration-200 group relative
                  ${
                    active
                      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                      : 'hover:bg-gray-700 hover:translate-x-1'
                  }
                `}
              >
                {active && (
                  <div className="absolute left-0 top-0 h-full w-1 bg-blue-400 rounded-l-lg"></div>
                )}

                <span
                  className={`
                  text-xl transition-transform duration-200
                  ${
                    active
                      ? 'text-white transform scale-110'
                      : 'text-gray-300 group-hover:text-white'
                  }
                `}
                >
                  {item.icon}
                </span>

                {isOpen && (
                  <span
                    className={`
                    text-md font-medium transition-all duration-200
                    ${
                      active
                        ? 'text-white font-semibold'
                        : 'text-gray-300 group-hover:text-white'
                    }
                  `}
                  >
                    {item.name}
                  </span>
                )}

                {!isOpen && (
                  <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                    {item.name}
                  </div>
                )}
              </li>
            )
          })}
        </ul>

        {/* User Info */}
        {isOpen && user && (
          <div className="mt-4 p-3 bg-gray-700 rounded-lg">
            <p className="text-sm font-medium">Welcome back,</p>
            <p className="text-lg font-semibold truncate">{user.username}</p>
            <p className="text-xs text-gray-300 truncate">{user.email}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
