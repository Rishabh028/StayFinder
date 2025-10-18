import React from 'react';
import Icon from '../../../components/Appicon';

const DashboardStats = () => {
  const stats = [
    {
      id: 1,
      title: "Total Bookings",
      value: "24",
      change: "+3 this month",
      changeType: "positive",
      icon: "Calendar",
      color: "bg-blue-50 text-blue-600"
    },
    {
      id: 2,
      title: "Nights Stayed",
      value: "87",
      change: "+12 this month",
      changeType: "positive",
      icon: "Moon",
      color: "bg-purple-50 text-purple-600"
    },
    {
      id: 3,
      title: "Cities Visited",
      value: "15",
      change: "+2 this month",
      changeType: "positive",
      icon: "MapPin",
      color: "bg-green-50 text-green-600"
    },
    {
      id: 4,
      title: "Loyalty Points",
      value: "2,450",
      change: "+180 earned",
      changeType: "positive",
      icon: "Star",
      color: "bg-amber-50 text-amber-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats?.map((stat) => (
        <div key={stat?.id} className="bg-card border border-border rounded-lg p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">{stat?.title}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{stat?.value}</p>
              <p className={`text-xs mt-2 ${
                stat?.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat?.change}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat?.color}`}>
              <Icon name={stat?.icon} size={20} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;