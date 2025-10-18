import React from 'react';
import Icon from '../../../components/Appicon';

const RevenueMetricsCard = ({ metrics }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Revenue Metrics</h3>
        <div className="flex items-center space-x-2">
          <select className="text-sm border border-border rounded-md px-3 py-1 bg-background">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="DollarSign" size={24} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">${metrics?.totalRevenue}</div>
          <div className="text-sm text-muted-foreground mb-2">Total Revenue</div>
          <div className="flex items-center justify-center space-x-1">
            <Icon name="TrendingUp" size={14} className="text-success" />
            <span className="text-xs font-medium text-success">+{metrics?.revenueGrowth}%</span>
          </div>
        </div>

        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="Calendar" size={24} className="text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">{metrics?.totalBookings}</div>
          <div className="text-sm text-muted-foreground mb-2">Total Bookings</div>
          <div className="flex items-center justify-center space-x-1">
            <Icon name="TrendingUp" size={14} className="text-success" />
            <span className="text-xs font-medium text-success">+{metrics?.bookingGrowth}%</span>
          </div>
        </div>

        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="Users" size={24} className="text-accent" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">${metrics?.avgBookingValue}</div>
          <div className="text-sm text-muted-foreground mb-2">Avg Booking Value</div>
          <div className="flex items-center justify-center space-x-1">
            <Icon name="TrendingDown" size={14} className="text-destructive" />
            <span className="text-xs font-medium text-destructive">-{metrics?.avgValueDecline}%</span>
          </div>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Revenue per available room (RevPAR)</span>
          <span className="font-semibold text-foreground">${metrics?.revPAR}</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-muted-foreground">Average daily rate (ADR)</span>
          <span className="font-semibold text-foreground">${metrics?.adr}</span>
        </div>
      </div>
    </div>
  );
};

export default RevenueMetricsCard;