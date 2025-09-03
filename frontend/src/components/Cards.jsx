import React from 'react'

const Cards = () => {
  const cards = [
    {
      id: 1,
      image: 'https://picsum.photos/id/1015/400/300',
      title: 'Port',
      price: 5,
    },
    {
      id: 2,
      image: 'https://picsum.photos/id/1016/400/300',
      title: 'Lamp',
      price: 10,
    },
    {
      id: 3,
      image: 'https://picsum.photos/id/1018/400/300',
      title: 'Chair',
      price: 15,
    },
  ]

  return (
    <div className="max-w-6xl mx-auto  py-5">
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
