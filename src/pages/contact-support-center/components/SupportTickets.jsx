import React, { useState } from 'react';
import Icon from '../../../components/Appicon';
import {Button} from '../../../components/ui/Button';
import {Input} from '../../../components/ui/Input';

const SupportTickets = () => {
  const [ticketNumber, setTicketNumber] = useState('');
  const [showTicketDetails, setShowTicketDetails] = useState(false);

  // Mock ticket data
  const sampleTicket = {
    id: 'TKT-2024-001234',
    status: 'in_progress',
    priority: 'high',
    subject: 'Unable to complete booking payment',
    description: 'I\'m trying to book a hotel room but the payment keeps failing. I\'ve tried multiple credit cards.',
    created: '2024-10-15T10:30:00Z',
    lastUpdate: '2024-10-15T14:45:00Z',
    assignedAgent: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      department: 'Payment Support'
    },
    updates: [
      {
        id: 1,
        timestamp: '2024-10-15T10:30:00Z',
        type: 'created',
        message: 'Ticket created by customer',
        author: 'System'
      },
      {
        id: 2,
        timestamp: '2024-10-15T11:15:00Z',
        type: 'agent_response',
        message: 'Thank you for contacting us. I\'ve reviewed your account and see the payment issue. Let me investigate this with our payment processor.',
        author: 'Sarah Chen'
      },
      {
        id: 3,
        timestamp: '2024-10-15T14:45:00Z',
        type: 'agent_response',
        message: 'I\'ve identified the issue - there\'s a temporary block on international cards. I\'ve whitelisted your account. Please try again and let me know if you still experience problems.',
        author: 'Sarah Chen'
      }
    ]
  };

  const statusConfig = {
    open: { label: 'Open', color: 'text-blue-600', bg: 'bg-blue-100', icon: 'Circle' },
    in_progress: { label: 'In Progress', color: 'text-yellow-600', bg: 'bg-yellow-100', icon: 'Clock' },
    waiting_customer: { label: 'Waiting for Customer', color: 'text-orange-600', bg: 'bg-orange-100', icon: 'User' },
    resolved: { label: 'Resolved', color: 'text-green-600', bg: 'bg-green-100', icon: 'CheckCircle' },
    closed: { label: 'Closed', color: 'text-gray-600', bg: 'bg-gray-100', icon: 'XCircle' }
  };

  const priorityConfig = {
    low: { label: 'Low', color: 'text-green-600' },
    medium: { label: 'Medium', color: 'text-yellow-600' },
    high: { label: 'High', color: 'text-orange-600' },
    urgent: { label: 'Urgent', color: 'text-red-600' }
  };

  const handleTicketLookup = () => {
    if (ticketNumber?.trim()) {
      setShowTicketDetails(true);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Support Tickets</h2>
        <p className="text-muted-foreground">
          Track your support requests and view detailed status updates from our team.
        </p>
      </div>
      {!showTicketDetails ? (
        // Ticket Lookup Form
        (<div className="space-y-6">
          <div className="p-6 border border-border rounded-lg">
            <h3 className="text-lg font-semibold text-foreground mb-4">Look Up Your Ticket</h3>
            
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter ticket number (e.g., TKT-2024-001234)"
                  value={ticketNumber}
                  onChange={(e) => setTicketNumber(e?.target?.value)}
                />
              </div>
              <Button onClick={handleTicketLookup} disabled={!ticketNumber?.trim()}>
                <Icon name="Search" size={18} className="mr-2" />
                Look Up
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-2">
              Your ticket number was sent to your email when you submitted your request.
            </p>
          </div>
          {/* Create New Ticket */}
          <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Plus" size={24} className="text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">Need to Create a New Ticket?</h3>
                <p className="text-muted-foreground mb-4">
                  If you have a new issue or question, use our contact form to create a support ticket. 
                  We'll assign an expert agent and keep you updated on progress.
                </p>
                <Button variant="outline">
                  <Icon name="MessageSquare" size={18} className="mr-2" />
                  Create New Ticket
                </Button>
              </div>
            </div>
          </div>
          {/* Ticket Benefits */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-background border border-border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Clock" size={16} className="text-primary" />
                <h4 className="font-medium text-foreground">Fast Response</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Average response time under 2 hours during business hours
              </p>
            </div>
            
            <div className="p-4 bg-background border border-border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Users" size={16} className="text-primary" />
                <h4 className="font-medium text-foreground">Expert Agents</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Specialized agents for different types of issues and questions
              </p>
            </div>
            
            <div className="p-4 bg-background border border-border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Bell" size={16} className="text-primary" />
                <h4 className="font-medium text-foreground">Email Updates</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Automatic notifications when your ticket status changes
              </p>
            </div>
            
            <div className="p-4 bg-background border border-border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="BarChart3" size={16} className="text-primary" />
                <h4 className="font-medium text-foreground">Full Tracking</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Complete history and status tracking for your requests
              </p>
            </div>
          </div>
        </div>)
      ) : (
        // Ticket Details View
        (<div className="space-y-6">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => setShowTicketDetails(false)}
            className="mb-4"
          >
            <Icon name="ArrowLeft" size={18} className="mr-2" />
            Back to Ticket Lookup
          </Button>
          {/* Ticket Header */}
          <div className="p-6 border border-border rounded-lg">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {sampleTicket?.subject}
                </h3>
                <p className="text-muted-foreground">Ticket #{sampleTicket?.id}</p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
                  statusConfig?.[sampleTicket?.status]?.bg} ${statusConfig?.[sampleTicket?.status]?.color}`}>
                  <Icon name={statusConfig?.[sampleTicket?.status]?.icon} size={14} />
                  <span>{statusConfig?.[sampleTicket?.status]?.label}</span>
                </div>
                
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  priorityConfig?.[sampleTicket?.priority]?.color} bg-background border`}>
                  {priorityConfig?.[sampleTicket?.priority]?.label} Priority
                </div>
              </div>
            </div>

            {/* Ticket Meta Info */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Created</p>
                <p className="text-sm font-medium">{formatDate(sampleTicket?.created)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Last Update</p>
                <p className="text-sm font-medium">{formatDate(sampleTicket?.lastUpdate)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Assigned Agent</p>
                <div className="flex items-center space-x-2">
                  <img
                    src={sampleTicket?.assignedAgent?.avatar}
                    alt={`${sampleTicket?.assignedAgent?.name} profile`}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <p className="text-sm font-medium">{sampleTicket?.assignedAgent?.name}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Department</p>
                <p className="text-sm font-medium">{sampleTicket?.assignedAgent?.department}</p>
              </div>
            </div>
          </div>
          {/* Ticket Timeline */}
          <div className="p-6 border border-border rounded-lg">
            <h4 className="text-lg font-semibold text-foreground mb-6">Ticket Activity</h4>
            
            <div className="space-y-6">
              {sampleTicket?.updates?.map((update, index) => (
                <div key={update?.id} className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      update?.type === 'created' ? 'bg-blue-100' :
                      update?.type === 'agent_response' ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <Icon 
                        name={
                          update?.type === 'created' ? 'Plus' :
                          update?.type === 'agent_response' ? 'MessageCircle' : 'User'
                        } 
                        size={16} 
                        className={
                          update?.type === 'created' ? 'text-blue-600' :
                          update?.type === 'agent_response' ? 'text-green-600' : 'text-gray-600'
                        }
                      />
                    </div>
                    
                    {index < sampleTicket?.updates?.length - 1 && (
                      <div className="w-0.5 h-6 bg-border mt-2 ml-4"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="text-sm font-medium text-foreground">{update?.author}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(update?.timestamp)}</p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{update?.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Add Response */}
          <div className="p-6 border border-border rounded-lg">
            <h4 className="text-lg font-semibold text-foreground mb-4">Add Response</h4>
            
            <div className="space-y-4">
              <textarea
                rows={4}
                placeholder="Type your response or additional information..."
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
              />
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm">
                    <Icon name="Paperclip" size={16} className="mr-1" />
                    Attach Files
                  </Button>
                </div>
                
                <Button>
                  <Icon name="Send" size={16} className="mr-2" />
                  Send Response
                </Button>
              </div>
            </div>
          </div>
        </div>)
      )}
    </div>
  );
};

export default SupportTickets;