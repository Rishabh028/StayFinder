import React, { useState, useEffect } from 'react';
import Icon from '../../../components/Appicon';

const HotelManagementCard = ({ refreshTrigger }) => {
  const [hotelStats, setHotelStats] = useState({
    totalProperties: 2840,
    pendingApproval: 12,
    activeListings: 2756,
    suspendedProperties: 72,
    featuredHotels: 145
  });

  const [pendingHotels, setPendingHotels] = useState([]);
  const [selectedTab, setSelectedTab] = useState('pending');

  useEffect(() => {
    // Simulate hotel data updates
    const updateHotelData = () => {
      setHotelStats(prev => ({
        ...prev,
        pendingApproval: Math.max(0, prev?.pendingApproval + Math.floor(Math.random() * 3) - 1),
        totalProperties: prev?.totalProperties + Math.floor(Math.random() * 2)
      }));

      // Generate pending hotels data
      const mockPendingHotels = [
        {
          id: 'HTL-2024-001',
          name: 'Sunset Beach Resort',
          owner: 'Beach Hotels Inc.',
          location: 'Miami, FL',
          type: 'Resort',
          submitted: '2 days ago',
          completeness: 85,
          priority: 'high'
        },
        {
          id: 'HTL-2024-002',
          name: 'Downtown Business Center',
          owner: 'Urban Properties',
          location: 'New York, NY',
          type: 'Business Hotel',
          submitted: '1 day ago',
          completeness: 92,
          priority: 'high'
        },
        {
          id: 'HTL-2024-003',
          name: 'Mountain View Lodge',
          owner: 'Alpine Hospitality',
          location: 'Colorado Springs, CO',
          type: 'Lodge',
          submitted: '3 days ago',
          completeness: 67,
          priority: 'medium'
        },
        {
          id: 'HTL-2024-004',
          name: 'Historic Inn & Suites',
          owner: 'Heritage Hotels',
          location: 'Boston, MA',
          type: 'Historic Inn',
          submitted: '5 days ago',
          completeness: 78,
          priority: 'medium'
        }
      ];

      setPendingHotels(mockPendingHotels);
    };

    updateHotelData();
  }, [refreshTrigger]);

  const hotelMetrics = [
    { label: 'Total Properties', value: hotelStats?.totalProperties?.toLocaleString(), icon: 'Building2', color: 'blue' },
    { label: 'Active Listings', value: hotelStats?.activeListings?.toLocaleString(), icon: 'CheckCircle', color: 'green' },
    { label: 'Pending Approval', value: hotelStats?.pendingApproval, icon: 'Clock', color: 'yellow' },
    { label: 'Featured Hotels', value: hotelStats?.featuredHotels, icon: 'Star', color: 'purple' }
  ];

  const qualityIssues = [
    { id: 1, hotel: 'Ocean View Hotel', issue: 'Incomplete amenities list', severity: 'medium', reported: '1 hour ago' },
    { id: 2, hotel: 'City Plaza Inn', issue: 'Poor image quality', severity: 'low', reported: '3 hours ago' },
    { id: 3, hotel: 'Grand Resort', issue: 'Missing accessibility info', severity: 'high', reported: '6 hours ago' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCompletenessColor = (percentage) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleHotelAction = (action, id) => {
    console.log(`${action} hotel ${id}`);
    // Implement hotel action logic
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Icon name="Building2" size={20} className="text-orange-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Hotel Management</h3>
              <p className="text-sm text-muted-foreground">Property oversight & quality control</p>
            </div>
          </div>
          
          <div className="flex space-x-1">
            <button
              onClick={() => setSelectedTab('pending')}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                selectedTab === 'pending' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setSelectedTab('quality')}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                selectedTab === 'quality' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Quality
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Hotel Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {hotelMetrics?.map((metric, index) => (
            <div key={index} className="p-3 border border-border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className={`p-1 rounded bg-${metric?.color}-100`}>
                  <Icon name={metric?.icon} size={14} className={`text-${metric?.color}-600`} />
                </div>
                <span className="text-xs text-muted-foreground">{metric?.label}</span>
              </div>
              <p className="text-lg font-bold text-foreground">{metric?.value}</p>
            </div>
          ))}
        </div>

        {selectedTab === 'pending' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground">Pending Approvals</h4>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                {pendingHotels?.length} pending
              </span>
            </div>

            <div className="space-y-3">
              {pendingHotels?.map((hotel) => (
                <div key={hotel?.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm text-foreground">{hotel?.name}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(hotel?.priority)}`}>
                          {hotel?.priority}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{hotel?.owner}</p>
                      <p className="text-sm text-foreground">{hotel?.location} • {hotel?.type}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-1">Submitted {hotel?.submitted}</p>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-muted-foreground">Complete:</span>
                        <span className="text-xs font-medium">{hotel?.completeness}%</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Completeness Bar */}
                  <div className="w-full bg-muted rounded-full h-2 mb-3">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getCompletenessColor(hotel?.completeness)}`}
                      style={{ width: `${hotel?.completeness}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleHotelAction('review', hotel?.id)}
                      className="flex-1 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                    >
                      Review Details
                    </button>
                    <button 
                      onClick={() => handleHotelAction('approve', hotel?.id)}
                      className="px-3 py-2 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleHotelAction('reject', hotel?.id)}
                      className="px-3 py-2 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'quality' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground">Quality Issues</h4>
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                {qualityIssues?.length} issues
              </span>
            </div>

            <div className="space-y-3">
              {qualityIssues?.map((issue) => (
                <div key={issue?.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm text-foreground">{issue?.hotel}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(issue?.severity)}`}>
                          {issue?.severity}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{issue?.issue}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Reported {issue?.reported}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                      Investigate
                    </button>
                    <button className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors">
                      Contact Owner
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
              Bulk Approve
            </button>
            <button className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors">
              Quality Report
            </button>
            <button className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors">
              Feature Hotels
            </button>
            <button className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors">
              Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelManagementCard;