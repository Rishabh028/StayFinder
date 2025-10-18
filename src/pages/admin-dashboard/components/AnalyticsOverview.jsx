import React, { useState, useEffect } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/Appicon';

const AnalyticsOverview = ({ timeRange, refreshTrigger }) => {
  const [analyticsData, setAnalyticsData] = useState({
    totalBookings: 15847,
    totalRevenue: 2456789,
    activeUsers: 8923,
    systemUptime: 99.7,
    bookingTrend: [],
    revenueTrend: [],
    userDistribution: [],
    performanceMetrics: []
  });

  const [selectedMetric, setSelectedMetric] = useState('bookings');

  useEffect(() => {
    // Simulate real-time data updates
    const generateAnalyticsData = () => {
      const bookingTrend = Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        bookings: Math.floor(Math.random() * 200) + 150,
        revenue: Math.floor(Math.random() * 50000) + 25000,
        users: Math.floor(Math.random() * 100) + 80
      }));

      const userDistribution = [
        { name: 'Business Travelers', value: 35, color: '#8884d8' },
        { name: 'Leisure Travelers', value: 45, color: '#82ca9d' },
        { name: 'Group Bookings', value: 12, color: '#ffc658' },
        { name: 'Corporate Accounts', value: 8, color: '#ff7c7c' }
      ];

      const performanceMetrics = [
        { metric: 'Server Response', value: 245, unit: 'ms', status: 'good' },
        { metric: 'Database Query', value: 89, unit: 'ms', status: 'excellent' },
        { metric: 'API Latency', value: 156, unit: 'ms', status: 'good' },
        { metric: 'Page Load Time', value: 2.3, unit: 's', status: 'average' }
      ];

      setAnalyticsData(prev => ({
        ...prev,
        totalBookings: prev?.totalBookings + Math.floor(Math.random() * 10),
        totalRevenue: prev?.totalRevenue + Math.floor(Math.random() * 5000),
        activeUsers: prev?.activeUsers + Math.floor(Math.random() * 20) - 10,
        bookingTrend,
        userDistribution,
        performanceMetrics
      }));
    };

    generateAnalyticsData();
  }, [timeRange, refreshTrigger]);

  const kpiCards = [
    {
      title: 'Total Bookings',
      value: analyticsData?.totalBookings?.toLocaleString(),
      change: '+12.5%',
      changeType: 'positive',
      icon: 'Calendar',
      color: 'blue'
    },
    {
      title: 'Revenue',
      value: `$${(analyticsData?.totalRevenue / 1000000)?.toFixed(1)}M`,
      change: '+8.3%',
      changeType: 'positive',
      icon: 'DollarSign',
      color: 'green'
    },
    {
      title: 'Active Users',
      value: analyticsData?.activeUsers?.toLocaleString(),
      change: '+15.7%',
      changeType: 'positive',
      icon: 'Users',
      color: 'purple'
    },
    {
      title: 'System Uptime',
      value: `${analyticsData?.systemUptime}%`,
      change: '+0.2%',
      changeType: 'positive',
      icon: 'Activity',
      color: 'orange'
    }
  ];

  const getMetricColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'average': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards?.map((kpi, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-${kpi?.color}-100`}>
                <Icon name={kpi?.icon} size={20} className={`text-${kpi?.color}-600`} />
              </div>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                kpi?.changeType === 'positive' ?'bg-green-100 text-green-700' :'bg-red-100 text-red-700'
              }`}>
                {kpi?.change}
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground mb-1">{kpi?.value}</p>
              <p className="text-sm text-muted-foreground">{kpi?.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Booking Trends</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedMetric('bookings')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  selectedMetric === 'bookings' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                Bookings
              </button>
              <button
                onClick={() => setSelectedMetric('revenue')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  selectedMetric === 'revenue' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                Revenue
              </button>
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData?.bookingTrend}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey={selectedMetric} 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">User Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData?.userDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {analyticsData?.userDistribution?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {analyticsData?.userDistribution?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item?.color }}></div>
                <span className="text-sm text-muted-foreground">{item?.name}</span>
                <span className="text-sm font-medium">{item?.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">System Performance</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {analyticsData?.performanceMetrics?.map((metric, index) => (
            <div key={index} className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{metric?.metric}</span>
                <div className={`w-2 h-2 rounded-full ${
                  metric?.status === 'excellent' ? 'bg-green-500' :
                  metric?.status === 'good' ? 'bg-blue-500' :
                  metric?.status === 'average' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
              </div>
              <p className={`text-xl font-bold ${getMetricColor(metric?.status)}`}>
                {metric?.value}{metric?.unit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsOverview;