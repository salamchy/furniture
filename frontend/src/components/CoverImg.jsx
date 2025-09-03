import React from 'react'
import Cover from '../assets/cover.png'

const CoverImg = () => {
  return (
    <div className="relative w-full h-[500px]">
      {/* Background Image */}
      <img
        src={Cover}
        alt="cover image"
        className="w-full h-auto object-cover"
      />

      {/* Overlay Text (top-right) */}
      <div className="absolute inset-0 flex items-center justify-end px-6">
        <p className="text-white text-lg md:text-xl max-w-md text-right drop-shadow-lg">
          Discover amazing destinations around the world. From the peaceful
          mountains to sunny beaches, explore adventures that inspire and
          memories that last a lifetime.
        </p>
      </div>
    </div>
  )
}

export default CoverImg
