import React from 'react'
import Cover from '../assets/cover.png'

const CoverImg = () => {
  return (
    <div className="relative w-full h-[500px] md:h-[400px] sm:h-[300px]">
      {/* Background Image */}
      <img
        src={Cover}
        alt="cover image"
        className="w-full h-full object-cover"
      />

      {/* Overlay Text */}
      <div className="absolute inset-0 flex items-center justify-end px-8 sm:px-4">
        <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-sm md:max-w-md text-right drop-shadow-lg">
          Discover amazing destinations around the world. From the peaceful
          mountains to sunny beaches, explore adventures that inspire and
          memories that last a lifetime.
        </p>
      </div>
    </div>
  )
}

export default CoverImg
