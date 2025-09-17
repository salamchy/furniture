import React from 'react'
import { FiClock, FiCreditCard, FiRefreshCcw } from 'react-icons/fi'
import { MdOutlineShoppingCart } from 'react-icons/md'

const Features = () => {
  const features = [
    {
      icon: <FiClock size={36} />,
      title: 'Shop online',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat dolor odio odio.',
    },
    {
      icon: <MdOutlineShoppingCart size={36} />,
      title: 'Free shipping',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat dolor odio odio.',
    },
    {
      icon: <FiRefreshCcw size={36} />,
      title: 'Return policy',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat dolor odio odio.',
    },
    {
      icon: <FiCreditCard size={36} />,
      title: 'Payment',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat dolor odio odio.',
    },
  ]

  return (
    <div className="w-full py-12 px-10 lg:px-30">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center lg:items-start text-gray-700"
          >
            {/* Icon + Title in same row */}
            <div className="flex items-center gap-3 mb-2">
              <span className="text-black">{feature.icon}</span>
              <h3 className="font-bold text-lg">{feature.title}</h3>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-500 leading-relaxed text-center lg:text-left">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Features
