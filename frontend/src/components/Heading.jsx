import React from 'react'

const Heading = ({ title, subtitle }) => {
  return (
    <div className="w-full flex items-center justify-center py-10">
      <div className="text-center px-4">
        <h1 className="text-xl font-primary uppercase  sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary text-[#373737]  my-2">
          {title}
        </h1>
        <p className="font-primary  text-[10px] sm:text-base md:text-lg leading-tight  text-[#8A8A8A] w-2xl">
          {subtitle}
        </p>
      </div>
    </div>
  )
}

export default Heading
