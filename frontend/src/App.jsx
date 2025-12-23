import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Layout from './components/Layout'
import Shop from './pages/Shop'
import AboutUs from './pages/AboutUs'
import Blog from './pages/Blog'
import Login from './components/Login.jsx'
import Register from './components/Register'
import AdminLayout from './admin/AdminLayout'
import Dashboard from './admin/Pages/Dashboard'
import Products from './admin/Pages/Products'
import Banner from './admin/Pages/Banner'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Blogs from './admin/Pages/Blogs'
import Setting from './admin/Pages/Setting'
import BlogDetail from './pages/BlogDetail'

const App = () => {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/shop', element: <Shop /> },
        { path: '/product/:id', element: <ProductDetails /> },
        { path: '/about', element: <AboutUs /> },
        { path: '/blogs/:id', element: <BlogDetail /> },
        { path: '/blog', element: <Blog /> },
        { path: '/cart', element: <Cart /> },
      ],
    },
    {
      element: <AdminLayout />,
      children: [
        { path: '/dashboard', element: <Dashboard /> },
        { path: '/banner', element: <Banner /> },
        { path: '/shop', element: <Shop /> },
        { path: '/products', element: <Products /> },
        { path: '/blogs', element: <Blogs /> },
        { path: '/setting', element: <Setting /> },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
  ])
  return <RouterProvider router={router} />
}

export default App
