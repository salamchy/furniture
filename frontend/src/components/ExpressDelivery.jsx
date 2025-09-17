import React from 'react'

const ExpressDelivery = () => {
  return (
    <div className="h-[281px] w-full bg-[#EFEFEF] mb-10 px-10">
      <div className="flex justify-center items-center h-full gap-6">
        <p className="text-2xl font-medium">
          Order now for an{' '}
          <span className="font-semibold text-3xl">
            express delivery in 24h!
          </span>
        </p>
        <button className="border border-gray-700 px-6 py-2 flex items-center gap-2 hover:bg-gray-100 transition">
          View more <span>→</span>
        </button>
      </div>
    </div>
  )
}

export default ExpressDelivery
