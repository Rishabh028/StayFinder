import React, { useState } from 'react';
import Icon from '../../../components/Appicon';
import { Input } from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import { Button } from '../../../components/ui/Button';

const PaymentSection = ({ onNext, onBack, bookingData, setBookingData }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
    ...bookingData?.paymentInfo?.cardDetails
  });
  const [billingAddress, setBillingAddress] = useState({
    sameAsGuest: true,
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    ...bookingData?.paymentInfo?.billingAddress
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: 'CreditCard',
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: 'Wallet',
      description: 'Pay with your PayPal account'
    },
    {
      id: 'razorpay',
      name: 'Razorpay',
      icon: 'Smartphone',
      description: 'UPI, Net Banking, Wallets'
    },
    {
      id: 'stripe',
      name: 'Stripe',
      icon: 'Shield',
      description: 'Secure payment processing'
    }
  ];

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1)?.padStart(2, '0'),
    label: String(i + 1)?.padStart(2, '0')
  }));

  const years = Array.from({ length: 10 }, (_, i) => ({
    value: String(new Date()?.getFullYear() + i),
    label: String(new Date()?.getFullYear() + i)
  }));

  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'in', label: 'India' }
  ];

  const handleCardInputChange = (field, value) => {
    let formattedValue = value;
    
    if (field === 'cardNumber') {
      formattedValue = value?.replace(/\s/g, '')?.replace(/(.{4})/g, '$1 ')?.trim();
      if (formattedValue?.length > 19) formattedValue = formattedValue?.slice(0, 19);
    } else if (field === 'cvv') {
      formattedValue = value?.replace(/\D/g, '')?.slice(0, 4);
    }

    setCardDetails(prev => ({ ...prev, [field]: formattedValue }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBillingAddressChange = (field, value) => {
    setBillingAddress(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validatePayment = () => {
    const newErrors = {};

    if (paymentMethod === 'card') {
      if (!cardDetails?.cardholderName?.trim()) {
        newErrors.cardholderName = 'Cardholder name is required';
      }

      if (!cardDetails?.cardNumber?.replace(/\s/g, '')) {
        newErrors.cardNumber = 'Card number is required';
      } else if (cardDetails?.cardNumber?.replace(/\s/g, '')?.length < 13) {
        newErrors.cardNumber = 'Please enter a valid card number';
      }

      if (!cardDetails?.expiryMonth) {
        newErrors.expiryMonth = 'Expiry month is required';
      }

      if (!cardDetails?.expiryYear) {
        newErrors.expiryYear = 'Expiry year is required';
      }

      if (!cardDetails?.cvv) {
        newErrors.cvv = 'CVV is required';
      } else if (cardDetails?.cvv?.length < 3) {
        newErrors.cvv = 'Please enter a valid CVV';
      }

      if (!billingAddress?.sameAsGuest) {
        if (!billingAddress?.address?.trim()) {
          newErrors.address = 'Address is required';
        }
        if (!billingAddress?.city?.trim()) {
          newErrors.city = 'City is required';
        }
        if (!billingAddress?.zipCode?.trim()) {
          newErrors.zipCode = 'ZIP code is required';
        }
        if (!billingAddress?.country) {
          newErrors.country = 'Country is required';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handlePayment = async () => {
    if (!validatePayment()) return;

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setBookingData(prev => ({
        ...prev,
        paymentInfo: {
          method: paymentMethod,
          cardDetails: paymentMethod === 'card' ? cardDetails : null,
          billingAddress,
          transactionId: `TXN${Date.now()}`,
          status: 'completed'
        }
      }));
      setIsProcessing(false);
      onNext();
    }, 3000);
  };

  const handleDemoFill = () => {
    setCardDetails({
      cardholderName: 'John Smith',
      cardNumber: '4532 1234 5678 9012',
      expiryMonth: '12',
      expiryYear: '2027',
      cvv: '123'
    });
  };

  const calculateTotal = () => {
    const roomPrice = bookingData?.selectedRoom?.price || 299;
    const nights = bookingData?.nights || 3;
    const subtotal = roomPrice * nights;
    const taxes = Math.round(subtotal * 0.12);
    const serviceFee = 25;
    return {
      subtotal,
      taxes,
      serviceFee,
      total: subtotal + taxes + serviceFee
    };
  };

  const pricing = calculateTotal();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-brand-heading mb-2">Payment Details</h2>
            <p className="text-brand-body text-muted-foreground">
              Secure payment processing with multiple options
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Shield" size={16} className="text-success" />
            <span>SSL Secured</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Payment Method Selection */}
          <div className="bg-card border border-border rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Payment Method</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentMethods?.map((method) => (
                <div
                  key={method?.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-brand ${
                    paymentMethod === method?.id
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setPaymentMethod(method?.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      paymentMethod === method?.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}>
                      <Icon name={method?.icon} size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{method?.name}</h4>
                      <p className="text-xs text-muted-foreground">{method?.description}</p>
                    </div>
                    <Icon
                      name={paymentMethod === method?.id ? "CheckCircle2" : "Circle"}
                      size={20}
                      className={paymentMethod === method?.id ? "text-primary" : "text-muted-foreground"}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card Details */}
          {paymentMethod === 'card' && (
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Card Details</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDemoFill}
                  iconName="Zap"
                  iconPosition="left"
                >
                  Demo Fill
                </Button>
              </div>

              <div className="space-y-4">
                <Input
                  label="Cardholder Name"
                  type="text"
                  placeholder="Name as it appears on card"
                  value={cardDetails?.cardholderName}
                  onChange={(e) => handleCardInputChange('cardholderName', e?.target?.value)}
                  error={errors?.cardholderName}
                  required
                />

                <Input
                  label="Card Number"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails?.cardNumber}
                  onChange={(e) => handleCardInputChange('cardNumber', e?.target?.value)}
                  error={errors?.cardNumber}
                  required
                />

                <div className="grid grid-cols-3 gap-4">
                  <Select
                    label="Month"
                    placeholder="MM"
                    options={months}
                    value={cardDetails?.expiryMonth}
                    onChange={(value) => handleCardInputChange('expiryMonth', value)}
                    error={errors?.expiryMonth}
                    required
                  />
                  
                  <Select
                    label="Year"
                    placeholder="YYYY"
                    options={years}
                    value={cardDetails?.expiryYear}
                    onChange={(value) => handleCardInputChange('expiryYear', value)}
                    error={errors?.expiryYear}
                    required
                  />

                  <Input
                    label="CVV"
                    type="text"
                    placeholder="123"
                    value={cardDetails?.cvv}
                    onChange={(e) => handleCardInputChange('cvv', e?.target?.value)}
                    error={errors?.cvv}
                    description="3-4 digits on back"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Alternative Payment Methods */}
          {paymentMethod !== 'card' && (
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={paymentMethods?.find(m => m?.id === paymentMethod)?.icon} size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {paymentMethods?.find(m => m?.id === paymentMethod)?.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  You will be redirected to complete your payment securely
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-success">
                  <Icon name="Shield" size={16} />
                  <span>256-bit SSL encryption</span>
                </div>
              </div>
            </div>
          )}

          {/* Billing Address */}
          {paymentMethod === 'card' && (
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Billing Address</h3>
              
              <div className="mb-4">
                <Checkbox
                  label="Same as guest information"
                  checked={billingAddress?.sameAsGuest}
                  onChange={(e) => handleBillingAddressChange('sameAsGuest', e?.target?.checked)}
                />
              </div>

              {!billingAddress?.sameAsGuest && (
                <div className="space-y-4">
                  <Input
                    label="Address"
                    type="text"
                    placeholder="Street address"
                    value={billingAddress?.address}
                    onChange={(e) => handleBillingAddressChange('address', e?.target?.value)}
                    error={errors?.address}
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="City"
                      type="text"
                      placeholder="City"
                      value={billingAddress?.city}
                      onChange={(e) => handleBillingAddressChange('city', e?.target?.value)}
                      error={errors?.city}
                      required
                    />

                    <Input
                      label="ZIP Code"
                      type="text"
                      placeholder="ZIP code"
                      value={billingAddress?.zipCode}
                      onChange={(e) => handleBillingAddressChange('zipCode', e?.target?.value)}
                      error={errors?.zipCode}
                      required
                    />
                  </div>

                  <Select
                    label="Country"
                    placeholder="Select country"
                    options={countries}
                    value={billingAddress?.country}
                    onChange={(value) => handleBillingAddressChange('country', value)}
                    error={errors?.country}
                    searchable
                    required
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-foreground mb-4">Order Summary</h3>
            
            {bookingData?.selectedRoom && (
              <div className="space-y-4">
                <div className="flex items-start gap-3 pb-4 border-b border-border">
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
                      {bookingData?.nights || 3} nights • {bookingData?.guests || 2} guests
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      ${bookingData?.selectedRoom?.price} × {bookingData?.nights || 3} nights
                    </span>
                    <span className="text-foreground">${pricing?.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes & fees</span>
                    <span className="text-foreground">${pricing?.taxes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service fee</span>
                    <span className="text-foreground">${pricing?.serviceFee}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground font-semibold">Total:</span>
                    <span className="text-xl font-bold text-primary">${pricing?.total}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Final amount in USD
                  </p>
                </div>

                <div className="bg-muted/50 rounded-lg p-3 mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Info" size={16} className="text-primary" />
                    <span className="text-foreground font-medium">Free cancellation</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Cancel up to 24 hours before check-in for a full refund
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
          disabled={isProcessing}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Back to Guest Details
        </Button>
        
        <Button
          variant="default"
          size="lg"
          onClick={handlePayment}
          loading={isProcessing}
          iconName={isProcessing ? undefined : "Lock"}
          iconPosition="left"
        >
          {isProcessing ? 'Processing Payment...' : `Pay $${pricing?.total}`}
        </Button>
      </div>
    </div>
  );
};

export default PaymentSection;