import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/Appicon';
import Image from '../../../components/Appimage';
import {Button} from '../../../components/ui/Button';

const FeaturedDestinations = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const destinations = [
  {
    id: 1,
    name: "New York City",
    country: "United States",
    image: "https://images.unsplash.com/photo-1714099814092-113d986205da",
    imageAlt: "Manhattan skyline at sunset with Empire State Building and modern skyscrapers reflecting golden light",
    hotels: 1247,
    startingPrice: 189,
    description: "The city that never sleeps offers endless possibilities",
    highlights: ["Times Square", "Central Park", "Broadway Shows"]
  },
  {
    id: 2,
    name: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1470664997694-a3ae95e2eacb",
    imageAlt: "Eiffel Tower illuminated at night with Seine River and classic Parisian architecture in foreground",
    hotels: 892,
    startingPrice: 156,
    description: "Romance and elegance in the City of Light",
    highlights: ["Eiffel Tower", "Louvre Museum", "Champs-Élysées"]
  },
  {
    id: 3,
    name: "Tokyo",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1724837962088-7deca2f3f872",
    imageAlt: "Tokyo cityscape at dusk showing modern skyscrapers, neon lights, and busy streets with Mount Fuji in distance",
    hotels: 1156,
    startingPrice: 134,
    description: "Where ancient traditions meet cutting-edge innovation",
    highlights: ["Shibuya Crossing", "Senso-ji Temple", "Tokyo Skytree"]
  },
  {
    id: 4,
    name: "London",
    country: "United Kingdom",
    image: "https://images.unsplash.com/photo-1728401217198-043bedb44cb2",
    imageAlt: "London Bridge and Tower Bridge spanning Thames River with historic architecture and modern city skyline",
    hotels: 1034,
    startingPrice: 167,
    description: "Royal heritage meets modern sophistication",
    highlights: ["Big Ben", "Buckingham Palace", "London Eye"]
  },
  {
    id: 5,
    name: "Dubai",
    country: "UAE",
    image: "https://images.unsplash.com/photo-1667389411830-7116ed6d590d",
    imageAlt: "Dubai skyline featuring Burj Khalifa and modern skyscrapers against desert landscape at golden hour",
    hotels: 678,
    startingPrice: 198,
    description: "Luxury and innovation in the desert metropolis",
    highlights: ["Burj Khalifa", "Dubai Mall", "Palm Jumeirah"]
  },
  {
    id: 6,
    name: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1629732316015-0310c987ae0f",
    imageAlt: "Tropical Bali beach with crystal clear turquoise water, white sand, and lush green palm trees swaying in breeze",
    hotels: 543,
    startingPrice: 89,
    description: "Tropical paradise with rich cultural heritage",
    highlights: ["Ubud Rice Terraces", "Tanah Lot Temple", "Seminyak Beach"]
  }];


  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(destinations?.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleDestinationClick = (destination) => {
    navigate('/search-results', {
      state: {
        destination: `${destination?.name}, ${destination?.country}`,
        checkIn: new Date()?.toISOString()?.split('T')?.[0],
        checkOut: new Date(Date.now() + 86400000)?.toISOString()?.split('T')?.[0],
        guests: '2',
        rooms: '1'
      }
    });
  };

  const getCurrentSlideDestinations = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return destinations?.slice(startIndex, startIndex + itemsPerSlide);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-brand-heading mb-4">
            Discover Amazing Destinations
          </h2>
          <p className="text-brand-body text-gray-600 max-w-2xl mx-auto">
            From bustling cities to serene beaches, explore our handpicked destinations 
            that promise unforgettable experiences and exceptional stays.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-brand-md hover:shadow-brand-lg transition-brand flex items-center justify-center hover-lift"
            disabled={currentSlide === 0}>

            <Icon name="ChevronLeft" size={20} className="text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-brand-md hover:shadow-brand-lg transition-brand flex items-center justify-center hover-lift"
            disabled={currentSlide === totalSlides - 1}>

            <Icon name="ChevronRight" size={20} className="text-gray-600" />
          </button>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getCurrentSlideDestinations()?.map((destination) =>
            <div
              key={destination?.id}
              className="group cursor-pointer hover-lift"
              onClick={() => handleDestinationClick(destination)}>

                <div className="bg-white rounded-2xl shadow-brand-sm hover:shadow-brand-md transition-brand overflow-hidden">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                    src={destination?.image}
                    alt={destination?.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="text-sm font-semibold text-gray-900">
                        From ${destination?.startingPrice}
                      </span>
                    </div>

                    {/* Location */}
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-semibold mb-1">{destination?.name}</h3>
                      <p className="text-sm opacity-90">{destination?.country}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-600 text-sm mb-4">{destination?.description}</p>
                    
                    {/* Hotels Count */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Icon name="Building2" size={16} />
                        <span>{destination?.hotels?.toLocaleString()} hotels</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-primary">
                        <span>Explore</span>
                        <Icon name="ArrowRight" size={16} />
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2">
                      {destination?.highlights?.slice(0, 2)?.map((highlight, index) =>
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">

                          {highlight}
                        </span>
                    )}
                      {destination?.highlights?.length > 2 &&
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{destination?.highlights?.length - 2} more
                        </span>
                    }
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: totalSlides })?.map((_, index) =>
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-brand ${
              index === currentSlide ? 'bg-primary' : 'bg-gray-300'}`
              } />

            )}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/search-results')}
            iconName="MapPin"
            iconPosition="left">

            View All Destinations
          </Button>
        </div>
      </div>
    </section>);

};

export default FeaturedDestinations;