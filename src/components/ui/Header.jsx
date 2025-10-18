import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../Appicon';
import { Button } from './Button';
import { useAuth } from '../../context/AuthContext';
import Appicon from '../Appicon'; // Assuming Appicon is your logo

const Header = ({ className = '' }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Home', path: '/homepage', icon: 'Home' },
    { name: 'Hotels', path: '/search-results', icon: 'Building2' },
    // { name: 'Hotel Details', path: '/hotel-details', icon: 'Building2' },
    { name: 'Bookings', path: '/booking-flow', icon: 'Calendar' },
    { name: 'Dashboard', path: '/user-dashboard', icon: 'User' }
    // { name: 'Wishlist', path: '/wishlist', icon: 'Heart' },
    // { name: 'Messages', path: '/messages', icon: 'MessageCircle' }
  ];

  const moreMenuItems = [
    { name: 'Owner Portal', path: '/owner-portal', icon: 'Settings' },
    { name: 'Help & Support', path: '/contact-support-center', icon: 'HelpCircle' },
    { name: 'Settings', path: '/settings', icon: 'Settings' }
  ];

  const notifications = [
    {
      id: 1,
      type: 'booking',
      message: 'Your booking at Grand Hotel is confirmed',
      date: '2025-10-17T10:00:00',
      read: false
    },
    // Add more notifications as needed
  ];

  const isActivePath = (path) => {
    return location?.pathname === path || location?.pathname?.startsWith(path + '/');
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-brand ${
        isScrolled ? 'backdrop-brand shadow-brand-md' : 'bg-background/80'
      } ${className}`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/homepage" className="flex items-center space-x-3 hover-lift">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Icon name="MapPin" size={24} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary font-accent">StayFinder</span>
              <span className="text-xs text-muted-foreground font-medium">Pro</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-brand hover-lift ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-brand-sm'
                    : 'text-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.name}</span>
              </Link>
            ))}
            
            {/* More Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted hover:text-foreground transition-brand">
                <Icon name="MoreHorizontal" size={18} />
                <span>More</span>
              </button>
              
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-brand-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-brand">
                <div className="py-2">
                  {moreMenuItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      className={`flex items-center space-x-3 px-4 py-2 text-sm hover:bg-muted transition-brand ${
                        isActivePath(item?.path) ? 'text-primary font-medium' : 'text-popover-foreground'
                      }`}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative"
                  >
                    <Icon name="Bell" className="w-5 h-5" />
                    {notifications.some(n => !n.read) && (
                      <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
                    )}
                  </Button>
                  
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-card rounded-lg shadow-lg border border-border py-2">
                      <div className="px-4 py-2 border-b border-border">
                        <h3 className="font-semibold">Notifications</h3>
                      </div>
                      {notifications.map(notification => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-muted/50 cursor-pointer ${
                            !notification.read ? 'bg-muted/20' : ''
                          }`}
                        >
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(notification.date).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* User Menu */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2"
                  >
                    <Icon name="User" className="w-5 h-5" />
                    <span className="hidden md:inline">{user.email}</span>
                    <Icon name="ChevronDown" className="w-4 h-4" />
                  </Button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-card rounded-lg shadow-lg border border-border py-2">
                      <Link
                        to="/user-dashboard"
                        className="block px-4 py-2 text-sm hover:bg-muted/50"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/wishlist"
                        className="block px-4 py-2 text-sm hover:bg-muted/50"
                      >
                        Wishlist
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm hover:bg-muted/50"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted/50"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/signin')}>
                  Sign In
                </Button>
                <Button onClick={() => navigate('/signup')}>
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted transition-brand"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute left-0 right-0 top-full bg-background border-t border-border shadow-brand-lg">
            <div className="px-4 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-brand ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.name}</span>
                </Link>
              ))}
              
              <div className="border-t border-border pt-2 mt-2">
                {moreMenuItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-brand ${
                      isActivePath(item?.path)
                        ? 'text-primary' :'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={18} />
                    <span>{item?.name}</span>
                  </Link>
                ))}
              </div>
              
              <div className="border-t border-border pt-4 mt-4 flex flex-col space-y-2">
                <Button variant="outline" fullWidth>
                  Sign In
                </Button>
                <Button variant="default" fullWidth>
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;