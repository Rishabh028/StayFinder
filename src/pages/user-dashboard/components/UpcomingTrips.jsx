import React from 'react';
import Icon from '../../../components/Appicon';
import Image from '../../../components/Appimage';
import {Button} from '../../../components/ui/Button';

const UpcomingTrips = () => {
  const upcomingTrips = [
  {
    id: 1,
    hotelName: "Grand Plaza Hotel",
    location: "New York, NY",
    checkIn: "2025-10-25",
    checkOut: "2025-10-28",
    nights: 3,
    guests: 2,
    roomType: "Deluxe King Room",
    bookingRef: "SP-2025-001234",
    status: "confirmed",
    image: "https://images.unsplash.com/photo-1677129667171-92abd8740fa3",
    imageAlt: "Luxurious hotel lobby with marble floors and crystal chandelier",
    totalAmount: "$1,247.50",
    canModify: true,
    canCancel: true
  },
  {
    id: 2,
    hotelName: "Seaside Resort & Spa",
    location: "Miami Beach, FL",
    checkIn: "2025-11-15",
    checkOut: "2025-11-20",
    nights: 5,
    guests: 4,
    roomType: "Ocean View Suite",
    bookingRef: "SP-2025-001567",
    status: "confirmed",
    image: "https://images.unsplash.com/photo-1667419618416-f4714126bb87",
    imageAlt: "Beachfront resort with palm trees and ocean view at sunset",
    totalAmount: "$2,890.00",
    canModify: true,
    canCancel: true
  }];


  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Upcoming Trips</h2>
          <Button variant="ghost" size="sm">
            <Icon name="Plus" size={16} />
            Book New Trip
          </Button>
        </div>
      </div>
      <div className="p-6">
        {upcomingTrips?.length > 0 ?
        <div className="space-y-6">
            {upcomingTrips?.map((trip) =>
          <div key={trip?.id} className="border border-border rounded-lg overflow-hidden hover-lift">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-64 h-48 lg:h-auto">
                    <Image
                  src={trip?.image}
                  alt={trip?.imageAlt}
                  className="w-full h-full object-cover" />

                  </div>
                  
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{trip?.hotelName}</h3>
                        <p className="text-muted-foreground flex items-center mt-1">
                          <Icon name="MapPin" size={16} className="mr-1" />
                          {trip?.location}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(trip?.status)}`}>
                        {trip?.status?.charAt(0)?.toUpperCase() + trip?.status?.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Icon name="Calendar" size={16} className="mr-2" />
                        <div>
                          <p className="font-medium text-foreground">{formatDate(trip?.checkIn)}</p>
                          <p>Check-in</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Icon name="Calendar" size={16} className="mr-2" />
                        <div>
                          <p className="font-medium text-foreground">{formatDate(trip?.checkOut)}</p>
                          <p>Check-out</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Icon name="Users" size={16} className="mr-2" />
                        <div>
                          <p className="font-medium text-foreground">{trip?.guests} Guests</p>
                          <p>{trip?.nights} nights</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Room: {trip?.roomType}</p>
                        <p className="text-sm text-muted-foreground">Booking: {trip?.bookingRef}</p>
                        <p className="text-lg font-semibold text-foreground mt-1">{trip?.totalAmount}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Icon name="Eye" size={16} />
                          View Details
                        </Button>
                        {trip?.canModify &&
                    <Button variant="outline" size="sm">
                            <Icon name="Edit" size={16} />
                            Modify
                          </Button>
                    }
                        {trip?.canCancel &&
                    <Button variant="outline" size="sm">
                            <Icon name="X" size={16} />
                            Cancel
                          </Button>
                    }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          )}
          </div> :

        <div className="text-center py-12">
            <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Upcoming Trips</h3>
            <p className="text-muted-foreground mb-4">Start planning your next adventure!</p>
            <Button variant="default">
              <Icon name="Plus" size={16} />
              Book Your First Trip
            </Button>
          </div>
        }
      </div>
    </div>);

};

export default UpcomingTrips;