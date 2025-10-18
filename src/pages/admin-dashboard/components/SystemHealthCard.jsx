import React, { useState, useEffect } from 'react';
import Icon from '../../../components/Appicon';

const SystemHealthCard = ({ refreshTrigger }) => {
  const [systemHealth, setSystemHealth] = useState({
    serverStatus: 'online',
    databaseStatus: 'online',
    apiStatus: 'online',
    storageStatus: 'online',
    cdnStatus: 'online',
    uptime: '99.7%',
    lastIncident: '7 days ago',
    activeConnections: 1247,
    memoryUsage: 68,
    cpuUsage: 42,
    diskUsage: 78,
    networkStatus: 'stable'
  });

  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Simulate real-time system health updates
    const updateSystemHealth = () => {
      setSystemHealth(prev => ({
        ...prev,
        activeConnections: prev?.activeConnections + Math.floor(Math.random() * 20) - 10,
        memoryUsage: Math.max(50, Math.min(90, prev?.memoryUsage + Math.floor(Math.random() * 6) - 3)),
        cpuUsage: Math.max(20, Math.min(80, prev?.cpuUsage + Math.floor(Math.random() * 10) - 5)),
        diskUsage: Math.max(60, Math.min(85, prev?.diskUsage + Math.floor(Math.random() * 4) - 2))
      }));
    };

    updateSystemHealth();
  }, [refreshTrigger]);

  const healthServices = [
    { name: 'Web Server', status: systemHealth?.serverStatus, icon: 'Server', critical: true },
    { name: 'Database', status: systemHealth?.databaseStatus, icon: 'Database', critical: true },
    { name: 'API Gateway', status: systemHealth?.apiStatus, icon: 'Globe', critical: true },
    { name: 'File Storage', status: systemHealth?.storageStatus, icon: 'HardDrive', critical: false },
    { name: 'CDN', status: systemHealth?.cdnStatus, icon: 'Zap', critical: false }
  ];

  const systemMetrics = [
    { name: 'Memory Usage', value: systemHealth?.memoryUsage, unit: '%', icon: 'Cpu' },
    { name: 'CPU Usage', value: systemHealth?.cpuUsage, unit: '%', icon: 'Activity' },
    { name: 'Disk Usage', value: systemHealth?.diskUsage, unit: '%', icon: 'HardDrive' },
    { name: 'Active Connections', value: systemHealth?.activeConnections, unit: '', icon: 'Users' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'offline': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'offline': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getUsageColor = (value) => {
    if (value >= 80) return 'bg-red-500';
    if (value >= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Icon name="Activity" size={20} className="text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">System Health</h3>
              <p className="text-sm text-muted-foreground">Real-time monitoring</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-primary hover:text-primary/80 font-medium"
          >
            {showDetails ? 'Hide Details' : 'View Details'}
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* System Status Overview */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium text-foreground">System Uptime</span>
            </div>
            <span className="text-lg font-bold text-green-600">{systemHealth?.uptime}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <span className="font-medium text-foreground">Last Incident</span>
            </div>
            <span className="text-sm text-muted-foreground">{systemHealth?.lastIncident}</span>
          </div>
        </div>

        {/* Service Status */}
        <div className="space-y-3 mb-6">
          <h4 className="text-sm font-semibold text-foreground">Services Status</h4>
          {healthServices?.map((service, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name={service?.icon} size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{service?.name}</span>
                {service?.critical && (
                  <span className="px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded-full">
                    Critical
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getStatusIcon(service?.status)} 
                  size={16} 
                  className={getStatusColor(service?.status)} 
                />
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(service?.status)}`}>
                  {service?.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Metrics */}
        {showDetails && (
          <div className="space-y-4 pt-4 border-t border-border">
            <h4 className="text-sm font-semibold text-foreground">Resource Usage</h4>
            {systemMetrics?.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name={metric?.icon} size={14} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{metric?.name}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {metric?.value}{metric?.unit}
                  </span>
                </div>
                
                {metric?.unit === '%' && (
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getUsageColor(metric?.value)}`}
                      style={{ width: `${metric?.value}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Quick Actions */}
            <div className="pt-4 border-t border-border">
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                  View Logs
                </button>
                <button className="px-3 py-1 text-xs border border-border rounded-md hover:bg-muted transition-colors">
                  System Report
                </button>
                <button className="px-3 py-1 text-xs border border-border rounded-md hover:bg-muted transition-colors">
                  Maintenance
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemHealthCard;