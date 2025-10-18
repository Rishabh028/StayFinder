import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ProgressIndicator from './components/ProgressIndicator';
import RoomSelection from './components/RoomSelection';
import GuestDetails from './components/GuestDetails';
import PaymentSection from './components/PaymentSection';
import BookingConfirmation from './components/BookingConfirmation';

const BookingFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingData, setBookingData] = useState({
    selectedRoom: null,
    guestInfo: {},
    paymentInfo: {},
    checkIn: 'Oct 20, 2025',
    checkOut: 'Oct 23, 2025',
    nights: 3,
    guests: 2,
    totalPrice: 0
  });

  const steps = [
    {
      id: 'room-selection',
      title: 'Select Room',
      description: 'Choose your perfect room',
      component: RoomSelection
    },
    {
      id: 'guest-details',
      title: 'Guest Details',
      description: 'Enter your information',
      component: GuestDetails
    },
    {
      id: 'payment',
      title: 'Payment',
      description: 'Secure payment processing',
      component: PaymentSection
    },
    {
      id: 'confirmation',
      title: 'Confirmation',
      description: 'Booking confirmed',
      component: BookingConfirmation
    }
  ];

  // Save booking data to localStorage for persistence
  useEffect(() => {
    const savedBookingData = localStorage.getItem('bookingFlowData');
    if (savedBookingData) {
      try {
        const parsedData = JSON.parse(savedBookingData);
        setBookingData(prev => ({ ...prev, ...parsedData }));
      } catch (error) {
        console.error('Error parsing saved booking data:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bookingFlowData', JSON.stringify(bookingData));
  }, [bookingData]);

  // Handle browser back button and prevent accidental navigation
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (currentStep > 0 && currentStep < steps?.length - 1) {
        e?.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e?.returnValue;
      }
    };

    const handlePopState = (e) => {
      if (currentStep > 0 && currentStep < steps?.length - 1) {
        const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave?');
        if (!confirmLeave) {
          window.history?.pushState(null, '', window.location?.href);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    // Push state to handle back button
    window.history?.pushState(null, '', window.location?.href);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentStep, steps?.length]);

  const handleNext = () => {
    if (currentStep < steps?.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStepClick = (stepIndex) => {
    // Only allow navigation to previous steps or current step
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const CurrentStepComponent = steps?.[currentStep]?.component;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Progress Indicator - Hide on confirmation step */}
      {currentStep < steps?.length - 1 && (
        <ProgressIndicator 
          currentStep={currentStep} 
          steps={steps}
          onStepClick={handleStepClick}
        />
      )}
      {/* Main Content */}
      <main className="pt-16">
        <CurrentStepComponent
          onNext={handleNext}
          onBack={handleBack}
          bookingData={bookingData}
          setBookingData={setBookingData}
          currentStep={currentStep}
          totalSteps={steps?.length}
        />
      </main>
      {/* Floating Help Button */}
      {currentStep < steps?.length - 1 && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-brand-lg hover-lift flex items-center justify-center transition-brand"
            title="Need help?"
            onClick={() => {
              // In a real app, this would open a help chat or modal
              alert('Help is available 24/7 at +1 (555) 123-4567 or support@stayfinder.com');
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <point cx="12" cy="17" r="1"/>
            </svg>
          </button>
        </div>
      )}
      {/* Security Badge */}
      {currentStep === 2 && (
        <div className="fixed bottom-6 left-6 z-40">
          <div className="bg-card border border-border rounded-lg p-3 shadow-brand-md">
            <div className="flex items-center gap-2 text-sm">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-success"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
              <span className="text-muted-foreground">SSL Secured</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingFlow;