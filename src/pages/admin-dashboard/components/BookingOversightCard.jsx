import React, { useState, useEffect } from 'react';
import Icon from '../../../components/Appicon';

const BookingOversightCard = ({ timeRange, refreshTrigger }) => {
  const [bookingData, setBookingData] = useState({
    totalBookings: 1247,
    pendingBookings: 23,
    completedBookings: 1189,
    cancelledBookings: 35,
    averageBookingValue: 287,
    conversionRate: 12.5
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [selectedView, setSelectedView] = useState('recent');

  useEffect(() => {
    // Simulate booking data updates
    const updateBookingData = () => {
      setBookingData(prev => ({
        ...prev,
        totalBookings: prev?.totalBookings + Math.floor(Math.random() * 5),
        pendingBookings: Math.max(0, prev?.pendingBookings + Math.floor(Math.random() * 3) - 1),
        averageBookingValue: prev?.averageBookingValue + Math.floor(Math.random() * 20) - 10
      }));

      // Generate recent bookings
      const mockBookings = [
        {
          id: 'BK-2024-001',
          customer: 'Alice Thompson',
          hotel: 'Grand Plaza Hotel',
          checkIn: '2024-01-20',
          checkOut: '2024-01-23',
          amount: 450,
          status: 'confirmed',
          timestamp: '2 mins ago'
        },
        {
          id: 'BK-2024-002',
          customer: 'Robert Wilson',
          hotel: 'Ocean View Resort',
          checkIn: '2024-01-25',
          checkOut: '2024-01-28',
          amount: 680,
          status: 'pending',
          timestamp: '5 mins ago'
        },
        {
          id: 'BK-2024-003',
          customer: 'Maria Garcia',
          hotel: 'Downtown Suites',
          checkIn: '2024-01-22',
          checkOut: '2024-01-24',
          amount: 320,
          status: 'payment_failed',
          timestamp: '8 mins ago'
        },
        {
          id: 'BK-2024-004',
          customer: 'James Brown',
          hotel: 'Mountain Lodge',
          checkIn: '2024-01-30',
          checkOut: '2024-02-02',
          amount: 590,
          status: 'confirmed',
          timestamp: '12 mins ago'
        }
      ];

      setRecentBookings(mockBookings);
    };

    updateBookingData();
  }, [timeRange, refreshTrigger]);

  const bookingMetrics = [
    { 
      label: 'Total Bookings', 
      value: bookingData?.totalBookings?.toLocaleString(), 
      change: '+8.2%',
      changeType: 'positive',
      icon: 'Calendar' 
    },
    { 
      label: 'Pending Review', 
      value: bookingData?.pendingBookings, 
      change: '-15%',
      changeType: 'positive',
      icon: 'Clock' 
    },
    { 
      label: 'Avg. Value', 
      value: `$${bookingData?.averageBookingValue}`, 
      change: '+5.7%',
      changeType: 'positive',
      icon: 'DollarSign' 
    },
    { 
      label: 'Conversion', 
      value: `${bookingData?.conversionRate}%`, 
      change: '+2.1%',
      changeType: 'positive',
      icon: 'TrendingUp' 
    }
  ];

  const disputeAlerts = [
    { id: 1, type: 'refund_request', customer: 'John Doe', amount: 450, hotel: 'City Center Hotel', priority: 'high' },
    { id: 2, type: 'cancellation_dispute', customer: 'Sarah Wilson', amount: 290, hotel: 'Beach Resort', priority: 'medium' },
    { id: 3, type: 'payment_issue', customer: 'Mike Johnson', amount: 180, hotel: 'Business Inn', priority: 'low' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      case 'payment_failed': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleBookingAction = (action, bookingId) => {
    console.log(`${action} booking ${bookingId}`);
    // Implement booking action logic
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Icon name="Calendar" size={20} className="text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Booking Oversight</h3>
              <p className="text-sm text-muted-foreground">Monitor transactions & disputes</p>
            </div>
          </div>
          
          <div className="flex space-x-1">
            <button
              onClick={() => setSelectedView('recent')}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                selectedView === 'recent' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Recent
            </button>
            <button
              onClick={() => setSelectedView('disputes')}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                selectedView === 'disputes' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Disputes
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Booking Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {bookingMetrics?.map((metric, index) => (
            <div key={index} className="p-3 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="p-1 bg-muted rounded">
                  <Icon name={metric?.icon} size={14} className="text-muted-foreground" />
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  metric?.changeType === 'positive' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {metric?.change}
                </span>
              </div>
              <p className="text-lg font-bold text-foreground mb-1">{metric?.value}</p>
              <p className="text-xs text-muted-foreground">{metric?.label}</p>
            </div>
          ))}
        </div>

        {selectedView === 'recent' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground">Recent Bookings</h4>
              <button className="text-xs text-primary hover:text-primary/80">
                View All Bookings
              </button>
            </div>

            <div className="space-y-3">
              {recentBookings?.map((booking) => (
                <div key={booking?.id} className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm text-foreground">{booking?.id}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(booking?.status)}`}>
                          {booking?.status?.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{booking?.customer}</p>
                      <p className="text-sm font-medium text-foreground">{booking?.hotel}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">${booking?.amount}</p>
                      <p className="text-xs text-muted-foreground">{booking?.timestamp}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{booking?.checkIn} → {booking?.checkOut}</span>
                    <div className="flex space-x-1">
                      <button 
                        onClick={() => handleBookingAction('view', booking?.id)}
                        className="px-2 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
                      >
                        View
                      </button>
                      {booking?.status === 'pending' && (
                        <button 
                          onClick={() => handleBookingAction('approve', booking?.id)}
                          className="px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                        >
                          Approve
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedView === 'disputes' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground">Active Disputes</h4>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                {disputeAlerts?.length} pending
              </span>
            </div>

            <div className="space-y-3">
              {disputeAlerts?.map((dispute) => (
                <div key={dispute?.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-foreground capitalize">
                          {dispute?.type?.replace('_', ' ')}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(dispute?.priority)}`}>
                          {dispute?.priority} priority
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{dispute?.customer}</p>
                      <p className="text-sm text-foreground">{dispute?.hotel}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">${dispute?.amount}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                      Review Case
                    </button>
                    <button className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors">
                      Contact Customer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="pt-4 border-t border-border mt-6">
          <div className="grid grid-cols-2 gap-2">
            <button className="px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              Process Refunds
            </button>
            <button className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors">
              Export Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingOversightCard;