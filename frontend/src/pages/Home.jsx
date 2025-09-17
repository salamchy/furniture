import React from 'react'
import BannerCarousel from '../components/Banner'
import ProductOfTheWeek from '../components/ProductOfTheWeek'
import CoverImg from '../components/CoverImg'
import StylishChair from '../components/StylishChair'
import HomeTable from '../components/HomeTable'
import Lamps from '../components/Lamps'
import ExpressDelivery from '../components/ExpressDelivery'
import Features from '../components/Features'
import BlogCards from '../components/BlogCards'
import Testimonials from '../components/Testimonials'

const Home = () => {
  return (
    <div>
      <BannerCarousel />
      <ProductOfTheWeek />
      <CoverImg />
      <StylishChair />
      <HomeTable />
      <Lamps />
      <ExpressDelivery />
      <Features />
      <BlogCards />
      <Testimonials />
    </div>
  )
}

export default Home
