import React, { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const testimonials = [
  {
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus vitae congue id ipsum sed neque et dui accumsan. Nibh semper magna facilisi ridiculus luctus amet.',
    name: 'Soroush Norozy',
    role: 'Designer',
  },
  {
    quote:
      'Aliquam erat volutpat. Suspendisse potenti. Integer pretium purus id ligula aliquet, vel sagittis justo fermentum.',
    name: 'Ava Smith',
    role: 'Developer',
  },
  {
    quote:
      'Curabitur feugiat magna et lectus pulvinar, ac dapibus justo vulputate. Ut eget est quis nisl sollicitudin malesuada.',
    name: 'John Doe',
    role: 'Manager',
  },
]

const Testimonials = () => {
  const [selected, setSelected] = useState(0)
  const len = testimonials.length

  const prev = () => setSelected((s) => (s - 1 + len) % len)
  const next = () => setSelected((s) => (s + 1) % len)

  return (
    <div className="bg-gray-100 py-16">
      {/* Outer wrapper: relative so arrows can be absolutely positioned;
          overflow-visible ensures buttons outside box are not clipped */}
      <div className="relative max-w-5xl mx-auto overflow-visible px-4 sm:px-8">
        {/* Left arrow (responsive offsets) */}
        <button
          aria-label="Previous testimonial"
          onClick={prev}
          className="
            absolute
            left-2 sm:-left-10 md:-left-16 lg:-left-24
            top-1/2 -translate-y-1/2 z-50
            bg-white shadow-md p-2.5 sm:p-3 rounded-full
            hover:bg-gray-200 transition
            focus:outline-none
          "
        >
          <FaChevronLeft className="text-gray-700 text-lg sm:text-xl" />
        </button>

        {/* Carousel container (centered content area) */}
        <div className="mx-auto max-w-3xl">
          <Carousel
            selectedItem={selected}
            onChange={(index) => setSelected(index)}
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            showArrows={false} // hide built-in arrows (we use external ones)
            infiniteLoop
            autoPlay
            interval={4000}
            transitionTime={800}
            swipeable
            emulateTouch
            className=""
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center px-6"
              >
                <div className="text-4xl text-gray-700 mb-4">❞</div>
                <p className="text-gray-500 text-lg leading-relaxed max-w-xl mb-6">
                  {t.quote}
                </p>
                <h3 className="font-bold text-lg text-gray-900">{t.name}</h3>
                <span className="text-sm text-gray-600">{t.role}</span>
              </div>
            ))}
          </Carousel>
        </div>

        {/* Right arrow (responsive offsets) */}
        <button
          aria-label="Next testimonial"
          onClick={next}
          className="
            absolute
            right-2 sm:-right-10 md:-right-16 lg:-right-24
            top-1/2 -translate-y-1/2 z-50
            bg-white shadow-md p-2.5 sm:p-3 rounded-full
            hover:bg-gray-200 transition
            focus:outline-none
          "
        >
          <FaChevronRight className="text-gray-700 text-lg sm:text-xl" />
        </button>
      </div>
    </div>
  )
}

export default Testimonials
