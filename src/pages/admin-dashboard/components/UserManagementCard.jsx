import React, { useState, useEffect } from 'react';
import Icon from '../../../components/Appicon';

const UserManagementCard = ({ refreshTrigger }) => {
  const [userStats, setUserStats] = useState({
    totalUsers: 28450,
    activeUsers: 8923,
    newRegistrations: 145,
    suspendedUsers: 23,
    premiumUsers: 3420
  });

  const [recentUsers, setRecentUsers] = useState([]);
  const [selectedTab, setSelectedTab] = useState('overview');

  useEffect(() => {
    // Simulate user data updates
    const updateUserData = () => {
      setUserStats(prev => ({
        ...prev,
        activeUsers: prev?.activeUsers + Math.floor(Math.random() * 10) - 5,
        newRegistrations: prev?.newRegistrations + Math.floor(Math.random() * 5)
      }));

      // Generate recent users data
      const mockUsers = [
        { id: 1, name: 'Sarah Johnson', email: 'sarah.j@email.com', status: 'active', joinDate: '2 hours ago', avatar: 'SJ' },
        { id: 2, name: 'Michael Chen', email: 'm.chen@email.com', status: 'pending', joinDate: '4 hours ago', avatar: 'MC' },
        { id: 3, name: 'Emma Rodriguez', email: 'emma.rod@email.com', status: 'active', joinDate: '6 hours ago', avatar: 'ER' },
        { id: 4, name: 'David Kim', email: 'david.kim@email.com', status: 'suspended', joinDate: '8 hours ago', avatar: 'DK' },
        { id: 5, name: 'Lisa Wang', email: 'lisa.wang@email.com', status: 'active', joinDate: '12 hours ago', avatar: 'LW' }
      ];

      setRecentUsers(mockUsers);
    };

    updateUserData();
  }, [refreshTrigger]);

  const userMetrics = [
    { label: 'Total Users', value: userStats?.totalUsers?.toLocaleString(), icon: 'Users', color: 'blue' },
    { label: 'Active Today', value: userStats?.activeUsers?.toLocaleString(), icon: 'UserCheck', color: 'green' },
    { label: 'New Registrations', value: userStats?.newRegistrations, icon: 'UserPlus', color: 'purple' },
    { label: 'Premium Users', value: userStats?.premiumUsers?.toLocaleString(), icon: 'Crown', color: 'yellow' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'suspended': return 'bg-red-100 text-red-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleUserAction = (action, userId) => {
    console.log(`${action} user ${userId}`);
    // Implement user action logic
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Icon name="Users" size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">User Management</h3>
              <p className="text-sm text-muted-foreground">Monitor and manage users</p>
            </div>
          </div>
          
          <div className="flex space-x-1">
            <button
              onClick={() => setSelectedTab('overview')}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                selectedTab === 'overview' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedTab('recent')}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                selectedTab === 'recent' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Recent
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {selectedTab === 'overview' && (
          <div className="space-y-4">
            {/* User Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              {userMetrics?.map((metric, index) => (
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

            {/* User Activity Status */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">Account Status Distribution</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Active Users</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-muted rounded-full">
                      <div className="w-4/5 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-xs font-medium">80%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Pending Verification</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-muted rounded-full">
                      <div className="w-1/5 h-2 bg-yellow-500 rounded-full"></div>
                    </div>
                    <span className="text-xs font-medium">12%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Suspended</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-muted rounded-full">
                      <div className="w-1/12 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <span className="text-xs font-medium">8%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-border">
              <div className="grid grid-cols-2 gap-2">
                <button className="px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                  Add User
                </button>
                <button className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors">
                  Export Data
                </button>
                <button className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors">
                  Bulk Actions
                </button>
                <button className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors">
                  User Reports
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'recent' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground">Recent Registrations</h4>
              <button className="text-xs text-primary hover:text-primary/80">
                View All
              </button>
            </div>

            <div className="space-y-3">
              {recentUsers?.map((user) => (
                <div key={user?.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">{user?.avatar}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(user?.status)}`}>
                      {user?.status}
                    </span>
                    <div className="relative group">
                      <button className="p-1 hover:bg-muted rounded">
                        <Icon name="MoreHorizontal" size={14} />
                      </button>
                      <div className="absolute right-0 top-full mt-1 w-32 bg-popover border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                        <div className="py-1">
                          <button 
                            onClick={() => handleUserAction('view', user?.id)}
                            className="w-full px-3 py-1 text-xs text-left hover:bg-muted"
                          >
                            View Profile
                          </button>
                          <button 
                            onClick={() => handleUserAction('edit', user?.id)}
                            className="w-full px-3 py-1 text-xs text-left hover:bg-muted"
                          >
                            Edit User
                          </button>
                          <button 
                            onClick={() => handleUserAction('suspend', user?.id)}
                            className="w-full px-3 py-1 text-xs text-left hover:bg-muted text-red-600"
                          >
                            Suspend
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-border">
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                  Approve All Pending
                </button>
                <button className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors">
                  <Icon name="Download" size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagementCard;