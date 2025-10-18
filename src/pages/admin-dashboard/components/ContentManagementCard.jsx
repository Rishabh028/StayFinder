import React, { useState, useEffect } from 'react';
import Icon from '../../../components/Appicon';

const ContentManagementCard = ({ refreshTrigger }) => {
  const [contentData, setContentData] = useState({
    totalAnnouncements: 12,
    activePromotions: 5,
    pendingReviews: 18,
    featuredContent: 8
  });

  const [contentItems, setContentItems] = useState([]);
  const [selectedTab, setSelectedTab] = useState('announcements');

  useEffect(() => {
    // Simulate content data updates
    const updateContentData = () => {
      setContentData(prev => ({
        ...prev,
        pendingReviews: Math.max(0, prev?.pendingReviews + Math.floor(Math.random() * 3) - 1)
      }));

      // Generate content items based on selected tab
      if (selectedTab === 'announcements') {
        setContentItems([
          {
            id: 1,
            title: 'Holiday Booking Surge - Prepare Your Properties',
            type: 'system_alert',
            status: 'published',
            views: 2340,
            created: '2 days ago',
            priority: 'high'
          },
          {
            id: 2,
            title: 'New Payment Gateway Integration Available',
            type: 'feature_announcement',
            status: 'draft',
            views: 0,
            created: '1 day ago',
            priority: 'medium'
          },
          {
            id: 3,
            title: 'Platform Maintenance Scheduled - Jan 25th',
            type: 'maintenance',
            status: 'scheduled',
            views: 856,
            created: '3 hours ago',
            priority: 'high'
          }
        ]);
      } else if (selectedTab === 'promotions') {
        setContentItems([
          {
            id: 1,
            title: 'Winter Wonderland - 25% Off Mountain Lodges',
            type: 'seasonal_promo',
            status: 'active',
            clicks: 4520,
            created: '1 week ago',
            endDate: 'Feb 29, 2024'
          },
          {
            id: 2,
            title: 'Business Traveler Special - Free WiFi Upgrade',
            type: 'category_promo',
            status: 'active',
            clicks: 1890,
            created: '3 days ago',
            endDate: 'Mar 15, 2024'
          },
          {
            id: 3,
            title: 'New User Welcome - $50 Off First Booking',
            type: 'user_promo',
            status: 'paused',
            clicks: 890,
            created: '2 weeks ago',
            endDate: 'Dec 31, 2024'
          }
        ]);
      } else {
        setContentItems([
          {
            id: 1,
            reviewer: 'Sarah M.',
            hotel: 'Grand Plaza Hotel',
            rating: 2,
            content: 'Room was not clean and staff was unhelpful...',
            status: 'pending',
            flagged: true,
            submitted: '2 hours ago'
          },
          {
            id: 2,
            reviewer: 'Mike R.',
            hotel: 'Ocean View Resort',
            rating: 5,
            content: 'Amazing experience! The view from our room was breathtaking...',
            status: 'pending',
            flagged: false,
            submitted: '4 hours ago'
          },
          {
            id: 3,
            reviewer: 'Lisa K.',
            hotel: 'Downtown Suites',
            rating: 1,
            content: 'Worst hotel experience ever. Would never recommend...',
            status: 'pending',
            flagged: true,
            submitted: '6 hours ago'
          }
        ]);
      }
    };

    updateContentData();
  }, [selectedTab, refreshTrigger]);

  const contentMetrics = [
    { label: 'Announcements', value: contentData?.totalAnnouncements, icon: 'Megaphone', color: 'blue' },
    { label: 'Active Promos', value: contentData?.activePromotions, icon: 'Tag', color: 'green' },
    { label: 'Pending Reviews', value: contentData?.pendingReviews, icon: 'MessageSquare', color: 'yellow' },
    { label: 'Featured Content', value: contentData?.featuredContent, icon: 'Star', color: 'purple' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-700';
      case 'active': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      case 'paused': return 'bg-yellow-100 text-yellow-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
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

  const handleContentAction = (action, itemId) => {
    console.log(`${action} content ${itemId}`);
    // Implement content action logic
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={12}
        className={i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Icon name="FileText" size={20} className="text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Content Management</h3>
              <p className="text-sm text-muted-foreground">Announcements, promos & reviews</p>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-1 mt-4">
          <button
            onClick={() => setSelectedTab('announcements')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              selectedTab === 'announcements' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Announcements
          </button>
          <button
            onClick={() => setSelectedTab('promotions')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              selectedTab === 'promotions' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Promotions
          </button>
          <button
            onClick={() => setSelectedTab('reviews')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              selectedTab === 'reviews' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Reviews
          </button>
        </div>
      </div>
      <div className="p-6">
        {/* Content Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {contentMetrics?.map((metric, index) => (
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

        {/* Content List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-foreground capitalize">
              {selectedTab === 'reviews' ? 'Pending Reviews' : `Recent ${selectedTab}`}
            </h4>
            <button className="text-xs text-primary hover:text-primary/80">
              {selectedTab === 'announcements' ? 'Create New' : 
               selectedTab === 'promotions' ? 'New Campaign' : 'View All'}
            </button>
          </div>

          <div className="space-y-3">
            {contentItems?.map((item) => (
              <div key={item?.id} className="p-4 border border-border rounded-lg">
                {selectedTab === 'reviews' ? (
                  // Review item layout
                  (<div>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm text-foreground">{item?.reviewer}</span>
                          <div className="flex items-center space-x-1">
                            {renderStars(item?.rating)}
                          </div>
                          {item?.flagged && (
                            <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                              Flagged
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{item?.hotel}</p>
                        <p className="text-sm text-foreground">{item?.content}</p>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{item?.submitted}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleContentAction('approve', item?.id)}
                        className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleContentAction('reject', item?.id)}
                        className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                      >
                        Reject
                      </button>
                      <button 
                        onClick={() => handleContentAction('edit', item?.id)}
                        className="px-3 py-1 text-xs border border-border rounded-md hover:bg-muted transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  </div>)
                ) : (
                  // Announcement/Promotion item layout
                  (<div>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm text-foreground">{item?.title}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(item?.status)}`}>
                            {item?.status}
                          </span>
                          {item?.priority && (
                            <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(item?.priority)}`}>
                              {item?.priority}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground capitalize">{item?.type?.replace('_', ' ')}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                          <span>Created {item?.created}</span>
                          {item?.views !== undefined && <span>{item?.views} views</span>}
                          {item?.clicks !== undefined && <span>{item?.clicks} clicks</span>}
                          {item?.endDate && <span>Ends: {item?.endDate}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleContentAction('edit', item?.id)}
                        className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                      >
                        Edit
                      </button>
                      {item?.status === 'draft' && (
                        <button 
                          onClick={() => handleContentAction('publish', item?.id)}
                          className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                        >
                          Publish
                        </button>
                      )}
                      {item?.status === 'active' && selectedTab === 'promotions' && (
                        <button 
                          onClick={() => handleContentAction('pause', item?.id)}
                          className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 transition-colors"
                        >
                          Pause
                        </button>
                      )}
                      <button 
                        onClick={() => handleContentAction('analytics', item?.id)}
                        className="px-3 py-1 text-xs border border-border rounded-md hover:bg-muted transition-colors"
                      >
                        Analytics
                      </button>
                    </div>
                  </div>)
                )}
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="pt-4 border-t border-border">
            <div className="grid grid-cols-2 gap-2">
              <button className="px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                {selectedTab === 'announcements' ? 'New Announcement' :
                 selectedTab === 'promotions' ? 'Create Campaign' : 'Bulk Approve'}
              </button>
              <button className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors">
                {selectedTab === 'reviews' ? 'Review Guidelines' : 'Content Analytics'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentManagementCard;