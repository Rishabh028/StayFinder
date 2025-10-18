import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../../lib/supabaseClient';
import Header from '../../components/ui/Header';
import Icon from '../../components/Appicon';
import { Button } from '../../components/ui/Button';
import DashboardStats from './components/DashboardStats';
import UpcomingTrips from './components/UpcomingTrips';
import BookingHistory from './components/BookingHistory';
import WishlistSection from './components/WishlistSection';
import ProfileSettings from './components/ProfileSettings';
import LoyaltyProgram from './components/LoyaltyProgram';
import ProfileSection from './components/ProfileSection';
import NotificationCenter from './components/NotificationCenter';

const UserDashboard = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('trips');
  const [profile, setProfile] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [profileSettings, setProfileSettings] = useState({});
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loyalty, setLoyalty] = useState({});
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Fetch user-specific data from Supabase
  useEffect(() => {
    if (!user) return;

    // Fetch profile
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      if (data) setProfile(data);
    };

    // Fetch wishlist
    const fetchWishlist = async () => {
      const { data } = await supabase
        .from('wishlists')
        .select('*')
        .eq('user_id', user.id);
      setWishlist(data || []);
    };

    // Fetch profile settings
    const fetchProfileSettings = async () => {
      const { data } = await supabase
        .from('profile_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();
      setProfileSettings(data || {});
    };

    // Fetch booking history
    const fetchBookingHistory = async () => {
      const { data } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      setBookingHistory(data || []);
    };

    // Fetch loyalty info
    const fetchLoyalty = async () => {
      const { data } = await supabase
        .from('loyalty')
        .select('*')
        .eq('user_id', user.id)
        .single();
      setLoyalty(data || {});
    };

    // Fetch upcoming trips
    const fetchUpcomingTrips = async () => {
      const { data } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id)
        .gte('check_in', new Date().toISOString())
        .order('check_in', { ascending: true });
      setUpcomingTrips(data || []);
    };

    // Fetch notifications
    const fetchNotifications = async () => {
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      setNotifications(data || []);
    };

    fetchProfile();
    fetchWishlist();
    fetchProfileSettings();
    fetchBookingHistory();
    fetchLoyalty();
    fetchUpcomingTrips();
    fetchNotifications();
  }, [user]);

  const navigationTabs = [
    { id: 'overview', name: 'Overview', icon: 'LayoutDashboard' },
    { id: 'trips', name: 'My Trips', icon: 'Calendar' },
    { id: 'history', name: 'History', icon: 'Clock' },
    { id: 'wishlist', name: 'Wishlist', icon: 'Heart' },
    { id: 'loyalty', name: 'Loyalty', icon: 'Star' },
    { id: 'profile', name: 'Profile', icon: 'User' },
    { id: 'notifications', name: 'Notifications', icon: 'Bell' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <DashboardStats user={user} bookings={bookingHistory} loyalty={loyalty} />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <UpcomingTrips trips={upcomingTrips} />
              </div>
              <div>
                <NotificationCenter notifications={notifications} />
              </div>
            </div>
          </div>
        );
      case 'trips':
        return <UpcomingTrips trips={upcomingTrips} />;
      case 'history':
        return <BookingHistory bookings={bookingHistory} />;
      case 'wishlist':
        return <WishlistSection wishlist={wishlist} />;
      case 'loyalty':
        return <LoyaltyProgram loyalty={loyalty} />;
      case 'profile':
        return <ProfileSection profile={profile} profileSettings={profileSettings} />;
      case 'notifications':
        return <NotificationCenter notifications={notifications} />;
      default:
        return (
          <div className="space-y-8">
            <DashboardStats user={user} bookings={bookingHistory} loyalty={loyalty} />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <UpcomingTrips trips={upcomingTrips} />
              </div>
              <div>
                <NotificationCenter notifications={notifications} />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>
          {profile?.full_name
            ? `Dashboard - ${profile.full_name} | StayFinder Pro`
            : 'Dashboard | StayFinder Pro'}
        </title>
      </Helmet>
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Welcome back, {profile?.full_name || user?.email || 'User'}!
                </h1>
                <p className="text-muted-foreground mt-2">
                  Manage your bookings, track your loyalty status, and discover new destinations.
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-3">
                <Button variant="outline">
                  <Icon name="Search" size={16} />
                  Find Hotels
                </Button>
                <Button variant="default">
                  <Icon name="Plus" size={16} />
                  New Booking
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {navigationTabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-brand ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                    }`}
                  >
                    <Icon name={tab?.icon} size={18} />
                    <span>{tab?.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-8">
            {renderTabContent()}
          </div>

          {/* Quick Actions - Mobile */}
          <div className="md:hidden fixed bottom-4 right-4 flex flex-col space-y-2">
            <Button variant="default" size="icon" className="rounded-full shadow-brand-lg">
              <Icon name="Plus" size={20} />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full shadow-brand-lg bg-background">
              <Icon name="Search" size={20} />
            </Button>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                  <Icon name="MapPin" size={20} color="white" />
                </div>
                <span className="text-lg font-bold text-primary font-accent">StayFinder Pro</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your trusted partner for exceptional hotel experiences worldwide.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/search-results" className="hover:text-foreground transition-brand">Search Hotels</a></li>
                <li><a href="/booking-flow" className="hover:text-foreground transition-brand">Book Now</a></li>
                <li><a href="#" className="hover:text-foreground transition-brand">Manage Bookings</a></li>
                <li><a href="#" className="hover:text-foreground transition-brand">Customer Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-3">Account</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-brand">Profile Settings</a></li>
                <li><a href="#" className="hover:text-foreground transition-brand">Loyalty Program</a></li>
                <li><a href="#" className="hover:text-foreground transition-brand">Payment Methods</a></li>
                <li><a href="#" className="hover:text-foreground transition-brand">Privacy Settings</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-brand">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-brand">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-brand">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground transition-brand">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} StayFinder Pro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserDashboard;