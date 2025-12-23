import React from 'react'
import Sidebar from '../admin/components/Sidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
