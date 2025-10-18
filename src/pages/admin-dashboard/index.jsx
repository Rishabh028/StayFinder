import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import SystemHealthCard from './components/SystemHealthCard';
import UserManagementCard from './components/UserManagementCard';
import BookingOversightCard from './components/BookingOversightCard';
import HotelManagementCard from './components/HotelManagementCard';
import FinancialReportsCard from './components/FinancialReportsCard';
import SecurityCenterCard from './components/SecurityCenterCard';
import ContentManagementCard from './components/ContentManagementCard';
import AnalyticsOverview from './components/AnalyticsOverview';

const AdminDashboard = () => {
  const [refreshData, setRefreshData] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshData(prev => !prev);
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleTimeRangeChange = (range) => {
    setSelectedTimeRange(range);
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - StayFinder Pro | Platform Management & Analytics</title>
        <meta name="description" content="Comprehensive administrative control center for StayFinder Pro. Monitor platform health, manage users, oversee bookings, and maintain content quality with real-time analytics." />
        <meta name="keywords" content="admin dashboard, platform management, analytics, user management, booking oversight, system monitoring" />
        <meta property="og:title" content="Admin Dashboard - StayFinder Pro" />
        <meta property="og:description" content="Administrative control center with real-time analytics, user management, and system monitoring capabilities." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="/admin-dashboard" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Dashboard Header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
                  <p className="text-muted-foreground">
                    Platform management and oversight center
                  </p>
                </div>
                
                <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>System Online</span>
                  </div>
                  
                  <select
                    value={selectedTimeRange}
                    onChange={(e) => handleTimeRangeChange(e?.target?.value)}
                    className="px-3 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="24h">Last 24 Hours</option>
                    <option value="7d">Last 7 Days</option>
                    <option value="30d">Last 30 Days</option>
                    <option value="90d">Last 90 Days</option>
                  </select>

                  <button
                    onClick={() => setRefreshData(prev => !prev)}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Refresh Data
                  </button>
                </div>
              </div>
            </div>

            {/* Analytics Overview */}
            <div className="mb-8">
              <AnalyticsOverview timeRange={selectedTimeRange} refreshTrigger={refreshData} />
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {/* System Health Monitoring */}
              <div className="lg:col-span-1">
                <SystemHealthCard refreshTrigger={refreshData} />
              </div>

              {/* User Management */}
              <div className="lg:col-span-1">
                <UserManagementCard refreshTrigger={refreshData} />
              </div>

              {/* Security Center */}
              <div className="lg:col-span-1">
                <SecurityCenterCard refreshTrigger={refreshData} />
              </div>
            </div>

            {/* Secondary Management Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Booking Oversight */}
              <BookingOversightCard timeRange={selectedTimeRange} refreshTrigger={refreshData} />

              {/* Hotel Management */}
              <HotelManagementCard refreshTrigger={refreshData} />
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Financial Reports */}
              <FinancialReportsCard timeRange={selectedTimeRange} refreshTrigger={refreshData} />

              {/* Content Management */}
              <ContentManagementCard refreshTrigger={refreshData} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;