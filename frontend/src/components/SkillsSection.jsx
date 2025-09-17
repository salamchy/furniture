import React from 'react'

const SkillsSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      {/* Left Content */}
      <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug">
          Functionality <br /> meets perfection
        </h2>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          massa libero, mattis volutpat id. Egestas adipiscing placerat eleifend
          a nascetur. Mattis proin enim, nam porttitor vitae.
        </p>
      </div>

      {/* Right Content (Progress bars) */}
      <div className="space-y-6">
        {/* Progress Item */}
        <div>
          <div className="flex justify-between text-sm font-bold mb-2 ">
            <span>Creativity</span>
            <span>72%</span>
          </div>
          <div className="w-full bg-gray-200 h-[5px]">
            <div className="bg-gray-800 h-[5px]" style={{ width: '72%' }}></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm font-bold mb-2">
            <span>Advertising</span>
            <span>84%</span>
          </div>
          <div className="w-full bg-gray-200 h-[5px]">
            <div className="bg-gray-800 h-[5px]" style={{ width: '84%' }}></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm font-bold mb-2">
            <span>Design</span>
            <span>72%</span>
          </div>
          <div className="w-full bg-gray-200 h-[5px]">
            <div className="bg-gray-800 h-[5px]" style={{ width: '72%' }}></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
