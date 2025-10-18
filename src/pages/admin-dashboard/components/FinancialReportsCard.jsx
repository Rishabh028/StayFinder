import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/Appicon';

const FinancialReportsCard = ({ timeRange, refreshTrigger }) => {
  const [financialData, setFinancialData] = useState({
    totalRevenue: 2456789,
    commissionsEarned: 245678,
    pendingPayouts: 89456,
    refundsProcessed: 12340,
    revenueGrowth: 12.5,
    revenueData: [],
    commissionData: []
  });

  const [selectedMetric, setSelectedMetric] = useState('revenue');

  useEffect(() => {
    // Simulate financial data updates
    const updateFinancialData = () => {
      const revenueData = Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        revenue: Math.floor(Math.random() * 50000) + 80000,
        commission: Math.floor(Math.random() * 8000) + 12000,
        payouts: Math.floor(Math.random() * 40000) + 60000,
        refunds: Math.floor(Math.random() * 3000) + 1000
      }));

      setFinancialData(prev => ({
        ...prev,
        totalRevenue: prev?.totalRevenue + Math.floor(Math.random() * 10000),
        commissionsEarned: prev?.commissionsEarned + Math.floor(Math.random() * 2000),
        revenueData
      }));
    };

    updateFinancialData();
  }, [timeRange, refreshTrigger]);

  const financialMetrics = [
    {
      label: 'Total Revenue',
      value: `$${(financialData?.totalRevenue / 1000000)?.toFixed(1)}M`,
      change: '+12.5%',
      changeType: 'positive',
      icon: 'DollarSign',
      color: 'green'
    },
    {
      label: 'Commission Earned',
      value: `$${(financialData?.commissionsEarned / 1000)?.toFixed(0)}K`,
      change: '+8.7%',
      changeType: 'positive',
      icon: 'Percent',
      color: 'blue'
    },
    {
      label: 'Pending Payouts',
      value: `$${(financialData?.pendingPayouts / 1000)?.toFixed(0)}K`,
      change: '-5.2%',
      changeType: 'positive',
      icon: 'Clock',
      color: 'yellow'
    },
    {
      label: 'Refunds Processed',
      value: `$${(financialData?.refundsProcessed / 1000)?.toFixed(0)}K`,
      change: '+2.1%',
      changeType: 'negative',
      icon: 'RefreshCw',
      color: 'red'
    }
  ];

  const payoutQueue = [
    { id: 1, property: 'Grand Plaza Hotel', owner: 'Luxury Hotels Inc.', amount: 15420, due: 'Today', status: 'ready' },
    { id: 2, property: 'Ocean View Resort', owner: 'Coastal Properties', amount: 8950, due: 'Tomorrow', status: 'ready' },
    { id: 3, property: 'Downtown Suites', owner: 'Urban Hospitality', amount: 12300, due: 'In 2 days', status: 'pending' },
    { id: 4, property: 'Mountain Lodge', owner: 'Alpine Retreats', amount: 6780, due: 'In 3 days', status: 'pending' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handlePayoutAction = (action, payoutId) => {
    console.log(`${action} payout ${payoutId}`);
    // Implement payout action logic
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Icon name="TrendingUp" size={20} className="text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Financial Reports</h3>
              <p className="text-sm text-muted-foreground">Revenue analytics & payouts</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedMetric('revenue')}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                selectedMetric === 'revenue' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Revenue
            </button>
            <button
              onClick={() => setSelectedMetric('commission')}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                selectedMetric === 'commission' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Commission
            </button>
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Financial Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {financialMetrics?.map((metric, index) => (
            <div key={index} className="p-3 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-1 rounded bg-${metric?.color}-100`}>
                  <Icon name={metric?.icon} size={14} className={`text-${metric?.color}-600`} />
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

        {/* Revenue Chart */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-foreground mb-4">Revenue Trend</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={financialData?.revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`$${(value / 1000)?.toFixed(0)}K`, selectedMetric === 'revenue' ? 'Revenue' : 'Commission']}
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

        {/* Payout Queue */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-foreground">Payout Queue</h4>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              ${payoutQueue?.reduce((sum, payout) => sum + payout?.amount, 0)?.toLocaleString()} pending
            </span>
          </div>

          <div className="space-y-3">
            {payoutQueue?.map((payout) => (
              <div key={payout?.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm text-foreground">{payout?.property}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(payout?.status)}`}>
                        {payout?.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{payout?.owner}</p>
                    <p className="text-xs text-muted-foreground">Due: {payout?.due}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">${payout?.amount?.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handlePayoutAction('process', payout?.id)}
                    className="flex-1 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                    disabled={payout?.status !== 'ready'}
                  >
                    {payout?.status === 'ready' ? 'Process Payment' : 'Not Ready'}
                  </button>
                  <button 
                    onClick={() => handlePayoutAction('view', payout?.id)}
                    className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Financial Actions */}
          <div className="pt-4 border-t border-border">
            <div className="grid grid-cols-2 gap-2">
              <button className="px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                Process All Ready
              </button>
              <button className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors">
                Financial Report
              </button>
              <button className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors">
                Tax Summary
              </button>
              <button className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors">
                Audit Trail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialReportsCard;