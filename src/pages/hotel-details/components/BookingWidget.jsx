import React, { useState } from 'react';
import Icon from '../../../components/Appicon';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { useNavigate } from 'react-router-dom';

const BookingWidget = ({ hotel = {}, rooms = [] }) => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showGuestSelector, setShowGuestSelector] = useState(false);
  const [showRoomSelector, setShowRoomSelector] = useState(false);

  const handleBookNow = () => {
    if (!checkIn || !checkOut || !selectedRoom) {
      alert('Please select check-in date, check-out date, and room type');
      return;
    }
    
    const bookingData = {
      id: hotel?.id,
      hotelName: hotel?.name,
      checkIn,
      checkOut,
      guests,
      selectedRoom,
      totalPrice: calculateTotalPrice()
    };
    
    // Navigate to booking flow with data
    navigate('/booking-flow', { state: bookingData });
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  const calculateTotalPrice = () => {
    if (!selectedRoom) return 0;
    const nights = calculateNights();
    const basePrice = selectedRoom?.price * nights;
    const taxes = basePrice * 0.12;
    return basePrice + taxes;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  const getTodayDate = () => {
    return new Date()?.toISOString()?.split('T')?.[0];
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow?.setDate(tomorrow?.getDate() + 1);
    return tomorrow?.toISOString()?.split('T')?.[0];
  };

  return (
    <div className="bg-card rounded-xl shadow-brand-md border border-border sticky top-24">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-foreground">
                {formatPrice(hotel?.startingPrice || 199)}
              </span>
              <span className="text-muted-foreground">/night</span>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5]?.map((star) => (
                  <Icon
                    key={star}
                    name="Star"
                    size={16}
                    className={star <= (hotel?.rating || 4.5) ? 'text-amber-400 fill-current' : 'text-border'}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({hotel?.reviewCount || 240} reviews)
              </span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-success font-medium">Available</div>
            <div className="text-xs text-muted-foreground">Last booked 2 hours ago</div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Date Selection */}
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="date"
              label="Check-in"
              value={checkIn}
              onChange={(e) => setCheckIn(e?.target?.value)}
              min={getTodayDate()}
            />
            <Input
              type="date"
              label="Check-out"
              value={checkOut}
              onChange={(e) => setCheckOut(e?.target?.value)}
              min={checkIn || getTomorrowDate()}
            />
          </div>

          {/* Guest Selection */}
          <div className="relative">
            <button
              onClick={() => setShowGuestSelector(!showGuestSelector)}
              className="w-full p-3 border border-border rounded-lg text-left hover:border-primary transition-brand focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-foreground">Guests</div>
                  <div className="text-sm text-muted-foreground">
                    {guests?.adults} adult{guests?.adults !== 1 ? 's' : ''}
                    {guests?.children > 0 && `, ${guests?.children} child${guests?.children !== 1 ? 'ren' : ''}`}
                  </div>
                </div>
                <Icon name="ChevronDown" size={20} />
              </div>
            </button>

            {showGuestSelector && (
              <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-popover border border-border rounded-lg shadow-brand-md z-10">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-foreground">Adults</div>
                      <div className="text-sm text-muted-foreground">Ages 13+</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setGuests(prev => ({ ...prev, adults: Math.max(1, prev?.adults - 1) }))}
                        className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-brand"
                      >
                        <Icon name="Minus" size={16} />
                      </button>
                      <span className="w-8 text-center font-medium">{guests?.adults}</span>
                      <button
                        onClick={() => setGuests(prev => ({ ...prev, adults: Math.min(8, prev?.adults + 1) }))}
                        className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-brand"
                      >
                        <Icon name="Plus" size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-foreground">Children</div>
                      <div className="text-sm text-muted-foreground">Ages 0-12</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setGuests(prev => ({ ...prev, children: Math.max(0, prev?.children - 1) }))}
                        className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-brand"
                      >
                        <Icon name="Minus" size={16} />
                      </button>
                      <span className="w-8 text-center font-medium">{guests?.children}</span>
                      <button
                        onClick={() => setGuests(prev => ({ ...prev, children: Math.min(4, prev?.children + 1) }))}
                        className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-brand"
                      >
                        <Icon name="Plus" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Room Selection */}
          <div className="relative">
            <button
              onClick={() => setShowRoomSelector(!showRoomSelector)}
              className="w-full p-3 border border-border rounded-lg text-left hover:border-primary transition-brand focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-foreground">Room Type</div>
                  <div className="text-sm text-muted-foreground">
                    {selectedRoom ? selectedRoom?.name : 'Select a room'}
                  </div>
                </div>
                <Icon name="ChevronDown" size={20} />
              </div>
            </button>

            {showRoomSelector && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-brand-md z-10 max-h-64 overflow-y-auto">
                {rooms?.map((room) => (
                  <button
                    key={room?.id}
                    onClick={() => {
                      setSelectedRoom(room);
                      setShowRoomSelector(false);
                    }}
                    className="w-full p-4 text-left hover:bg-muted transition-brand border-b border-border last:border-b-0"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-foreground">{room?.name}</div>
                        <div className="text-sm text-muted-foreground">{room?.description}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Icon name="Users" size={14} />
                          <span className="text-xs text-muted-foreground">Max {room?.maxGuests} guests</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-foreground">{formatPrice(room?.price)}</div>
                        <div className="text-xs text-muted-foreground">per night</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Price Breakdown */}
          {selectedRoom && checkIn && checkOut && (
            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {formatPrice(selectedRoom?.price)} × {calculateNights()} nights
                </span>
                <span className="text-foreground">
                  {formatPrice(selectedRoom?.price * calculateNights())}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Taxes & fees</span>
                <span className="text-foreground">
                  {formatPrice(selectedRoom?.price * calculateNights() * 0.12)}
                </span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-semibold">
                <span className="text-foreground">Total</span>
                <span className="text-foreground">{formatPrice(calculateTotalPrice())}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <Button
              variant="default"
              fullWidth
              onClick={handleBookNow}
              iconName="Calendar"
              iconPosition="left"
            >
              Book Now
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" fullWidth iconName="Heart" iconPosition="left">
                Save
              </Button>
              <Button variant="outline" fullWidth iconName="Share" iconPosition="left">
                Share
              </Button>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="text-center pt-4 border-t border-border">
            <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Shield" size={14} />
                <span>Secure booking</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span>Instant confirmation</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Free cancellation until 24 hours before check-in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;