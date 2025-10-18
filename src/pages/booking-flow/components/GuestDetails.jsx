import React, { useState, useEffect } from 'react';
import Icon from '../../../components/Appicon';
import { Input } from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import { Button } from '../../../components/ui/Button';

const GuestDetails = ({ onNext, onBack, bookingData, setBookingData }) => {
  const [guestInfo, setGuestInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    specialRequests: '',
    arrivalTime: '',
    purpose: '',
    createAccount: false,
    newsletter: false,
    ...bookingData?.guestInfo
  });

  const [errors, setErrors] = useState({});
  const [isBusinessTravel, setIsBusinessTravel] = useState(false);

  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
    { value: 'in', label: 'India' },
    { value: 'sg', label: 'Singapore' },
    { value: 'ae', label: 'United Arab Emirates' }
  ];

  const arrivalTimes = [
    { value: 'morning', label: 'Morning (6:00 AM - 12:00 PM)' },
    { value: 'afternoon', label: 'Afternoon (12:00 PM - 6:00 PM)' },
    { value: 'evening', label: 'Evening (6:00 PM - 10:00 PM)' },
    { value: 'late', label: 'Late Night (After 10:00 PM)' },
    { value: 'flexible', label: 'Flexible' }
  ];

  const travelPurposes = [
    { value: 'leisure', label: 'Leisure/Vacation' },
    { value: 'business', label: 'Business Travel' },
    { value: 'family', label: 'Family Visit' },
    { value: 'event', label: 'Event/Conference' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    setIsBusinessTravel(guestInfo?.purpose === 'business');
  }, [guestInfo?.purpose]);

  const handleInputChange = (field, value) => {
    setGuestInfo(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!guestInfo?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!guestInfo?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!guestInfo?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(guestInfo?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!guestInfo?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/?.test(guestInfo?.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!guestInfo?.country) {
      newErrors.country = 'Please select your country';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setBookingData(prev => ({
        ...prev,
        guestInfo: guestInfo
      }));
      onNext();
    }
  };

  const handleAutoFill = () => {
    setGuestInfo({
      ...guestInfo,
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      country: 'us',
      arrivalTime: 'afternoon',
      purpose: 'business'
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-brand-heading mb-2">Guest Details</h2>
            <p className="text-brand-body text-muted-foreground">
              Please provide your information for the booking
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAutoFill}
            iconName="Zap"
            iconPosition="left"
          >
            Auto-fill Demo
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Input
                label="First Name"
                type="text"
                placeholder="Enter your first name"
                value={guestInfo?.firstName}
                onChange={(e) => handleInputChange('firstName', e?.target?.value)}
                error={errors?.firstName}
                required
              />
              
              <Input
                label="Last Name"
                type="text"
                placeholder="Enter your last name"
                value={guestInfo?.lastName}
                onChange={(e) => handleInputChange('lastName', e?.target?.value)}
                error={errors?.lastName}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Input
                label="Email Address"
                type="email"
                placeholder="your.email@example.com"
                value={guestInfo?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                error={errors?.email}
                description="Booking confirmation will be sent here"
                required
              />
              
              <Input
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={guestInfo?.phone}
                onChange={(e) => handleInputChange('phone', e?.target?.value)}
                error={errors?.phone}
                description="For booking updates and hotel contact"
                required
              />
            </div>

            <div className="mb-6">
              <Select
                label="Country/Region"
                placeholder="Select your country"
                options={countries}
                value={guestInfo?.country}
                onChange={(value) => handleInputChange('country', value)}
                error={errors?.country}
                searchable
                required
              />
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-6 pt-6 border-t border-border">
              Travel Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Select
                label="Expected Arrival Time"
                placeholder="Select arrival time"
                options={arrivalTimes}
                value={guestInfo?.arrivalTime}
                onChange={(value) => handleInputChange('arrivalTime', value)}
                description="Help us prepare for your arrival"
              />
              
              <Select
                label="Purpose of Travel"
                placeholder="Select travel purpose"
                options={travelPurposes}
                value={guestInfo?.purpose}
                onChange={(value) => handleInputChange('purpose', value)}
                description="For better service customization"
              />
            </div>

            {isBusinessTravel && (
              <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="Briefcase" size={20} className="text-primary" />
                  <h4 className="font-medium text-foreground">Business Travel Details</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Company Name"
                    type="text"
                    placeholder="Your company name"
                    value={guestInfo?.companyName || ''}
                    onChange={(e) => handleInputChange('companyName', e?.target?.value)}
                  />
                  <Input
                    label="Business Purpose"
                    type="text"
                    placeholder="Meeting, conference, etc."
                    value={guestInfo?.businessPurpose || ''}
                    onChange={(e) => handleInputChange('businessPurpose', e?.target?.value)}
                  />
                </div>
              </div>
            )}

            <div className="mb-6">
              <Input
                label="Special Requests (Optional)"
                type="text"
                placeholder="Any special requests or requirements..."
                value={guestInfo?.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e?.target?.value)}
                description="Room preferences, accessibility needs, dietary requirements, etc."
              />
            </div>

            <div className="space-y-4 pt-6 border-t border-border">
              <Checkbox
                label="Create an account for faster future bookings"
                description="Save your details and manage bookings easily"
                checked={guestInfo?.createAccount}
                onChange={(e) => handleInputChange('createAccount', e?.target?.checked)}
              />
              
              <Checkbox
                label="Subscribe to our newsletter for exclusive deals"
                description="Get notified about special offers and travel tips"
                checked={guestInfo?.newsletter}
                onChange={(e) => handleInputChange('newsletter', e?.target?.checked)}
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-foreground mb-4">Booking Summary</h3>
            
            {bookingData?.selectedRoom && (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={bookingData?.selectedRoom?.image}
                      alt={bookingData?.selectedRoom?.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground text-sm">
                      {bookingData?.selectedRoom?.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {bookingData?.selectedRoom?.size} • {bookingData?.selectedRoom?.bedType}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Check-in:</span>
                    <span className="text-foreground font-medium">
                      {bookingData?.checkIn || 'Oct 20, 2025'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Check-out:</span>
                    <span className="text-foreground font-medium">
                      {bookingData?.checkOut || 'Oct 23, 2025'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nights:</span>
                    <span className="text-foreground font-medium">
                      {bookingData?.nights || 3}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Guests:</span>
                    <span className="text-foreground font-medium">
                      {bookingData?.guests || 2} adults
                    </span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground font-semibold">Total:</span>
                    <span className="text-xl font-bold text-primary">
                      ${bookingData?.totalPrice || (bookingData?.selectedRoom?.price * 3)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Includes taxes and fees
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
        <Button
          variant="outline"
          size="lg"
          onClick={onBack}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Back to Room Selection
        </Button>
        
        <Button
          variant="default"
          size="lg"
          onClick={handleNext}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};

export default GuestDetails;