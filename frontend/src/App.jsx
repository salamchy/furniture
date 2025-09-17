import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Layout from './components/Layout'
import Shop from './pages/Shop'
import AboutUs from './pages/AboutUs'
import Blog from './pages/Blog'

const App = () => {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/shop', element: <Shop /> },
        { path: '/about', element: <AboutUs /> },
        { path: '/blog', element: <Blog /> },
      ],
    },
  ])
  return <RouterProvider router={router} />
}

export default App
