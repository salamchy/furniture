import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useGetCarouselsQuery } from '../features/bannerImg/BannerImgApi'
import { FaSpinner, FaImage, FaExclamationTriangle } from 'react-icons/fa'

const BannerCarousel = () => {
  const { data: response, isLoading, error } = useGetCarouselsQuery()

  const banners = response?.bannerImg || response || []

  // Show loading state
  if (isLoading) {
    return (
      <div className="w-full max-w-9xl mx-auto overflow-hidden shadow-xl pt-16">
        <div className="w-full h-[650px] bg-gray-200 flex items-center justify-center">
          <div className="text-center">
            <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Loading carousel...</p>
          </div>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="w-full max-w-9xl mx-auto overflow-hidden shadow-xl pt-16">
        <div className="w-full h-[650px] bg-gray-200 flex items-center justify-center">
          <div className="text-center">
            <FaExclamationTriangle className="text-4xl text-red-500 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Failed to load carousel</p>
            <p className="text-gray-500 text-sm">
              {error?.data?.error || 'Please try again later'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Show empty state if no banners from backend
  if (banners.length === 0) {
    return (
      <div className="w-full max-w-9xl mx-auto overflow-hidden shadow-xl pt-16">
        <div className="w-full h-[650px] bg-gray-200 flex items-center justify-center">
          <div className="text-center">
            <FaImage className="text-4xl text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              No carousel images available
            </p>
            <p className="text-gray-500 text-sm">
              Please add images from admin panel
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-9xl mx-auto overflow-hidden shadow-xl pt-16">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        transitionTime={800}
        showArrows={true}
        stopOnHover={true}
        swipeable={true}
        dynamicHeight={false}
        emulateTouch={true}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center transition duration-200 shadow-lg"
            >
              ‹
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center transition duration-200 shadow-lg"
            >
              ›
            </button>
          )
        }
      >
        {banners.map((banner, index) => (
          <div key={banner._id || index} className="relative">
            {/* Banner Image from backend */}
            <img
              src={banner.imageUrl}
              alt={banner.title || `Banner ${index + 1}`}
              className="object-cover w-full h-[650px]"
              onError={(e) => {
                // Fallback if image fails to load
                e.target.src = `https://via.placeholder.com/1200x600/6366F1/FFFFFF?text=Image+${
                  index + 1
                }`
              }}
            />

            {/* Overlay Content - Only show if there's title or description from backend */}
            {(banner.title || banner.description) && (
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
                {banner.title && (
                  <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
                    {banner.title}
                  </h2>
                )}
                {banner.description && (
                  <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
                    {banner.description}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default BannerCarousel
