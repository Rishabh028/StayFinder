import React from 'react';
import Icon from '../../../components/Appicon';

const PropertyOverviewCard = ({ property }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover-lift">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Building2" size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{property?.name}</h3>
            <p className="text-sm text-muted-foreground">{property?.location}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            property?.status === 'Active' ?'bg-success/10 text-success' :'bg-warning/10 text-warning'
          }`}>
            {property?.status}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{property?.totalRooms}</div>
          <div className="text-xs text-muted-foreground">Total Rooms</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-success">{property?.occupiedRooms}</div>
          <div className="text-xs text-muted-foreground">Occupied</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{property?.availableRooms}</div>
          <div className="text-xs text-muted-foreground">Available</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">{property?.occupancyRate}%</div>
          <div className="text-xs text-muted-foreground">Occupancy</div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Revenue Today: <span className="font-semibold text-foreground">${property?.todayRevenue}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={16} className="text-success" />
          <span className="text-sm font-medium text-success">+{property?.revenueGrowth}%</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyOverviewCard;