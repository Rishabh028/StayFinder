import React, { useState } from 'react';
import Icon from '../../../components/Appicon';
import {Button} from '../../../components/ui/Button';

const MapView = ({ hotels, selectedHotel, onHotelSelect }) => {
  const [mapCenter] = useState({ lat: 40.7128, lng: -74.0060 }); // New York coordinates

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })?.format(price);
  };

  const getRatingColor = (rating) => {
    if (rating >= 9) return 'bg-success text-success-foreground';
    if (rating >= 8) return 'bg-primary text-primary-foreground';
    if (rating >= 7) return 'bg-accent text-accent-foreground';
    return 'bg-muted text-muted-foreground';
  };

  return (
    <div className="relative h-[600px] bg-muted rounded-lg overflow-hidden">
      {/* Google Maps Iframe */}
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        title="Hotels Map View"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=12&output=embed`}
        className="absolute inset-0"
      />
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button variant="outline" size="sm" className="bg-background/90 backdrop-blur-sm">
          <Icon name="Plus" size={16} />
        </Button>
        <Button variant="outline" size="sm" className="bg-background/90 backdrop-blur-sm">
          <Icon name="Minus" size={16} />
        </Button>
        <Button variant="outline" size="sm" className="bg-background/90 backdrop-blur-sm">
          <Icon name="Locate" size={16} />
        </Button>
      </div>
      {/* Hotel Markers Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {hotels?.slice(0, 10)?.map((hotel, index) => (
          <div
            key={hotel?.id}
            className="absolute pointer-events-auto"
            style={{
              left: `${20 + (index % 5) * 15}%`,
              top: `${20 + Math.floor(index / 5) * 25}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <button
              onClick={() => onHotelSelect(hotel)}
              className={`bg-background border-2 rounded-lg px-3 py-2 shadow-brand-md hover-lift transition-brand ${
                selectedHotel?.id === hotel?.id 
                  ? 'border-primary scale-110' :'border-border hover:border-primary'
              }`}
            >
              <div className="text-sm font-semibold text-foreground">
                {formatPrice(hotel?.price)}
              </div>
            </button>
          </div>
        ))}
      </div>
      {/* Selected Hotel Info Card */}
      {selectedHotel && (
        <div className="absolute bottom-4 left-4 right-4 bg-card border border-border rounded-lg shadow-brand-lg p-4">
          <div className="flex items-start space-x-4">
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={selectedHotel?.image}
                alt={selectedHotel?.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">
                    {selectedHotel?.name}
                  </h3>
                  <div className="flex items-center space-x-1 mt-1">
                    {[...Array(selectedHotel?.starRating)]?.map((_, i) => (
                      <Icon key={i} name="Star" size={12} className="text-accent fill-current" />
                    ))}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Icon name="MapPin" size={12} className="mr-1" />
                    <span className="truncate">{selectedHotel?.location}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <div className="text-lg font-bold text-foreground">
                    {formatPrice(selectedHotel?.price)}
                  </div>
                  <div className="text-xs text-muted-foreground">per night</div>
                  <div className={`inline-block px-2 py-1 rounded text-xs font-medium mt-1 ${getRatingColor(selectedHotel?.guestRating)}`}>
                    {selectedHotel?.guestRating}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>{selectedHotel?.reviewCount} reviews</span>
                </div>
                <Button size="sm" variant="default">
                  View Details
                </Button>
              </div>
            </div>
            <button
              onClick={() => onHotelSelect(null)}
              className="flex-shrink-0 w-6 h-6 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-brand"
            >
              <Icon name="X" size={14} />
            </button>
          </div>
        </div>
      )}
      {/* Map Legend */}
      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm border border-border rounded-lg p-3">
        <div className="text-sm font-medium text-foreground mb-2">Map Legend</div>
        <div className="space-y-1 text-xs text-muted-foreground">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded"></div>
            <span>Selected Hotel</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-background border border-border rounded"></div>
            <span>Available Hotels</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;