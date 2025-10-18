import React, { useState } from 'react';
import Icon from '../../../components/Appicon';
import Image from '../../../components/Appimage';
import { Button } from '../../../components/ui/Button';

const RoomSelection = ({ onNext, bookingData, setBookingData }) => {
  const [selectedRoom, setSelectedRoom] = useState(bookingData?.selectedRoom || null);

  const rooms = [
  {
    id: 'deluxe-king',
    name: 'Deluxe King Room',
    image: "https://images.unsplash.com/photo-1630142346495-8c0aa0c87842",
    alt: 'Spacious hotel room with king-size bed, modern furniture, and city view through large windows',
    size: '35 sqm',
    occupancy: '2 adults',
    bedType: 'King Bed',
    price: 299,
    originalPrice: 349,
    amenities: ['Free WiFi', 'Air Conditioning', 'City View', 'Mini Bar', 'Room Service'],
    features: ['Non-smoking', 'Soundproof', 'Blackout Curtains'],
    availability: 3,
    isPopular: true
  },
  {
    id: 'executive-suite',
    name: 'Executive Suite',
    image: "https://images.unsplash.com/photo-1719368472219-95740ee5d021",
    alt: 'Luxurious hotel suite with separate living area, elegant furniture, and panoramic city views',
    size: '65 sqm',
    occupancy: '4 adults',
    bedType: 'King + Sofa Bed',
    price: 499,
    originalPrice: 599,
    amenities: ['Free WiFi', 'Air Conditioning', 'City View', 'Mini Bar', 'Room Service', 'Separate Living Area'],
    features: ['Non-smoking', 'Soundproof', 'Blackout Curtains', 'Work Desk', 'Balcony'],
    availability: 2,
    isPremium: true
  },
  {
    id: 'standard-twin',
    name: 'Standard Twin Room',
    image: "https://images.unsplash.com/photo-1673687778498-5ddd20749408",
    alt: 'Clean hotel room with two single beds, modern amenities, and warm lighting',
    size: '28 sqm',
    occupancy: '2 adults',
    bedType: '2 Twin Beds',
    price: 199,
    originalPrice: 229,
    amenities: ['Free WiFi', 'Air Conditioning', 'Garden View', 'Room Service'],
    features: ['Non-smoking', 'Soundproof'],
    availability: 5,
    isEconomical: true
  }];


  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setBookingData((prev) => ({
      ...prev,
      selectedRoom: room,
      totalPrice: room?.price * prev?.nights
    }));
  };

  const handleNext = () => {
    if (selectedRoom) {
      onNext();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-brand-heading mb-2">Choose Your Room</h2>
        <p className="text-brand-body text-muted-foreground">
          Select the perfect room for your stay from our available options
        </p>
      </div>
      <div className="space-y-6">
        {rooms?.map((room) =>
        <div
          key={room?.id}
          className={`relative bg-card border rounded-xl p-6 transition-brand hover-lift cursor-pointer ${
          selectedRoom?.id === room?.id ?
          'border-primary shadow-brand-md' :
          'border-border hover:border-primary/50'}`
          }
          onClick={() => handleRoomSelect(room)}>

            {room?.isPopular &&
          <div className="absolute -top-3 left-6 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
                Most Popular
              </div>
          }
            {room?.isPremium &&
          <div className="absolute -top-3 left-6 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                Premium
              </div>
          }
            {room?.isEconomical &&
          <div className="absolute -top-3 left-6 bg-success text-success-foreground px-3 py-1 rounded-full text-xs font-medium">
                Best Value
              </div>
          }

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-80 flex-shrink-0">
                <div className="relative overflow-hidden rounded-lg h-48 lg:h-full">
                  <Image
                  src={room?.image}
                  alt={room?.alt}
                  className="w-full h-full object-cover" />

                  <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md">
                    <span className="text-xs font-medium text-foreground">
                      {room?.availability} left
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{room?.name}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Icon name="Maximize" size={16} />
                        <span>{room?.size}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Users" size={16} />
                        <span>{room?.occupancy}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Bed" size={16} />
                        <span>{room?.bedType}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-muted-foreground line-through">
                        ${room?.originalPrice}
                      </span>
                      <span className="text-2xl font-bold text-primary">
                        ${room?.price}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">per night</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {room?.amenities?.slice(0, 4)?.map((amenity) =>
                    <span
                      key={amenity}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground">

                          <Icon name="Check" size={12} />
                          {amenity}
                        </span>
                    )}
                      {room?.amenities?.length > 4 &&
                    <span className="text-xs text-primary font-medium">
                          +{room?.amenities?.length - 4} more
                        </span>
                    }
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {room?.features?.map((feature) =>
                    <span
                      key={feature}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground">

                          <Icon name="Shield" size={12} />
                          {feature}
                        </span>
                    )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon
                    name={selectedRoom?.id === room?.id ? "CheckCircle2" : "Circle"}
                    size={20}
                    className={selectedRoom?.id === room?.id ? "text-primary" : "text-muted-foreground"} />

                    <span className="text-sm font-medium text-foreground">
                      {selectedRoom?.id === room?.id ? 'Selected' : 'Select this room'}
                    </span>
                  </div>

                  {room?.availability <= 3 &&
                <div className="flex items-center gap-1 text-warning">
                      <Icon name="AlertTriangle" size={16} />
                      <span className="text-xs font-medium">Only {room?.availability} rooms left!</span>
                    </div>
                }
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
        <div className="text-sm text-muted-foreground">
          {selectedRoom ? `${selectedRoom?.name} selected` : 'Please select a room to continue'}
        </div>
        <Button
          variant="default"
          size="lg"
          disabled={!selectedRoom}
          onClick={handleNext}
          iconName="ArrowRight"
          iconPosition="right">

          Continue to Guest Details
        </Button>
      </div>
    </div>);

};

export default RoomSelection;