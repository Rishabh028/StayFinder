import React, { useState } from 'react';
import Icon from '../../../components/Appicon';
import {Button} from '../../../components/ui/Button';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "booking_confirmation",
      title: "Booking Confirmed",
      message: "Your reservation at Grand Plaza Hotel has been confirmed for October 25-28, 2025.",
      timestamp: "2025-10-16T08:30:00Z",
      isRead: false,
      priority: "high",
      actionUrl: "/booking-details/SP-2025-001234"
    },
    {
      id: 2,
      type: "price_drop",
      title: "Price Drop Alert",
      message: "The price for Seaside Resort & Spa has dropped by $50 per night for your saved dates.",
      timestamp: "2025-10-16T07:15:00Z",
      isRead: false,
      priority: "medium",
      actionUrl: "/hotel-details/seaside-resort"
    },
    {
      id: 3,
      type: "loyalty_update",
      title: "Loyalty Points Earned",
      message: "You've earned 180 points from your recent stay. You're now 1,550 points away from Platinum status!",
      timestamp: "2025-10-15T14:20:00Z",
      isRead: true,
      priority: "low",
      actionUrl: "/loyalty-program"
    },
    {
      id: 4,
      type: "review_reminder",
      title: "Review Your Stay",
      message: "How was your stay at The Ritz-Carlton? Share your experience and earn bonus points.",
      timestamp: "2025-10-15T10:00:00Z",
      isRead: false,
      priority: "medium",
      actionUrl: "/write-review/ritz-carlton-sf"
    },
    {
      id: 5,
      type: "promotion",
      title: "Weekend Special Offer",
      message: "Save 25% on weekend bookings at participating hotels. Limited time offer ends October 31st.",
      timestamp: "2025-10-14T16:45:00Z",
      isRead: true,
      priority: "low",
      actionUrl: "/promotions/weekend-special"
    },
    {
      id: 6,
      type: "booking_reminder",
      title: "Check-in Reminder",
      message: "Don\'t forget! Your check-in at Grand Plaza Hotel is tomorrow at 3:00 PM.",
      timestamp: "2025-10-14T09:00:00Z",
      isRead: true,
      priority: "high",
      actionUrl: "/booking-details/SP-2025-001234"
    }
  ]);

  const [filter, setFilter] = useState('all');

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'booking_confirmation':
        return 'CheckCircle';
      case 'price_drop':
        return 'TrendingDown';
      case 'loyalty_update':
        return 'Star';
      case 'review_reminder':
        return 'MessageSquare';
      case 'promotion':
        return 'Gift';
      case 'booking_reminder':
        return 'Clock';
      default:
        return 'Bell';
    }
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return 'text-red-600 bg-red-50';
    if (type === 'booking_confirmation') return 'text-green-600 bg-green-50';
    if (type === 'price_drop') return 'text-blue-600 bg-blue-50';
    if (type === 'loyalty_update') return 'text-yellow-600 bg-yellow-50';
    if (type === 'promotion') return 'text-purple-600 bg-purple-50';
    return 'text-gray-600 bg-gray-50';
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev?.map(notification =>
        notification?.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev?.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev =>
      prev?.filter(notification => notification?.id !== notificationId)
    );
  };

  const filteredNotifications = notifications?.filter(notification => {
    if (filter === 'unread') return !notification?.isRead;
    if (filter === 'important') return notification?.priority === 'high';
    return true;
  });

  const unreadCount = notifications?.filter(n => !n?.isRead)?.length;

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              <Icon name="CheckCheck" size={16} />
              Mark All Read
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Settings" size={16} />
              Settings
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={filter === 'all' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All ({notifications?.length})
          </Button>
          <Button
            variant={filter === 'unread' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('unread')}
          >
            Unread ({unreadCount})
          </Button>
          <Button
            variant={filter === 'important' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('important')}
          >
            Important
          </Button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {filteredNotifications?.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredNotifications?.map((notification) => (
              <div
                key={notification?.id}
                className={`p-4 hover:bg-muted/50 transition-brand ${
                  !notification?.isRead ? 'bg-blue-50/30' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    getNotificationColor(notification?.type, notification?.priority)
                  }`}>
                    <Icon name={getNotificationIcon(notification?.type)} size={18} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`text-sm font-medium ${
                          !notification?.isRead ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {notification?.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {notification?.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {formatTimestamp(notification?.timestamp)}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-1 ml-2">
                        {!notification?.isRead && (
                          <button
                            onClick={() => markAsRead(notification?.id)}
                            className="p-1 hover:bg-muted rounded transition-brand"
                            title="Mark as read"
                          >
                            <Icon name="Check" size={14} className="text-muted-foreground" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification?.id)}
                          className="p-1 hover:bg-muted rounded transition-brand"
                          title="Delete notification"
                        >
                          <Icon name="X" size={14} className="text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                    
                    {notification?.actionUrl && (
                      <div className="mt-3">
                        <Button variant="outline" size="sm">
                          <Icon name="ExternalLink" size={14} />
                          View Details
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Icon name="Bell" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              {filter === 'unread' ? 'No Unread Notifications' : 'No Notifications'}
            </h3>
            <p className="text-muted-foreground">
              {filter === 'unread' ?'All caught up! Check back later for updates.' :'You\'ll see booking updates and important information here.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;