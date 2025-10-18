import React, { useState } from 'react';
import Icon from '../../../components/Appicon';
import {Button} from '../../../components/ui/Button';
import {Input} from '../../../components/ui/Input';

const SearchHeader = ({ searchParams, onSearchUpdate, totalResults }) => {
  const [isEditingSearch, setIsEditingSearch] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchParams);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    onSearchUpdate(localSearch);
    setIsEditingSearch(false);
  };

  const formatDateRange = (checkIn, checkOut) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const options = { month: 'short', day: 'numeric' };
    
    return `${checkInDate?.toLocaleDateString('en-US', options)} - ${checkOutDate?.toLocaleDateString('en-US', options)}`;
  };

  const calculateNights = (checkIn, checkOut) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (isEditingSearch) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-brand-sm p-6 mb-6">
        <form onSubmit={handleSearchSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <Input
                label="Destination"
                type="text"
                placeholder="Where are you going?"
                value={localSearch?.destination}
                onChange={(e) => setLocalSearch({ ...localSearch, destination: e?.target?.value })}
              />
            </div>
            <div>
              <Input
                label="Check-in"
                type="date"
                value={localSearch?.checkIn}
                onChange={(e) => setLocalSearch({ ...localSearch, checkIn: e?.target?.value })}
              />
            </div>
            <div>
              <Input
                label="Check-out"
                type="date"
                value={localSearch?.checkOut}
                onChange={(e) => setLocalSearch({ ...localSearch, checkOut: e?.target?.value })}
              />
            </div>
            <div>
              <Input
                label="Guests"
                type="number"
                min="1"
                max="20"
                value={localSearch?.guests}
                onChange={(e) => setLocalSearch({ ...localSearch, guests: parseInt(e?.target?.value) })}
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button type="submit" variant="default">
              Update Search
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsEditingSearch(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-brand-sm p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={18} className="text-primary" />
              <span className="font-semibold text-foreground">{searchParams?.destination}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={18} className="text-muted-foreground" />
              <span className="text-muted-foreground">
                {formatDateRange(searchParams?.checkIn, searchParams?.checkOut)}
              </span>
              <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                {calculateNights(searchParams?.checkIn, searchParams?.checkOut)} nights
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={18} className="text-muted-foreground" />
              <span className="text-muted-foreground">
                {searchParams?.guests} guest{searchParams?.guests !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-sm text-muted-foreground">
              {totalResults?.toLocaleString()} properties found
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsEditingSearch(true)}
            iconName="Edit3"
            iconPosition="left"
          >
            Modify Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;