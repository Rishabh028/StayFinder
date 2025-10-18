import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/Appicon';
import Image from '../../../components/Appimage';
import {Button} from '../../../components/ui/Button';
import {Input} from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
    rooms: '1'
  });

  const guestOptions = [
  { value: '1', label: '1 Guest' },
  { value: '2', label: '2 Guests' },
  { value: '3', label: '3 Guests' },
  { value: '4', label: '4 Guests' },
  { value: '5', label: '5+ Guests' }];


  const roomOptions = [
  { value: '1', label: '1 Room' },
  { value: '2', label: '2 Rooms' },
  { value: '3', label: '3 Rooms' },
  { value: '4', label: '4+ Rooms' }];


  const popularDestinations = [
  "New York, NY", "Los Angeles, CA", "Miami, FL", "Las Vegas, NV",
  "San Francisco, CA", "Chicago, IL", "Boston, MA", "Seattle, WA"];


  const handleInputChange = (field, value) => {
    setSearchData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    if (searchData?.destination && searchData?.checkIn && searchData?.checkOut) {
      navigate('/search-results', { state: searchData });
    }
  };

  const handleDestinationClick = (destination) => {
    setSearchData((prev) => ({ ...prev, destination }));
  };

  // Set default dates (today and tomorrow)
  React.useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow?.setDate(tomorrow?.getDate() + 1);

    setSearchData((prev) => ({
      ...prev,
      checkIn: today?.toISOString()?.split('T')?.[0],
      checkOut: tomorrow?.toISOString()?.split('T')?.[0]
    }));
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1722277956458-09dc65a5445c"
          alt="Luxury hotel lobby with modern design, marble floors, and elegant lighting creating a welcoming atmosphere"
          className="w-full h-full object-cover opacity-20" />

        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-blue-600/20"></div>
      </div>
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-brand-hero font-accent mb-6 text-gray-900">
            Your Perfect Stay,
            <span className="text-primary block">Simplified</span>
          </h1>
          <p className="text-brand-subheading text-gray-600 max-w-2xl mx-auto mb-8">
            Discover extraordinary accommodations worldwide. From boutique hotels to luxury resorts, 
            find your ideal stay with confidence and ease.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-8 mb-12 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-green-500" />
              <span>Secure Booking</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-blue-500" />
              <span>Instant Confirmation</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={16} className="text-amber-500" />
              <span>Best Price Guarantee</span>
            </div>
          </div>
        </div>

        {/* Search Widget */}
        <div className="bg-white rounded-2xl shadow-brand-lg p-6 sm:p-8 max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="lg:col-span-2">
              <Input
                label="Where to?"
                type="text"
                placeholder="City, hotel, or landmark"
                value={searchData?.destination}
                onChange={(e) => handleInputChange('destination', e?.target?.value)}
                className="w-full" />

            </div>
            
            <div>
              <Input
                label="Check-in"
                type="date"
                value={searchData?.checkIn}
                onChange={(e) => handleInputChange('checkIn', e?.target?.value)}
                className="w-full" />

            </div>
            
            <div>
              <Input
                label="Check-out"
                type="date"
                value={searchData?.checkOut}
                onChange={(e) => handleInputChange('checkOut', e?.target?.value)}
                className="w-full" />

            </div>
            
            <div className="flex space-x-2">
              <Select
                label="Guests"
                options={guestOptions}
                value={searchData?.guests}
                onChange={(value) => handleInputChange('guests', value)}
                className="flex-1" />

            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <Select
              label="Rooms"
              options={roomOptions}
              value={searchData?.rooms}
              onChange={(value) => handleInputChange('rooms', value)}
              className="sm:w-32" />

            
            <Button
              variant="default"
              size="lg"
              onClick={handleSearch}
              iconName="Search"
              iconPosition="left"
              className="sm:ml-auto"
              fullWidth>

              Search Hotels
            </Button>
          </div>

          {/* Popular Destinations */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-3">Popular destinations:</p>
            <div className="flex flex-wrap gap-2">
              {popularDestinations?.slice(0, 6)?.map((destination) =>
              <button
                key={destination}
                onClick={() => handleDestinationClick(destination)}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-primary hover:text-white rounded-full transition-brand">

                  {destination}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50K+</div>
            <div className="text-sm text-gray-600">Hotels Worldwide</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">2M+</div>
            <div className="text-sm text-gray-600">Happy Travelers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">4.8★</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-gray-600">Customer Support</div>
          </div>
        </div>
      </div>
    </section>);

};

export default HeroSection;