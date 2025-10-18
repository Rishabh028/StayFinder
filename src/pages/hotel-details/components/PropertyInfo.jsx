import React, { useState } from 'react';
import Icon from '../../../components/Appicon';

const PropertyInfo = ({ hotel = {} }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'amenities', label: 'Amenities', icon: 'Star' },
    { id: 'policies', label: 'Policies', icon: 'FileText' },
    { id: 'location', label: 'Location', icon: 'MapPin' }
  ];

  const amenityCategories = [
    {
      title: 'Popular Amenities',
      items: hotel?.popularAmenities || []
    },
    {
      title: 'Room Features',
      items: hotel?.roomFeatures || []
    },
    {
      title: 'Hotel Services',
      items: hotel?.hotelServices || []
    },
    {
      title: 'Recreation',
      items: hotel?.recreation || []
    }
  ];

  return (
    <div className="bg-card rounded-xl shadow-brand-sm border border-border">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-brand ${
                activeTab === tab?.id
                  ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">About this property</h3>
              <p className="text-muted-foreground leading-relaxed">
                {hotel?.description || `Experience luxury and comfort at ${hotel?.name}. Our property offers world-class amenities and exceptional service in the heart of the city. Whether you're traveling for business or leisure, we provide the perfect blend of modern convenience and timeless elegance.`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-foreground mb-3">Property Highlights</h4>
                <ul className="space-y-2">
                  {(hotel?.highlights || [
                    'Prime downtown location',
                    '24/7 concierge service',
                    'Rooftop pool and bar',
                    'State-of-the-art fitness center',
                    'Award-winning restaurant'
                  ])?.map((highlight, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                      <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-3">Property Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Check-in:</span>
                    <span className="text-foreground">{hotel?.checkIn || '3:00 PM'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Check-out:</span>
                    <span className="text-foreground">{hotel?.checkOut || '11:00 AM'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total rooms:</span>
                    <span className="text-foreground">{hotel?.totalRooms || '245'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Built:</span>
                    <span className="text-foreground">{hotel?.yearBuilt || '2018'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Renovated:</span>
                    <span className="text-foreground">{hotel?.yearRenovated || '2023'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'amenities' && (
          <div className="space-y-6">
            {amenityCategories?.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h4 className="font-medium text-foreground mb-3">{category?.title}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {category?.items?.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'policies' && (
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-foreground mb-3">Cancellation Policy</h4>
              <p className="text-sm text-muted-foreground mb-4">
                {hotel?.cancellationPolicy || 'Free cancellation until 24 hours before check-in. After that, cancellations will incur a fee equal to one night\'s stay.'}
              </p>
            </div>

            <div>
              <h4 className="font-medium text-foreground mb-3">House Rules</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                {(hotel?.houseRules || [
                  'Check-in: 3:00 PM - 11:00 PM',
                  'Check-out: 11:00 AM',
                  'No smoking in rooms',
                  'Pets allowed with additional fee',
                  'Quiet hours: 10:00 PM - 7:00 AM',
                  'Maximum occupancy as stated in room description'
                ])?.map((rule, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Icon name="Dot" size={16} className="mt-0.5 flex-shrink-0" />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-foreground mb-3">Additional Fees</h4>
              <div className="space-y-2 text-sm">
                {(hotel?.additionalFees || [
                  { name: 'Resort fee', amount: '$25/night', description: 'Includes WiFi, fitness center, and pool access' },
                  { name: 'Parking', amount: '$15/night', description: 'Valet parking available' },
                  { name: 'Pet fee', amount: '$50/stay', description: 'Non-refundable pet cleaning fee' }
                ])?.map((fee, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <span className="text-foreground font-medium">{fee?.name}</span>
                      <p className="text-muted-foreground text-xs">{fee?.description}</p>
                    </div>
                    <span className="text-foreground font-medium">{fee?.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'location' && (
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-foreground mb-3">Address</h4>
              <p className="text-muted-foreground">
                {hotel?.address || '123 Downtown Avenue, City Center, New York, NY 10001'}
              </p>
            </div>

            <div className="h-64 rounded-lg overflow-hidden border border-border">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title={hotel?.name || 'Hotel Location'}
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${hotel?.latitude || '40.7589'},${hotel?.longitude || '-73.9851'}&z=14&output=embed`}
                className="w-full h-full"
              />
            </div>

            <div>
              <h4 className="font-medium text-foreground mb-3">Nearby Attractions</h4>
              <div className="space-y-3">
                {(hotel?.nearbyAttractions || [
                  { name: 'Central Park', distance: '0.3 miles', walkTime: '5 min walk' },
                  { name: 'Times Square', distance: '0.8 miles', walkTime: '12 min walk' },
                  { name: 'Broadway Theater District', distance: '0.5 miles', walkTime: '8 min walk' },
                  { name: 'Empire State Building', distance: '1.2 miles', walkTime: '18 min walk' }
                ])?.map((attraction, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Icon name="MapPin" size={16} className="text-primary" />
                      <span className="text-foreground">{attraction?.name}</span>
                    </div>
                    <div className="text-right text-muted-foreground">
                      <div>{attraction?.distance}</div>
                      <div className="text-xs">{attraction?.walkTime}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyInfo;