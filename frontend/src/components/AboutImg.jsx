import React from 'react'
import AboutUsImg from '../assets/about.png'

const AboutImg = () => {
  return (
    <div className="w-full relative mt-16 px-30 mb-10">
      {/* Background Image */}
      <img
        src={AboutUsImg}
        alt="About Us"
        className="w-full h-auto object-cover"
      />

      {/* Overlay heading */}
      <h2 className="absolute inset-0 flex items-center justify-center text-3xl md:text-5xl font-bold text-[#3F3F3F] drop-shadow-lg">
        About Us
      </h2>
    </div>
  )
}

export default AboutImg
