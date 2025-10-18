import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import SearchHeader from './components/SearchHeader';
import SearchFilters from './components/SearchFilters';
import SortAndView from './components/SortAndView';
import HotelCard from './components/HotelCard';
import MapView from './components/MapView';
import Pagination from './components/Pagination';
import Icon from '../../components/Appicon';
import {Button} from '../../components/ui/Button';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useState({
    destination: "New York City, NY",
    checkIn: "2025-10-20",
    checkOut: "2025-10-23",
    guests: 2
  });

  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    starRating: [],
    guestRating: null,
    propertyTypes: [],
    maxDistance: null,
    amenities: []
  });

  const [sortBy, setSortBy] = useState('recommended');
  const [viewMode, setViewMode] = useState('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const resultsPerPage = 12;

  // Mock hotel data
  const mockHotels = [
  {
    id: 1,
    name: "Maldives Overwater Villa",
    location: "Maldives",
    address: null,
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
    imageAlt: "Overwater villa with turquoise lagoon",
    price: 750,
    guestRating: 4.8,
    reviewCount: 2415,
    amenities: ["Ocean View", "Private Deck", "Glass Floor", "Butler Service"],
    isPopular: true,
    isWishlisted: false,
    description: "A luxurious overwater villa with direct access to the turquoise lagoon.",
    starRating: 5,
    gallery: [],
    propertyType: "Villa",
    distanceFromCenter: 0,
    originalPrice: null
  },
  {
    id: 2,
    name: "Santorini Cliffside Hotel",
    location: "Santorini, Greece",
    address: null,
    image: "https://images.unsplash.com/photo-1637170473768-c883efa37af9",
    imageAlt: "Greek architecture overlooking the Aegean Sea",
    price: 320,
    guestRating: 4.9,
    reviewCount: 1523,
    amenities: ["Ocean View", "Infinity Pool", "Spa", "Restaurant"],
    isPopular: true,
    isWishlisted: false,
    description: "Traditional white and blue Greek architecture overlooking the Aegean Sea.",
    starRating: 5,
    gallery: [],
    propertyType: "Hotel",
    distanceFromCenter: 0.5,
    originalPrice: null
  },
  {
    id: 3,
    name: "The High Line Hotel",
    image: "https://images.unsplash.com/photo-1695668323653-8935c58e2c6c",
    imageAlt: "Historic brick hotel building with ivy-covered walls and elegant entrance",
    starRating: 4,
    guestRating: 8.8,
    reviewCount: 1456,
    price: 320,
    originalPrice: 380,
    location: "Chelsea, New York",
    distanceFromCenter: 2.1,
    propertyType: "Boutique Hotel",
    amenities: ["Free WiFi", "Restaurant", "Bar/Lounge", "Pet Friendly", "Garden"],
    isPopular: true,
    isWishlisted: false
  },
  {
    id: 4,
    name: "1 Hotels Brooklyn Bridge",
    image: "https://images.unsplash.com/photo-1709187516056-d4929b67e89f",
    imageAlt: "Eco-luxury hotel room with floor-to-ceiling windows overlooking city skyline",
    starRating: 5,
    guestRating: 9.0,
    reviewCount: 987,
    price: 395,
    originalPrice: null,
    location: "Brooklyn Heights, New York",
    distanceFromCenter: 3.5,
    propertyType: "Eco Hotel",
    amenities: ["Free WiFi", "Spa & Wellness", "Swimming Pool", "Restaurant", "Fitness Center", "Rooftop Bar"],
    isPopular: false,
    isWishlisted: false
  },
  {
    id: 5,
    name: "The William Vale",
    image: "https://images.unsplash.com/photo-1728982981013-3989b7497204",
    imageAlt: "Contemporary hotel with geometric architecture and panoramic city views",
    starRating: 4,
    guestRating: 8.6,
    reviewCount: 2134,
    price: 275,
    originalPrice: 315,
    location: "Williamsburg, Brooklyn",
    distanceFromCenter: 4.2,
    propertyType: "Modern Hotel",
    amenities: ["Free WiFi", "Swimming Pool", "Restaurant", "Bar/Lounge", "Fitness Center", "Spa"],
    isPopular: true,
    isWishlisted: false
  },
  {
    id: 6,
    name: "The Standard High Line",
    image: "https://images.unsplash.com/photo-1627212083263-6c4398fb3201",
    imageAlt: "Sleek modern hotel with glass facade and industrial design elements",
    starRating: 4,
    guestRating: 8.2,
    reviewCount: 1678,
    price: 298,
    originalPrice: null,
    location: "Meatpacking District, New York",
    distanceFromCenter: 2.8,
    propertyType: "Design Hotel",
    amenities: ["Free WiFi", "Restaurant", "Bar/Lounge", "Fitness Center", "Rooftop Terrace"],
    isPopular: false,
    isWishlisted: true
  },
  {
    id: 7,
    name: "The Bowery Hotel",
    image: "https://images.unsplash.com/photo-1672489446662-61c47cd984b8",
    imageAlt: "Elegant hotel entrance with vintage charm and warm ambient lighting",
    starRating: 5,
    guestRating: 9.1,
    reviewCount: 1234,
    price: 425,
    originalPrice: 485,
    location: "NoHo, New York",
    distanceFromCenter: 1.9,
    propertyType: "Luxury Hotel",
    amenities: ["Free WiFi", "Restaurant", "Bar/Lounge", "Fitness Center", "Pet Friendly", "Concierge"],
    isPopular: true,
    isWishlisted: false
  },
  {
    id: 8,
    name: "Maldives Overwater Villa",
    image: "https://images.unsplash.com/photo-1600011689032-8b628b8a8747",
    imageAlt: "Contemporary hotel lobby with colorful modern art and innovative design",
    starRating: 4,
    guestRating: 8.4,
    reviewCount: 2166,
    price: 425,
    originalPrice: null,
    location: "Lower East Side, Maldives",
    distanceFromCenter: 4.3,
    propertyType: "Design Hotel",
    amenities: ["Free WiFi", "Restaurant", "Bar/Lounge", "Fitness Center", "Business Center"],
    isPopular: true,
    isWishlisted: false
  },
  {
  id: 9,
    name: "Tokyo Sky Tower Hotel",
    image: "https://images.unsplash.com/photo-1604503816506-b20032dabf9a",
    imageAlt: "Sleek modern hotel with glass facade and industrial design elements",
    starRating: 4,
    guestRating: 8.8,
    reviewCount: 1258,
    price: 483,
    originalPrice: null,
    location: "Tokyo, Japan",
    distanceFromCenter: 1.2,
    propertyType: "Design Hotel",
    amenities: ["Free WiFi", "Restaurant", "Bar/Lounge", "Fitness Center", "Rooftop Terrace"],
    isPopular: false,
    isWishlisted: true},
 {
  id: 10,
    name: "Swiss Alpine Resort",
    image: "https://images.unsplash.com/photo-1628582786822-a5763dc8b2ca",
    imageAlt: "Sleek modern hotel with glass facade and industrial design elements",
    starRating: 5,
    guestRating: 8.3,
    reviewCount: 1278,
    price: 388,
    originalPrice: null,
    location: "Zermatt, Switzerland",
    distanceFromCenter: 5.8,
    propertyType: "Design Hotel",
    amenities: ["Free WiFi", "Restaurant", "Bar/Lounge", "Fitness Center", "Rooftop Terrace"],
    isPopular: false,
    isWishlisted: false},
    { 
  id: 11,
    name: "The Plaza Hotel",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    imageAlt: "Sleek modern hotel with glass facade and industrial design elements",
    starRating: 4,
    guestRating: 8.6,
    reviewCount: 1637,
    price: 354,
    originalPrice: null,
    location: "New York, USA', '768 5th Ave, New York, NY 10019",
    distanceFromCenter: 4.3,
    propertyType: "Design Hotel",
    amenities: ["Free WiFi", "Restaurant", "Bar/Lounge", "Fitness Center", "Rooftop Terrace"],
    isPopular: false,
    isWishlisted: false},
     {
  id: 12,
    name: "The Beverly Hills Hotel",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
    imageAlt: "Sleek modern hotel with glass facade and industrial design elements",
    starRating: 4,
    guestRating: 9.2,
    reviewCount: 4268,
    price: 498,
    originalPrice: null,
    location: "California, USA",
    distanceFromCenter: 4.6,
    propertyType: "Design Hotel",
    amenities: ["Free WiFi", "Restaurant", "Bar/Lounge", "Fitness Center", "Rooftop Terrace"],
    isPopular: false,
    isWishlisted: false},
     {
  id: 13,
    name: "Four Seasons George V",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
    imageAlt: "Sleek modern hotel with glass facade and industrial design elements",
    starRating: 4,
    guestRating: 8.9,
    reviewCount: 2348,
    price: 428,
    originalPrice: null,
    location: "Meatpacking District, New York",
    distanceFromCenter: 3.6,
    propertyType: "Design Hotel",
    amenities: ["Free WiFi", "Restaurant", "Bar/Lounge", "Fitness Center", "Rooftop Terrace"],
    isPopular: false,
    isWishlisted: false},


];


  const totalResults = 247;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handleSearchUpdate = (newSearchParams) => {
    setSearchParams(newSearchParams);
    setCurrentPage(1);
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      priceMin: '',
      priceMax: '',
      starRating: [],
      guestRating: null,
      propertyTypes: [],
      maxDistance: null,
      amenities: []
    });
    setCurrentPage(1);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  const handleViewModeChange = (newViewMode) => {
    setViewMode(newViewMode);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel);
  };

  // Filter and sort hotels based on current settings
  const getFilteredAndSortedHotels = () => {
    let filteredHotels = [...mockHotels];

    // Apply filters
    if (filters?.priceMin) {
      filteredHotels = filteredHotels?.filter((hotel) => hotel?.price >= parseInt(filters?.priceMin));
    }
    if (filters?.priceMax) {
      filteredHotels = filteredHotels?.filter((hotel) => hotel?.price <= parseInt(filters?.priceMax));
    }
    if (filters?.starRating?.length > 0) {
      filteredHotels = filteredHotels?.filter((hotel) => filters?.starRating?.includes(hotel?.starRating));
    }
    if (filters?.guestRating) {
      filteredHotels = filteredHotels?.filter((hotel) => hotel?.guestRating >= filters?.guestRating);
    }
    if (filters?.maxDistance) {
      filteredHotels = filteredHotels?.filter((hotel) => hotel?.distanceFromCenter <= filters?.maxDistance);
    }
    if (filters?.amenities?.length > 0) {
      filteredHotels = filteredHotels?.filter((hotel) =>
      filters?.amenities?.some((amenity) =>
      hotel?.amenities?.some((hotelAmenity) =>
      hotelAmenity?.toLowerCase()?.includes(amenity?.toLowerCase())
      )
      )
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price_low':
        filteredHotels?.sort((a, b) => a?.price - b?.price);
        break;
      case 'price_high':
        filteredHotels?.sort((a, b) => b?.price - a?.price);
        break;
      case 'rating':
        filteredHotels?.sort((a, b) => b?.guestRating - a?.guestRating);
        break;
      case 'distance':
        filteredHotels?.sort((a, b) => a?.distanceFromCenter - b?.distanceFromCenter);
        break;
      case 'popularity':
        filteredHotels?.sort((a, b) => b?.reviewCount - a?.reviewCount);
        break;
      default: // recommended
        filteredHotels?.sort((a, b) => {
          if (a?.isPopular && !b?.isPopular) return -1;
          if (!a?.isPopular && b?.isPopular) return 1;
          return b?.guestRating - a?.guestRating;
        });
    }

    return filteredHotels;
  };

  let filteredHotels = getFilteredAndSortedHotels();
  const paginatedHotels = filteredHotels?.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Header */}
          <SearchHeader
            searchParams={searchParams}
            onSearchUpdate={handleSearchUpdate}
            totalResults={filteredHotels?.length} />


          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <SearchFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
                isVisible={isFiltersVisible}
                onToggle={() => setIsFiltersVisible(!isFiltersVisible)} />

            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Sort and View Controls */}
              <SortAndView
                sortBy={sortBy}
                onSortChange={handleSortChange}
                viewMode={viewMode}
                onViewModeChange={handleViewModeChange}
                totalResults={filteredHotels?.length}
                currentPage={currentPage}
                resultsPerPage={resultsPerPage} />


              {/* Loading State */}
              {isLoading &&
              <div className="flex items-center justify-center py-12">
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    <span className="text-muted-foreground">Loading hotels...</span>
                  </div>
                </div>
              }

              {/* Results Content */}
              {!isLoading &&
              <>
                  {viewMode === 'map' ?
                <MapView
                  hotels={filteredHotels}
                  selectedHotel={selectedHotel}
                  onHotelSelect={handleHotelSelect} /> :


                <>
                      {/* Hotel Results */}
                      {filteredHotels?.length === 0 ?
                  <div className="bg-card border border-border rounded-lg shadow-brand-sm p-12 text-center">
                          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-foreground mb-2">No hotels found</h3>
                          <p className="text-muted-foreground mb-6">
                            Try adjusting your filters or search criteria to find more options.
                          </p>
                          <Button variant="outline" onClick={handleClearFilters}>
                            Clear All Filters
                          </Button>
                        </div> :

                  <div className={
                  viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-6'
                  }>
                          {paginatedHotels?.map((hotel) =>
                    <HotelCard
                      key={hotel?.id}
                      hotel={hotel}
                      viewMode={viewMode} />

                    )}
                        </div>
                  }

                      {/* Pagination */}
                      {filteredHotels?.length > 0 &&
                  <div className="mt-8">
                          <Pagination
                      currentPage={currentPage}
                      totalPages={Math.ceil(filteredHotels?.length / resultsPerPage)}
                      totalResults={filteredHotels?.length}
                      resultsPerPage={resultsPerPage}
                      onPageChange={handlePageChange} />

                        </div>
                  }
                    </>
                }
                </>
              }
            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default SearchResults;