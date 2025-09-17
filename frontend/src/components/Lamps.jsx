import React from 'react'
import LampImg from '../assets/lamp1.png'

const Lamps = () => {
  return (
    <div className="m-8 md:m-14 flex flex-col md:flex-row w-auto h-auto md:h-[500px] bg-white my-10">
      {/* Left Side (Text Area) */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 md:p-16">
        <div className="max-w-md mx-auto md:mx-0 text-left">
          <h2 className="text-4xl md:text-3xl font-bold mb-4 font-primary uppercase">
            contemporary lamps
          </h2>
          <p className="text-gray-600 mb-6 font-primary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat
            dolor odio odio malesuada at condimentum adipiscing iaculis semper.
          </p>
          <button className="border border-gray-700 px-6 py-2 flex items-center gap-2 hover:bg-gray-100 transition">
            View more <span>→</span>
          </button>
        </div>
      </div>

      {/* Right Side (Image Area) */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6">
        <img
          src={LampImg}
          alt="Lamp"
          className="w-full h-auto object-cover rounded-lg max-w-lg"
        />
      </div>
    </div>
  )
}

export default Lamps
