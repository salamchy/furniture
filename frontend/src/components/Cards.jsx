import React from 'react'
import Port from '../assets/Rectangle6.png'
import Lamp from '../assets/Rectangle7.png'
import Chair from '../assets/Rectangle5.png'

const Cards = () => {
  const cards = [
    {
      id: 1,
      image: Port,
      title: 'Port',
      price: 5,
    },
    {
      id: 2,
      image: Lamp,
      title: 'Lamp',
      price: 10,
    },
    {
      id: 3,
      image: Chair,
      title: 'Chair',
      price: 15,
    },
  ]

  return (
    <div className="max-w-8xl mx-5 md:mx-10  lg:mx-30   py-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {cards.map((card) => (
          <div key={card.id} className="bg-white  overflow-hidden">
            {/* Image */}
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-[500px] object-cover"
            />

            {/* Content */}
            <div className="py-4 flex flex-col items-center justify-center">
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="text-gray-600 mt-1">${card.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cards
