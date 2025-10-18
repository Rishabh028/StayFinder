import React, { useState, useEffect } from 'react';
import Icon from '../../../components/Appicon';

const SecurityCenterCard = ({ refreshTrigger }) => {
  const [securityData, setSecurityData] = useState({
    threatLevel: 'low',
    activeAlerts: 3,
    blockedAttempts: 127,
    suspiciousActivity: 8,
    lastScan: '2 minutes ago'
  });

  const [securityAlerts, setSecurityAlerts] = useState([]);
  const [selectedTab, setSelectedTab] = useState('alerts');

  useEffect(() => {
    // Simulate security data updates
    const updateSecurityData = () => {
      setSecurityData(prev => ({
        ...prev,
        blockedAttempts: prev?.blockedAttempts + Math.floor(Math.random() * 3),
        suspiciousActivity: Math.max(0, prev?.suspiciousActivity + Math.floor(Math.random() * 2) - 1)
      }));

      // Generate security alerts
      const mockAlerts = [
        {
          id: 1,
          type: 'failed_login',
          severity: 'medium',
          description: 'Multiple failed login attempts from IP 192.168.1.100',
          timestamp: '3 minutes ago',
          status: 'active',
          location: 'New York, US'
        },
        {
          id: 2,
          type: 'suspicious_booking',
          severity: 'high',
          description: 'Unusual booking pattern detected for user ID 12345',
          timestamp: '15 minutes ago',
          status: 'investigating',
          location: 'Unknown'
        },
        {
          id: 3,
          type: 'payment_fraud',
          severity: 'high',
          description: 'Potential credit card fraud detected',
          timestamp: '1 hour ago',
          status: 'blocked',
          location: 'Lagos, Nigeria'
        },
        {
          id: 4,
          type: 'data_breach_attempt',
          severity: 'low',
          description: 'SQL injection attempt blocked',
          timestamp: '2 hours ago',
          status: 'blocked',
          location: 'Moscow, Russia'
        }
      ];

      setSecurityAlerts(mockAlerts);
    };

    updateSecurityData();
  }, [refreshTrigger]);

  const securityMetrics = [
    { 
      label: 'Threat Level', 
      value: securityData?.threatLevel?.toUpperCase(), 
      icon: 'Shield', 
      color: securityData?.threatLevel === 'low' ? 'green' : securityData?.threatLevel === 'medium' ? 'yellow' : 'red' 
    },
    { 
      label: 'Active Alerts', 
      value: securityData?.activeAlerts, 
      icon: 'AlertTriangle', 
      color: 'red' 
    },
    { 
      label: 'Blocked Today', 
      value: securityData?.blockedAttempts, 
      icon: 'Shield', 
      color: 'blue' 
    },
    { 
      label: 'Suspicious Activity', 
      value: securityData?.suspiciousActivity, 
      icon: 'Eye', 
      color: 'yellow' 
    }
  ];

  const accessControlLogs = [
    { id: 1, user: 'admin@stayfinder.com', action: 'Dashboard Access', timestamp: '5 minutes ago', status: 'success', ip: '10.0.0.1' },
    { id: 2, user: 'manager@stayfinder.com', action: 'User Management', timestamp: '12 minutes ago', status: 'success', ip: '10.0.0.2' },
    { id: 3, user: 'unknown', action: 'Failed Login', timestamp: '20 minutes ago', status: 'blocked', ip: '192.168.1.100' },
    { id: 4, user: 'support@stayfinder.com', action: 'System Settings', timestamp: '35 minutes ago', status: 'success', ip: '10.0.0.3' }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-700';
      case 'investigating': return 'bg-yellow-100 text-yellow-700';
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'blocked': return 'bg-gray-100 text-gray-700';
      case 'success': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getThreatLevelColor = (level) => {
    switch (level) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleSecurityAction = (action, alertId) => {
    console.log(`${action} alert ${alertId}`);
    // Implement security action logic
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Icon name="Shield" size={20} className="text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Security Center</h3>
              <p className="text-sm text-muted-foreground">Fraud detection & access control</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${
                securityData?.threatLevel === 'low' ? 'bg-green-500' :
                securityData?.threatLevel === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
              } animate-pulse`}></div>
              <span className={`text-xs font-medium ${getThreatLevelColor(securityData?.threatLevel)}`}>
                {securityData?.threatLevel?.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-1 mt-4">
          <button
            onClick={() => setSelectedTab('alerts')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              selectedTab === 'alerts' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Alerts
          </button>
          <button
            onClick={() => setSelectedTab('access')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              selectedTab === 'access' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Access Logs
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Security Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {securityMetrics?.map((metric, index) => (
            <div key={index} className="p-3 border border-border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className={`p-1 rounded bg-${metric?.color}-100`}>
                  <Icon name={metric?.icon} size={14} className={`text-${metric?.color}-600`} />
                </div>
                <span className="text-xs text-muted-foreground">{metric?.label}</span>
              </div>
              <p className={`text-lg font-bold ${
                metric?.label === 'Threat Level' ? getThreatLevelColor(securityData?.threatLevel) : 'text-foreground'
              }`}>
                {metric?.value}
              </p>
            </div>
          ))}
        </div>

        {selectedTab === 'alerts' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground">Security Alerts</h4>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="Clock" size={12} />
                <span>Last scan: {securityData?.lastScan}</span>
              </div>
            </div>

            <div className="space-y-3">
              {securityAlerts?.map((alert) => (
                <div key={alert?.id} className={`p-4 border rounded-lg ${getSeverityColor(alert?.severity)}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Icon name="AlertTriangle" size={14} className={
                          alert?.severity === 'high' ? 'text-red-600' :
                          alert?.severity === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                        } />
                        <span className="font-medium text-sm text-foreground capitalize">
                          {alert?.type?.replace('_', ' ')}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(alert?.status)}`}>
                          {alert?.status}
                        </span>
                      </div>
                      <p className="text-sm text-foreground mb-1">{alert?.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{alert?.timestamp}</span>
                        <span>📍 {alert?.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleSecurityAction('investigate', alert?.id)}
                      className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                    >
                      Investigate
                    </button>
                    {alert?.status === 'active' && (
                      <button 
                        onClick={() => handleSecurityAction('block', alert?.id)}
                        className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                      >
                        Block
                      </button>
                    )}
                    <button 
                      onClick={() => handleSecurityAction('dismiss', alert?.id)}
                      className="px-3 py-1 text-xs border border-current rounded-md hover:bg-muted transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'access' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground">Access Control Logs</h4>
              <button className="text-xs text-primary hover:text-primary/80">
                View Full Logs
              </button>
            </div>

            <div className="space-y-3">
              {accessControlLogs?.map((log) => (
                <div key={log?.id} className="p-3 border border-border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-foreground">{log?.user}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(log?.status)}`}>
                          {log?.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{log?.action}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                        <span>{log?.timestamp}</span>
                        <span>IP: {log?.ip}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Security Actions */}
        <div className="pt-4 border-t border-border mt-6">
          <div className="grid grid-cols-2 gap-2">
            <button className="px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              Run Security Scan
            </button>
            <button className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors">
              Security Report
            </button>
            <button className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors">
              Update Firewall
            </button>
            <button className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors">
              Audit Trail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityCenterCard;