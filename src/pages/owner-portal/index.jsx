import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/Appicon';
import {Button} from '../../components/ui/Button';
import PropertyOverviewCard from './components/PropertyOverviewCard';
import RevenueMetricsCard from './components/RevenueMetricsCard';
import BookingManagementTable from './components/BookingManagementTable';
import AvailabilityCalendar from './components/AvailabilityCalendar';
import PropertyManagementCard from './components/PropertyManagementCard';
import AnalyticsChart from './components/AnalyticsChart';

const OwnerPortal = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Mock data for property overview
  const propertyData = {
    id: 1,
    name: "Grand Plaza Hotel",
    location: "Downtown Manhattan, New York",
    status: "Active",
    totalRooms: 120,
    occupiedRooms: 95,
    availableRooms: 25,
    occupancyRate: 79,
    todayRevenue: "12,450",
    revenueGrowth: 8.5,
    description: `Luxury hotel in the heart of Manhattan offering world-class amenities and exceptional service.\nFeaturing modern rooms with city views, fine dining restaurant, and state-of-the-art fitness center.\nPerfect for business travelers and tourists seeking premium accommodation.`,
    roomTypes: [
    { id: 1, name: "Standard Room", count: 60, basePrice: 299 },
    { id: 2, name: "Deluxe Room", count: 40, basePrice: 399 },
    { id: 3, name: "Executive Suite", count: 15, basePrice: 599 },
    { id: 4, name: "Presidential Suite", count: 5, basePrice: 999 }],

    amenities: [
    { id: 1, name: "Free WiFi", icon: "Wifi", enabled: true },
    { id: 2, name: "Swimming Pool", icon: "Waves", enabled: true },
    { id: 3, name: "Fitness Center", icon: "Dumbbell", enabled: true },
    { id: 4, name: "Restaurant", icon: "UtensilsCrossed", enabled: true },
    { id: 5, name: "Spa Services", icon: "Sparkles", enabled: true },
    { id: 6, name: "Business Center", icon: "Briefcase", enabled: true },
    { id: 7, name: "Parking", icon: "Car", enabled: true },
    { id: 8, name: "Pet Friendly", icon: "Heart", enabled: false },
    { id: 9, name: "Room Service", icon: "Coffee", enabled: true }],

    photos: [
    { url: "https://images.unsplash.com/photo-1607550449989-e0f78408ac4b", alt: "Elegant hotel lobby with marble floors and crystal chandelier" },
    { url: "https://images.unsplash.com/photo-1614340508729-777dbef96d8b", alt: "Luxurious hotel room with king bed and city view" },
    { url: "https://images.unsplash.com/photo-1721523262912-a5f56e00fd2b", alt: "Modern hotel bathroom with marble finishes and rainfall shower" },
    { url: "https://images.unsplash.com/photo-1662472460736-e26f7a49e90a", alt: "Hotel restaurant with elegant dining setup and ambient lighting" }]

  };

  // Mock data for revenue metrics
  const revenueMetrics = {
    totalRevenue: "89,450",
    revenueGrowth: 12.3,
    totalBookings: 156,
    bookingGrowth: 8.7,
    avgBookingValue: "573",
    avgValueDecline: 2.1,
    revPAR: "285",
    adr: "360"
  };

  // Mock data for recent bookings
  const recentBookings = [
  {
    id: 1,
    guestName: "Sarah Johnson",
    guestEmail: "sarah.johnson@email.com",
    roomType: "Deluxe Room",
    roomNumber: "205",
    checkIn: "Oct 18, 2025",
    checkOut: "Oct 22, 2025",
    nights: 4,
    totalAmount: "1,596",
    status: "Confirmed"
  },
  {
    id: 2,
    guestName: "Michael Chen",
    guestEmail: "m.chen@business.com",
    roomType: "Executive Suite",
    roomNumber: "801",
    checkIn: "Oct 20, 2025",
    checkOut: "Oct 23, 2025",
    nights: 3,
    totalAmount: "1,797",
    status: "Checked-in"
  },
  {
    id: 3,
    guestName: "Emily Rodriguez",
    guestEmail: "emily.r@gmail.com",
    roomType: "Standard Room",
    roomNumber: "102",
    checkIn: "Oct 16, 2025",
    checkOut: "Oct 19, 2025",
    nights: 3,
    totalAmount: "897",
    status: "Checked-out"
  },
  {
    id: 4,
    guestName: "David Thompson",
    guestEmail: "d.thompson@company.org",
    roomType: "Presidential Suite",
    roomNumber: "1001",
    checkIn: "Oct 25, 2025",
    checkOut: "Oct 28, 2025",
    nights: 3,
    totalAmount: "2,997",
    status: "Pending"
  },
  {
    id: 5,
    guestName: "Lisa Wang",
    guestEmail: "lisa.wang@tech.com",
    roomType: "Deluxe Room",
    roomNumber: "307",
    checkIn: "Oct 15, 2025",
    checkOut: "Oct 17, 2025",
    nights: 2,
    totalAmount: "798",
    status: "Cancelled"
  }];


  const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'bookings', label: 'Bookings', icon: 'Calendar' },
  { id: 'rooms', label: 'Room Management', icon: 'Bed' },
  { id: 'calendar', label: 'Availability', icon: 'CalendarDays' },
  { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
  { id: 'property', label: 'Property Settings', icon: 'Settings' },
  { id: 'guests', label: 'Guest Communication', icon: 'MessageSquare' },
  { id: 'reports', label: 'Reports', icon: 'FileText' }];


  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PropertyOverviewCard property={propertyData} />
              <RevenueMetricsCard metrics={revenueMetrics} />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <AnalyticsChart data={[]} type="revenue" />
              <AnalyticsChart data={[]} type="bookings" />
            </div>
            <BookingManagementTable bookings={recentBookings?.slice(0, 3)} />
          </div>);


      case 'bookings':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Booking Management</h2>
                <p className="text-muted-foreground">Manage all your property bookings and guest communications</p>
              </div>
              <Button variant="default" iconName="Plus">
                Manual Booking
              </Button>
            </div>
            <BookingManagementTable bookings={recentBookings} />
          </div>);


      case 'calendar':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Availability Calendar</h2>
                <p className="text-muted-foreground">Manage room availability and pricing across all dates</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" iconName="Download">
                  Export Calendar
                </Button>
                <Button variant="default" iconName="Settings">
                  Pricing Rules
                </Button>
              </div>
            </div>
            <AvailabilityCalendar roomTypes={propertyData?.roomTypes} />
          </div>);


      case 'property':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Property Management</h2>
                <p className="text-muted-foreground">Update your property details, rooms, and amenities</p>
              </div>
              <Button variant="outline" iconName="Eye">
                Preview Listing
              </Button>
            </div>
            <PropertyManagementCard property={propertyData} />
          </div>);


      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Analytics & Reports</h2>
                <p className="text-muted-foreground">Track performance metrics and revenue insights</p>
              </div>
              <Button variant="outline" iconName="Download">
                Export Report
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RevenueMetricsCard metrics={revenueMetrics} />
              <AnalyticsChart data={[]} type="occupancy" />
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <AnalyticsChart data={[]} type="revenue" />
              <AnalyticsChart data={[]} type="bookings" />
            </div>
          </div>);


      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Icon name="Construction" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">This section is under development</p>
            </div>
          </div>);

    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex pt-16">
        {/* Sidebar */}
        <div className="w-64 bg-card border-r border-border h-screen sticky top-16 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Building2" size={20} className="text-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground">Owner Portal</div>
                <div className="text-xs text-muted-foreground">Property Management</div>
              </div>
            </div>

            <nav className="space-y-1">
              {sidebarItems?.map((item) =>
              <button
                key={item?.id}
                onClick={() => setActiveSection(item?.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-brand ${
                activeSection === item?.id ?
                'bg-primary text-primary-foreground' :
                'text-muted-foreground hover:text-foreground hover:bg-muted'}`
                }>

                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </button>
              )}
            </nav>

            <div className="mt-8 pt-6 border-t border-border">
              <div className="space-y-2">
                <Link
                  to="/help"
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-brand">

                  <Icon name="HelpCircle" size={18} />
                  <span>Help & Support</span>
                </Link>
                <Link
                  to="/homepage"
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-brand">

                  <Icon name="ExternalLink" size={18} />
                  <span>View Public Site</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>);

};

export default OwnerPortal;