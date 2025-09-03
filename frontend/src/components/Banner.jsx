
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const BannerCarousel = () => {
  const banners = [
    {
      id: 1,
      image: "https://picsum.photos/id/1015/1200/500",
      heading: "Explore the Mountains",
      description: "Experience breathtaking views and adventures in the Himalayas.",
    },
    {
      id: 2,
      image: "https://picsum.photos/id/1016/1200/500",
      heading: "Relax by the Beach",
      description: "Feel the waves and enjoy the serene coastal vibes.",
    },
    {
      id: 3,
      image: "https://picsum.photos/id/1018/1200/500",
      heading: "Discover the Forests",
      description: "Reconnect with nature and enjoy the tranquility of green forests.",
    },
  ];

  return (
    <div className="w-full max-w-9xl mx-auto  overflow-hidden shadow-xl pt-16">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
        transitionTime={800}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="relative">
            {/* Banner Image */}
            <img
              src={banner.image}
              alt={banner.heading}
              className="object-cover w-full h-[600px]"
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
                {banner.heading}
              </h2>
              <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl">
                {banner.description}
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
