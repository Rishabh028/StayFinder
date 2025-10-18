import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/Appicon';

const AnalyticsChart = ({ data, type = 'revenue' }) => {
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('7d');

  const chartTypes = [
    { id: 'line', label: 'Line Chart', icon: 'TrendingUp' },
    { id: 'area', label: 'Area Chart', icon: 'AreaChart' },
    { id: 'bar', label: 'Bar Chart', icon: 'BarChart3' }
  ];

  const timeRanges = [
    { id: '7d', label: 'Last 7 days' },
    { id: '30d', label: 'Last 30 days' },
    { id: '90d', label: 'Last 90 days' },
    { id: '1y', label: 'Last year' }
  ];

  const revenueData = [
    { date: '2025-10-09', revenue: 2400, bookings: 12, occupancy: 85 },
    { date: '2025-10-10', revenue: 1398, bookings: 8, occupancy: 72 },
    { date: '2025-10-11', revenue: 9800, bookings: 24, occupancy: 95 },
    { date: '2025-10-12', revenue: 3908, bookings: 18, occupancy: 88 },
    { date: '2025-10-13', revenue: 4800, bookings: 22, occupancy: 92 },
    { date: '2025-10-14', revenue: 3800, bookings: 16, occupancy: 78 },
    { date: '2025-10-15', revenue: 4300, bookings: 20, occupancy: 85 }
  ];

  const occupancyData = [
    { name: 'Deluxe Room', value: 45, color: '#2563EB' },
    { name: 'Standard Room', value: 30, color: '#10B981' },
    { name: 'Suite', value: 15, color: '#F59E0B' },
    { name: 'Premium Room', value: 10, color: '#EF4444' }
  ];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const renderChart = () => {
    const chartData = revenueData?.map(item => ({
      ...item,
      date: formatDate(item?.date)
    }));

    switch (chartType) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="date" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey={type} 
                stroke="#2563EB" 
                fill="#2563EB" 
                fillOpacity={0.1}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="date" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey={type} fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      default:
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="date" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey={type} 
                stroke="#2563EB" 
                strokeWidth={3}
                dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#2563EB', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  const renderOccupancyChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={occupancyData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={120}
          paddingAngle={5}
          dataKey="value"
        >
          {occupancyData?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry?.color} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#FFFFFF', 
            border: '1px solid #E2E8F0',
            borderRadius: '8px'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground capitalize">
            {type === 'occupancy' ? 'Room Type Distribution' : `${type} Analytics`}
          </h3>
          <p className="text-sm text-muted-foreground">
            {type === 'occupancy' ? 'Current occupancy by room type' : `Track your ${type} performance over time`}
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {type !== 'occupancy' && (
            <>
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e?.target?.value)}
                className="text-sm border border-border rounded-md px-3 py-1 bg-background"
              >
                {timeRanges?.map(range => (
                  <option key={range?.id} value={range?.id}>{range?.label}</option>
                ))}
              </select>
              
              <div className="flex items-center border border-border rounded-md">
                {chartTypes?.map((chart) => (
                  <button
                    key={chart?.id}
                    onClick={() => setChartType(chart?.id)}
                    className={`px-3 py-1 text-sm flex items-center space-x-1 transition-brand ${
                      chartType === chart?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    } ${chart?.id === 'line' ? 'rounded-l-md' : chart?.id === 'bar' ? 'rounded-r-md' : ''}`}
                  >
                    <Icon name={chart?.icon} size={14} />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="mb-6">
        {type === 'occupancy' ? renderOccupancyChart() : renderChart()}
      </div>
      {type === 'occupancy' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {occupancyData?.map((item) => (
            <div key={item?.name} className="flex items-center space-x-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item?.color }}
              ></div>
              <div>
                <div className="text-sm font-medium text-foreground">{item?.name}</div>
                <div className="text-xs text-muted-foreground">{item?.value}% occupied</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnalyticsChart;