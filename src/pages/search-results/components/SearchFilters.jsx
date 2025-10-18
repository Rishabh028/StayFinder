import React, { useState } from 'react';
import Icon from '../../../components/Appicon';
import {Button} from '../../../components/ui/Button';
import {Input} from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const SearchFilters = ({ filters, onFiltersChange, onClearFilters, isVisible, onToggle }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleAmenityToggle = (amenity) => {
    const currentAmenities = localFilters?.amenities || [];
    const updatedAmenities = currentAmenities?.includes(amenity)
      ? currentAmenities?.filter(a => a !== amenity)
      : [...currentAmenities, amenity];
    handleFilterChange('amenities', updatedAmenities);
  };

  const amenitiesList = [
    { id: 'wifi', label: 'Free WiFi', icon: 'Wifi' },
    { id: 'parking', label: 'Free Parking', icon: 'Car' },
    { id: 'pool', label: 'Swimming Pool', icon: 'Waves' },
    { id: 'gym', label: 'Fitness Center', icon: 'Dumbbell' },
    { id: 'spa', label: 'Spa & Wellness', icon: 'Sparkles' },
    { id: 'restaurant', label: 'Restaurant', icon: 'UtensilsCrossed' },
    { id: 'bar', label: 'Bar/Lounge', icon: 'Wine' },
    { id: 'breakfast', label: 'Free Breakfast', icon: 'Coffee' },
    { id: 'petFriendly', label: 'Pet Friendly', icon: 'Heart' },
    { id: 'airConditioning', label: 'Air Conditioning', icon: 'Snowflake' },
    { id: 'roomService', label: '24/7 Room Service', icon: 'Clock' },
    { id: 'businessCenter', label: 'Business Center', icon: 'Briefcase' }
  ];

  const propertyTypes = [
    { id: 'hotel', label: 'Hotel' },
    { id: 'resort', label: 'Resort' },
    { id: 'apartment', label: 'Apartment' },
    { id: 'villa', label: 'Villa' },
    { id: 'guesthouse', label: 'Guest House' },
    { id: 'hostel', label: 'Hostel' }
  ];

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={onToggle}
          iconName={isVisible ? "X" : "Filter"}
          iconPosition="left"
          fullWidth
        >
          {isVisible ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>
      {/* Filter Panel */}
      <div className={`bg-card border border-border rounded-lg shadow-brand-sm ${isVisible ? 'block' : 'hidden lg:block'}`}>
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Filters</h3>
            <Button variant="ghost" size="sm" onClick={onClearFilters}>
              Clear All
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Price Range */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Price Range (per night)</h4>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                placeholder="Min"
                value={localFilters?.priceMin || ''}
                onChange={(e) => handleFilterChange('priceMin', e?.target?.value)}
              />
              <Input
                type="number"
                placeholder="Max"
                value={localFilters?.priceMax || ''}
                onChange={(e) => handleFilterChange('priceMax', e?.target?.value)}
              />
            </div>
          </div>

          {/* Star Rating */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Star Rating</h4>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1]?.map((stars) => (
                <Checkbox
                  key={stars}
                  label={
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(stars)]?.map((_, i) => (
                          <Icon key={i} name="Star" size={16} className="text-accent fill-current" />
                        ))}
                        {[...Array(5 - stars)]?.map((_, i) => (
                          <Icon key={i} name="Star" size={16} className="text-muted-foreground" />
                        ))}
                      </div>
                      <span className="text-sm">{stars} star{stars !== 1 ? 's' : ''}</span>
                    </div>
                  }
                  checked={(localFilters?.starRating || [])?.includes(stars)}
                  onChange={(e) => {
                    const currentRatings = localFilters?.starRating || [];
                    const updatedRatings = e?.target?.checked
                      ? [...currentRatings, stars]
                      : currentRatings?.filter(r => r !== stars);
                    handleFilterChange('starRating', updatedRatings);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Guest Rating */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Guest Rating</h4>
            <div className="space-y-2">
              {[
                { value: 9, label: 'Exceptional (9.0+)' },
                { value: 8, label: 'Excellent (8.0+)' },
                { value: 7, label: 'Very Good (7.0+)' },
                { value: 6, label: 'Good (6.0+)' }
              ]?.map((rating) => (
                <Checkbox
                  key={rating?.value}
                  label={rating?.label}
                  checked={localFilters?.guestRating === rating?.value}
                  onChange={(e) => handleFilterChange('guestRating', e?.target?.checked ? rating?.value : null)}
                />
              ))}
            </div>
          </div>

          {/* Property Type */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Property Type</h4>
            <div className="space-y-2">
              {propertyTypes?.map((type) => (
                <Checkbox
                  key={type?.id}
                  label={type?.label}
                  checked={(localFilters?.propertyTypes || [])?.includes(type?.id)}
                  onChange={(e) => {
                    const currentTypes = localFilters?.propertyTypes || [];
                    const updatedTypes = e?.target?.checked
                      ? [...currentTypes, type?.id]
                      : currentTypes?.filter(t => t !== type?.id);
                    handleFilterChange('propertyTypes', updatedTypes);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Distance from Center */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Distance from City Center</h4>
            <div className="space-y-2">
              {[
                { value: 1, label: 'Less than 1 km' },
                { value: 3, label: 'Less than 3 km' },
                { value: 5, label: 'Less than 5 km' },
                { value: 10, label: 'Less than 10 km' }
              ]?.map((distance) => (
                <Checkbox
                  key={distance?.value}
                  label={distance?.label}
                  checked={localFilters?.maxDistance === distance?.value}
                  onChange={(e) => handleFilterChange('maxDistance', e?.target?.checked ? distance?.value : null)}
                />
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Amenities</h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {amenitiesList?.map((amenity) => (
                <Checkbox
                  key={amenity?.id}
                  label={
                    <div className="flex items-center space-x-2">
                      <Icon name={amenity?.icon} size={16} className="text-muted-foreground" />
                      <span>{amenity?.label}</span>
                    </div>
                  }
                  checked={(localFilters?.amenities || [])?.includes(amenity?.id)}
                  onChange={() => handleAmenityToggle(amenity?.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchFilters;