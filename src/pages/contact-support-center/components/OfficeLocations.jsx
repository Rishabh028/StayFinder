import React, { useState } from 'react';
import Icon from '../../../components/Appicon';
import {Button} from '../../../components/ui/Button';

const OfficeLocations = () => {
  const [selectedOffice, setSelectedOffice] = useState(null);

  const offices = [
  {
    id: 'headquarters',
    name: 'Global Headquarters',
    city: 'San Francisco',
    country: 'United States',
    address: {
      street: '123 Market Street, Suite 400',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'United States'
    },
    coordinates: { lat: 37.7749, lng: -122.4194 },
    phone: '+1-415-555-0100',
    email: 'sf@stayfinder.pro',
    departments: ['Executive', 'Product Development', 'Engineering', 'Customer Success'],
    hours: {
      weekdays: '8:00 AM - 6:00 PM PST',
      weekend: 'Closed',
      timezone: 'Pacific Standard Time'
    },
    languages: ['English', 'Spanish', 'Chinese'],
    image: "https://images.unsplash.com/photo-1624897675037-5cd04627fb5f",
    alt: 'Modern glass office building in downtown San Francisco financial district'
  },
  {
    id: 'london',
    name: 'European Operations',
    city: 'London',
    country: 'United Kingdom',
    address: {
      street: '25 Old Broad Street, Floor 12',
      city: 'London',
      state: '',
      zip: 'EC2N 1HQ',
      country: 'United Kingdom'
    },
    coordinates: { lat: 51.5074, lng: -0.1278 },
    phone: '+44-20-7946-0958',
    email: 'london@stayfinder.pro',
    departments: ['European Sales', 'Customer Support', 'Partnership Development'],
    hours: {
      weekdays: '9:00 AM - 5:30 PM GMT',
      weekend: 'Closed',
      timezone: 'Greenwich Mean Time'
    },
    languages: ['English', 'French', 'German', 'Italian', 'Spanish'],
    image: "https://images.unsplash.com/photo-1731426918682-1fd58019b580",
    alt: 'Historic London office building with modern glass facade in financial district'
  },
  {
    id: 'singapore',
    name: 'Asia Pacific Hub',
    city: 'Singapore',
    country: 'Singapore',
    address: {
      street: '1 Raffles Place, Tower 2, Level 18',
      city: 'Singapore',
      state: '',
      zip: '048616',
      country: 'Singapore'
    },
    coordinates: { lat: 1.3521, lng: 103.8198 },
    phone: '+65-6789-1234',
    email: 'singapore@stayfinder.pro',
    departments: ['APAC Operations', 'Regional Partnerships', 'Customer Support'],
    hours: {
      weekdays: '9:00 AM - 6:00 PM SGT',
      weekend: 'Saturday 10:00 AM - 2:00 PM',
      timezone: 'Singapore Standard Time'
    },
    languages: ['English', 'Mandarin', 'Japanese', 'Korean', 'Bahasa'],
    image: "https://images.unsplash.com/photo-1629595005874-c995fed7dfa8",
    alt: 'Ultra-modern skyscraper office building in Singapore business district with city skyline'
  },
  {
    id: 'sydney',
    name: 'Australia & New Zealand',
    city: 'Sydney',
    country: 'Australia',
    address: {
      street: '200 George Street, Level 25',
      city: 'Sydney',
      state: 'NSW',
      zip: '2000',
      country: 'Australia'
    },
    coordinates: { lat: -33.8688, lng: 151.2093 },
    phone: '+61-2-9876-5432',
    email: 'sydney@stayfinder.pro',
    departments: ['ANZ Operations', 'Customer Experience', 'Local Partnerships'],
    hours: {
      weekdays: '8:30 AM - 5:30 PM AEST',
      weekend: 'Closed',
      timezone: 'Australian Eastern Standard Time'
    },
    languages: ['English', 'Mandarin'],
    image: "https://images.unsplash.com/photo-1487856206624-a89083c6725e",
    alt: 'Contemporary office tower with harbor views in Sydney central business district'
  }];


  const getDirectionsUrl = (office) => {
    const address = `${office?.address?.street}, ${office?.address?.city}, ${office?.address?.country}`;
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  };

  const formatFullAddress = (address) => {
    return `${address?.street}, ${address?.city}${address?.state ? `, ${address?.state}` : ''} ${address?.zip}, ${address?.country}`;
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Global Office Locations</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Visit us in person at any of our global offices. Our teams are ready to assist with 
            partnerships, business inquiries, and in-person support across different time zones.
          </p>
        </div>

        {/* Office Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {offices?.map((office) =>
          <div
            key={office?.id}
            className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-brand-lg transition-all duration-300 hover:scale-[1.02]">

              {/* Office Image */}
              <div className="relative h-48">
                <img
                src={office?.image}
                alt={office?.alt}
                className="w-full h-full object-cover" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{office?.name}</h3>
                  <p className="text-sm opacity-90">{office?.city}, {office?.country}</p>
                </div>
              </div>

              <div className="p-6">
                {/* Address */}
                <div className="mb-4">
                  <div className="flex items-start space-x-2 mb-2">
                    <Icon name="MapPin" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Address</p>
                      <p className="text-sm text-muted-foreground">{formatFullAddress(office?.address)}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Phone" size={16} className="text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="text-sm font-medium text-foreground">{office?.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Mail" size={16} className="text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm font-medium text-foreground">{office?.email}</p>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="mb-4">
                  <div className="flex items-start space-x-2">
                    <Icon name="Clock" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Business Hours</p>
                      <p className="text-sm font-medium text-foreground">{office?.hours?.weekdays}</p>
                      <p className="text-sm text-muted-foreground">{office?.hours?.weekend}</p>
                      <p className="text-xs text-muted-foreground mt-1">({office?.hours?.timezone})</p>
                    </div>
                  </div>
                </div>

                {/* Departments */}
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2">Departments</p>
                  <div className="flex flex-wrap gap-1">
                    {office?.departments?.map((dept, index) =>
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">

                        {dept}
                      </span>
                  )}
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-6">
                  <p className="text-xs text-muted-foreground mb-2">Languages Supported</p>
                  <div className="flex flex-wrap gap-1">
                    {office?.languages?.map((language, index) =>
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">

                        {language}
                      </span>
                  )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => window.open(getDirectionsUrl(office), '_blank')}>

                    <Icon name="Navigation" size={16} className="mr-1" />
                    Get Directions
                  </Button>
                  <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1"
                  onClick={() => setSelectedOffice(selectedOffice === office?.id ? null : office?.id)}>

                    <Icon name="Info" size={16} className="mr-1" />
                    {selectedOffice === office?.id ? 'Hide Details' : 'More Info'}
                  </Button>
                </div>

                {/* Expanded Details */}
                {selectedOffice === office?.id &&
              <div className="mt-4 pt-4 border-t border-border">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">What to Expect</p>
                        <p className="text-sm text-muted-foreground">
                          Our {office?.city} office provides full-service support including business consultations, 
                          partnership discussions, and technical assistance. Please schedule an appointment for 
                          guaranteed availability.
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">Visitor Information</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Photo ID required for building access</li>
                          <li>• Reception will direct you to the appropriate team</li>
                          <li>• Parking available (fees may apply)</li>
                          <li>• Wheelchair accessible facilities</li>
                        </ul>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Icon name="Calendar" size={16} className="mr-1" />
                          Schedule Visit
                        </Button>
                        <Button variant="ghost" size="sm" className="flex-1">
                          <Icon name="Phone" size={16} className="mr-1" />
                          Call Office
                        </Button>
                      </div>
                    </div>
                  </div>
              }
              </div>
            </div>
          )}
        </div>

        {/* Interactive Map Placeholder */}
        <div className="bg-background border border-border rounded-lg p-8 text-center">
          <div className="max-w-md mx-auto">
            <Icon name="Map" size={48} className="mx-auto text-primary mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Interactive Office Map</h3>
            <p className="text-muted-foreground mb-6">
              View all our office locations on an interactive map with detailed directions, 
              nearby landmarks, and public transportation options.
            </p>
            <Button size="lg">
              <Icon name="ExternalLink" size={18} className="mr-2" />
              Open Interactive Map
            </Button>
          </div>
        </div>

        {/* Contact Options */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-background border border-border rounded-lg">
            <Icon name="Calendar" size={24} className="mx-auto text-primary mb-3" />
            <h4 className="font-semibold text-foreground mb-2">Schedule a Visit</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Book an appointment to ensure our team is available for your specific needs.
            </p>
            <Button variant="outline" size="sm" fullWidth>
              Schedule Appointment
            </Button>
          </div>

          <div className="text-center p-6 bg-background border border-border rounded-lg">
            <Icon name="Video" size={24} className="mx-auto text-primary mb-3" />
            <h4 className="font-semibold text-foreground mb-2">Virtual Meeting</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Can't visit in person? Schedule a video call with our team instead.
            </p>
            <Button variant="outline" size="sm" fullWidth>
              Book Video Call
            </Button>
          </div>

          <div className="text-center p-6 bg-background border border-border rounded-lg">
            <Icon name="MessageSquare" size={24} className="mx-auto text-primary mb-3" />
            <h4 className="font-semibold text-foreground mb-2">Business Inquiries</h4>
            <p className="text-sm text-muted-foreground mb-4">
              General business questions? Contact our business development team.
            </p>
            <Button variant="outline" size="sm" fullWidth>
              Contact Business Team
            </Button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-blue-700 font-medium mb-1">Planning a Visit?</p>
              <p className="text-blue-600">
                All offices require advance notice for security purposes. Please call or email before visiting. 
                Business hours may vary during holidays and special events. Current COVID-19 safety protocols apply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default OfficeLocations;