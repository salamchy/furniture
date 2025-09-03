import React from 'react'
import Navbar from '../components/Navbar'
import BannerCarousel from '../components/Banner'
import ProductOfTheWeek from '../components/ProductOfTheWeek'
import CoverImg from '../components/CoverImg'

const Home = () => {
  return (
    <div>
      <Navbar />
      <BannerCarousel />
      <ProductOfTheWeek />
      <CoverImg />
    </div>
  )
}

export default Home
