import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/Appicon';
import Image from '../../../components/Appimage';
import { Button } from '../../../components/ui/button';

const HotelCard = ({ hotel, viewMode = 'list' }) => {
  const [isWishlisted, setIsWishlisted] = useState(hotel?.isWishlisted || false);

  const handleWishlistToggle = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

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

  const getRatingText = (rating) => {
    if (rating >= 9) return 'Exceptional';
    if (rating >= 8) return 'Excellent';
    if (rating >= 7) return 'Very Good';
    if (rating >= 6) return 'Good';
    return 'Fair';
  };

  if (viewMode === 'grid') {
    // This part needs to be implemented, but let's fix the link here too for consistency
    return (
      <Link to={`/hotel-details/${hotel?.id}`} className="block group">
        {/* ... your grid view JSX ... */}
      </Link>
    );
  }

  return (
    <Link to={`/hotel-details/${hotel?.id}`} className="block group">
      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-brand-sm hover-lift transition-brand">
        <div className="flex flex-col sm:flex-row">
          <div className="relative sm:w-80 flex-shrink-0">
            <div className="aspect-[4/3] sm:aspect-[3/2] overflow-hidden">
              <Image
                src={hotel?.image}
                alt={hotel?.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <button
              onClick={handleWishlistToggle}
              className="absolute top-3 right-3 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-brand"
            >
              <Icon
                name="Heart"
                size={16}
                className={isWishlisted ? 'text-destructive fill-current' : 'text-muted-foreground'}
              />
            </button>
            {hotel?.isPopular && (
              <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-medium">
                Popular
              </div>
            )}
          </div>
          
          <div className="flex-1 p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between h-full">
              <div className="flex-1 mb-4 sm:mb-0 sm:pr-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-brand mb-1">
                      {hotel?.name}
                    </h3>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(hotel?.starRating)]?.map((_, i) => (
                        <Icon key={i} name="Star" size={14} className="text-accent fill-current" />
                      ))}
                      <span className="text-sm text-muted-foreground ml-2">{hotel?.propertyType}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <Icon name="MapPin" size={14} className="mr-1" />
                  <span>{hotel?.location}</span>
                  <span className="mx-2">•</span>
                  <span>{hotel?.distanceFromCenter} km from center</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {hotel?.amenities?.slice(0, 4)?.map((amenity) => (
                    <span key={amenity} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                      {amenity}
                    </span>
                  ))}
                  {hotel?.amenities?.length > 4 && (
                    <span className="text-xs text-muted-foreground">
                      +{hotel?.amenities?.length - 4} more
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <div className={`px-2 py-1 rounded text-xs font-medium mr-2 ${getRatingColor(hotel?.guestRating)}`}>
                      {hotel?.guestRating}
                    </div>
                    <span className="text-muted-foreground">
                      {getRatingText(hotel?.guestRating)} • {hotel?.reviewCount} reviews
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right flex-shrink-0">
                {hotel?.originalPrice && hotel?.originalPrice > hotel?.price && (
                  <div className="text-sm text-muted-foreground line-through mb-1">
                    {formatPrice(hotel?.originalPrice)}
                  </div>
                )}
                <div className="text-2xl font-bold text-foreground mb-1">
                  {formatPrice(hotel?.price)}
                </div>
                <div className="text-sm text-muted-foreground mb-3">per night</div>
                <div className="text-xs text-muted-foreground mb-4">
                  Includes taxes & fees
                </div>
                <Button variant="default" size="sm" className="w-full sm:w-auto">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;