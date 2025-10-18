import React, { useState } from 'react';
import Icon from '../../../components/Appicon';
import Image from '../../../components/Appimage';
import {Button} from '../../../components/ui/Button';

const BookingHistory = () => {
  const [filter, setFilter] = useState('all');

  const bookingHistory = [
  {
    id: 1,
    hotelName: "The Ritz-Carlton",
    location: "San Francisco, CA",
    checkIn: "2025-09-15",
    checkOut: "2025-09-18",
    nights: 3,
    guests: 2,
    roomType: "Premium King Room",
    bookingRef: "SP-2025-000987",
    status: "completed",
    image: "https://images.unsplash.com/photo-1630142346495-8c0aa0c87842",
    imageAlt: "Elegant hotel room with king bed and city view through large windows",
    totalAmount: "$1,890.00",
    rating: null,
    canReview: true
  },
  {
    id: 2,
    hotelName: "Mountain View Lodge",
    location: "Aspen, CO",
    checkIn: "2025-08-10",
    checkOut: "2025-08-14",
    nights: 4,
    guests: 4,
    roomType: "Family Suite",
    bookingRef: "SP-2025-000756",
    status: "completed",
    image: "https://images.unsplash.com/photo-1628620801061-51e05d0ad917",
    imageAlt: "Rustic mountain lodge with wooden exterior surrounded by pine trees",
    totalAmount: "$2,340.00",
    rating: 5,
    canReview: false,
    reviewText: "Amazing stay with breathtaking mountain views!"
  },
  {
    id: 3,
    hotelName: "Urban Boutique Hotel",
    location: "Chicago, IL",
    checkIn: "2025-07-22",
    checkOut: "2025-07-25",
    nights: 3,
    guests: 1,
    roomType: "Deluxe Single",
    bookingRef: "SP-2025-000543",
    status: "completed",
    image: "https://images.unsplash.com/photo-1591050811054-a486e5b90512",
    imageAlt: "Modern boutique hotel lobby with contemporary art and stylish furniture",
    totalAmount: "$987.50",
    rating: 4,
    canReview: false,
    reviewText: "Great location and modern amenities. Highly recommended!"
  },
  {
    id: 4,
    hotelName: "Beachfront Paradise",
    location: "Cancun, Mexico",
    checkIn: "2025-06-05",
    checkOut: "2025-06-12",
    nights: 7,
    guests: 2,
    roomType: "Ocean View Suite",
    bookingRef: "SP-2025-000321",
    status: "cancelled",
    image: "https://images.unsplash.com/photo-1715314681958-e6d991903e17",
    imageAlt: "Tropical beachfront resort with white sand beach and turquoise water",
    totalAmount: "$3,450.00",
    rating: null,
    canReview: false,
    cancellationReason: "Travel restrictions"
  }];


  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'no-show':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBookings = bookingHistory?.filter((booking) => {
    if (filter === 'all') return true;
    return booking?.status === filter;
  });

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) =>
    <Icon
      key={index}
      name="Star"
      size={16}
      className={index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} />

    );
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Booking History</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant={filter === 'all' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilter('all')}>

              All
            </Button>
            <Button
              variant={filter === 'completed' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilter('completed')}>

              Completed
            </Button>
            <Button
              variant={filter === 'cancelled' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilter('cancelled')}>

              Cancelled
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        {filteredBookings?.length > 0 ?
        <div className="space-y-6">
            {filteredBookings?.map((booking) =>
          <div key={booking?.id} className="border border-border rounded-lg overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-64 h-48 lg:h-auto">
                    <Image
                  src={booking?.image}
                  alt={booking?.imageAlt}
                  className="w-full h-full object-cover" />

                  </div>
                  
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{booking?.hotelName}</h3>
                        <p className="text-muted-foreground flex items-center mt-1">
                          <Icon name="MapPin" size={16} className="mr-1" />
                          {booking?.location}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking?.status)}`}>
                        {booking?.status?.charAt(0)?.toUpperCase() + booking?.status?.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="text-sm">
                        <p className="text-muted-foreground">Check-in</p>
                        <p className="font-medium text-foreground">{formatDate(booking?.checkIn)}</p>
                      </div>
                      <div className="text-sm">
                        <p className="text-muted-foreground">Check-out</p>
                        <p className="font-medium text-foreground">{formatDate(booking?.checkOut)}</p>
                      </div>
                      <div className="text-sm">
                        <p className="text-muted-foreground">Duration</p>
                        <p className="font-medium text-foreground">{booking?.nights} nights, {booking?.guests} guests</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Room: {booking?.roomType}</p>
                        <p className="text-sm text-muted-foreground">Booking: {booking?.bookingRef}</p>
                        <p className="text-lg font-semibold text-foreground mt-1">{booking?.totalAmount}</p>
                        
                        {booking?.status === 'cancelled' && booking?.cancellationReason &&
                    <p className="text-sm text-red-600 mt-1">Reason: {booking?.cancellationReason}</p>
                    }
                      </div>
                      
                      <div className="flex flex-col items-end space-y-2">
                        {booking?.rating &&
                    <div className="flex items-center space-x-1">
                            {renderStars(booking?.rating)}
                            <span className="text-sm text-muted-foreground ml-2">Your Rating</span>
                          </div>
                    }
                        
                        {booking?.reviewText &&
                    <p className="text-sm text-muted-foreground italic max-w-xs text-right">
                            "{booking?.reviewText}"
                          </p>
                    }
                        
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Icon name="Eye" size={16} />
                            View Details
                          </Button>
                          {booking?.canReview &&
                      <Button variant="default" size="sm">
                              <Icon name="Star" size={16} />
                              Write Review
                            </Button>
                      }
                          {booking?.status === 'completed' &&
                      <Button variant="outline" size="sm">
                              <Icon name="RotateCcw" size={16} />
                              Book Again
                            </Button>
                      }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          )}
          </div> :

        <div className="text-center py-12">
            <Icon name="Clock" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Booking History</h3>
            <p className="text-muted-foreground mb-4">Your completed bookings will appear here.</p>
            <Button variant="default">
              <Icon name="Search" size={16} />
              Find Hotels
            </Button>
          </div>
        }
      </div>
    </div>);

};

export default BookingHistory;