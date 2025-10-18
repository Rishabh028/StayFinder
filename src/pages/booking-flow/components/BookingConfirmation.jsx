import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/Appicon';
import Image from '../../../components/Appimage';
import { Button } from '../../../components/ui/Button';

const BookingConfirmation = ({ bookingData }) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [bookingReference] = useState(`SF${Date.now()?.toString()?.slice(-8)}`);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'Oct 20, 2025';
    return new Date(dateString)?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Hotel Booking Confirmed!',
          text: `Just booked ${bookingData?.selectedRoom?.name} at StayFinder Pro! Booking reference: ${bookingReference}`,
          url: window.location?.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard?.writeText(`My hotel booking is confirmed! Reference: ${bookingReference}`);
      alert('Booking details copied to clipboard!');
    }
  };

  const nextSteps = [
    {
      icon: 'Mail',
      title: 'Check Your Email',
      description: 'Confirmation details sent to your email address',
      action: 'View in inbox'
    },
    {
      icon: 'Calendar',
      title: 'Add to Calendar',
      description: 'Save your travel dates and check-in reminders',
      action: 'Add event'
    },
    {
      icon: 'MapPin',
      title: 'Get Directions',
      description: 'Plan your route to the hotel location',
      action: 'Open maps'
    },
    {
      icon: 'Phone',
      title: 'Contact Hotel',
      description: 'Call directly for special requests or questions',
      action: 'Call now'
    }
  ];

  const importantInfo = [
    {
      icon: 'Clock',
      title: 'Check-in Time',
      value: '3:00 PM onwards',
      description: 'Early check-in subject to availability'
    },
    {
      icon: 'Clock',
      title: 'Check-out Time',
      value: '11:00 AM',
      description: 'Late check-out available for additional fee'
    },
    {
      icon: 'CreditCard',
      title: 'Payment Status',
      value: 'Confirmed',
      description: `Transaction ID: ${bookingData?.paymentInfo?.transactionId || 'TXN123456789'}`
    },
    {
      icon: 'Shield',
      title: 'Cancellation',
      value: 'Free until 24h before',
      description: 'Full refund if cancelled before deadline'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="relative">
          <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Check" size={40} color="white" />
          </div>
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="animate-bounce text-2xl">🎉</div>
            </div>
          )}
        </div>
        
        <h1 className="text-brand-hero text-success mb-2">Booking Confirmed!</h1>
        <p className="text-brand-body text-muted-foreground mb-4">
          Your reservation has been successfully processed
        </p>
        
        <div className="bg-success/10 border border-success/20 rounded-lg p-4 inline-block">
          <div className="flex items-center gap-2">
            <Icon name="Hash" size={20} className="text-success" />
            <span className="text-lg font-bold text-success">Booking Reference: {bookingReference}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hotel & Room Details */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Your Reservation</h2>
            
            {bookingData?.selectedRoom && (
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-48 flex-shrink-0">
                  <div className="relative overflow-hidden rounded-lg h-32 md:h-full">
                    <Image
                      src={bookingData?.selectedRoom?.image}
                      alt={bookingData?.selectedRoom?.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {bookingData?.selectedRoom?.name}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-muted-foreground">Check-in:</span>
                      <p className="font-medium text-foreground">
                        {formatDate(bookingData?.checkIn)}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Check-out:</span>
                      <p className="font-medium text-foreground">
                        {formatDate(bookingData?.checkOut)}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <p className="font-medium text-foreground">
                        {bookingData?.nights || 3} nights
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Guests:</span>
                      <p className="font-medium text-foreground">
                        {bookingData?.guests || 2} adults
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {bookingData?.selectedRoom?.amenities?.slice(0, 4)?.map((amenity) => (
                      <span
                        key={amenity}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground"
                      >
                        <Icon name="Check" size={12} />
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Guest Information */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Guest Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-foreground mb-2">Primary Guest</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-foreground">
                    {bookingData?.guestInfo?.firstName} {bookingData?.guestInfo?.lastName}
                  </p>
                  <p className="text-muted-foreground">{bookingData?.guestInfo?.email}</p>
                  <p className="text-muted-foreground">{bookingData?.guestInfo?.phone}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-2">Travel Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Arrival Time:</span>
                    <span className="text-foreground capitalize">
                      {bookingData?.guestInfo?.arrivalTime || 'Flexible'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Purpose:</span>
                    <span className="text-foreground capitalize">
                      {bookingData?.guestInfo?.purpose || 'Leisure'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {bookingData?.guestInfo?.specialRequests && (
              <div className="mt-4 pt-4 border-t border-border">
                <h3 className="font-medium text-foreground mb-2">Special Requests</h3>
                <p className="text-sm text-muted-foreground">
                  {bookingData?.guestInfo?.specialRequests}
                </p>
              </div>
            )}
          </div>

          {/* Important Information */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Important Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {importantInfo?.map((info) => (
                <div key={info?.title} className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                    <Icon name={info?.icon} size={16} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground text-sm">{info?.title}</h3>
                    <p className="text-sm text-foreground font-medium">{info?.value}</p>
                    <p className="text-xs text-muted-foreground">{info?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">What's Next?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nextSteps?.map((step) => (
                <div
                  key={step?.title}
                  className="flex items-center gap-3 p-3 border border-border rounded-lg hover:border-primary/50 transition-brand cursor-pointer"
                >
                  <div className="p-2 bg-muted rounded-lg">
                    <Icon name={step?.icon} size={16} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground text-sm">{step?.title}</h3>
                    <p className="text-xs text-muted-foreground">{step?.description}</p>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <Button
                variant="default"
                fullWidth
                iconName="Download"
                iconPosition="left"
              >
                Download Confirmation
              </Button>
              
              <Button
                variant="outline"
                fullWidth
                onClick={handleShare}
                iconName="Share"
                iconPosition="left"
              >
                Share Booking
              </Button>
              
              <Link to="/user-dashboard">
                <Button
                  variant="outline"
                  fullWidth
                  iconName="User"
                  iconPosition="left"
                >
                  View Dashboard
                </Button>
              </Link>
              
              <Button
                variant="ghost"
                fullWidth
                iconName="MessageCircle"
                iconPosition="left"
              >
                Contact Support
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <h4 className="font-medium text-foreground mb-3">Need Help?</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={14} className="text-primary" />
                  <span className="text-muted-foreground">24/7 Support:</span>
                  <span className="text-foreground font-medium">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={14} className="text-primary" />
                  <span className="text-muted-foreground">Email:</span>
                  <span className="text-foreground font-medium">support@stayfinder.com</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Star" size={16} className="text-warning" />
                  <span className="font-medium text-foreground text-sm">Rate Your Experience</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Help other travelers by sharing your booking experience
                </p>
                <Button variant="outline" size="sm" fullWidth>
                  Leave Review
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Continue Exploring */}
      <div className="mt-12 pt-8 border-t border-border text-center">
        <h2 className="text-xl font-semibold text-foreground mb-4">Continue Exploring</h2>
        <p className="text-muted-foreground mb-6">
          Discover more amazing destinations for your next trip
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/search-results">
            <Button variant="outline" iconName="Search" iconPosition="left">
              Browse More Hotels
            </Button>
          </Link>
          <Link to="/homepage">
            <Button variant="default" iconName="Home" iconPosition="left">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;