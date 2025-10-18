import React, { useState, useEffect } from 'react';
import Icon from '../../../components/Appicon';
import {Button} from '../../../components/ui/Button';

const LiveChatWidget = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [agentStatus, setAgentStatus] = useState('online');
  const [waitTime, setWaitTime] = useState(0);

  // Simulate real-time agent status
  useEffect(() => {
    const interval = setInterval(() => {
      const hour = new Date()?.getHours();
      const isBusinessHours = hour >= 6 && hour <= 22; // 6 AM to 10 PM

      setIsOnline(isBusinessHours);
      setAgentStatus(isBusinessHours ? 'online' : 'offline');
      setWaitTime(isBusinessHours ? Math.floor(Math.random() * 3) + 1 : 0);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const agentProfiles = [
  { name: 'Sarah Chen', avatar: "https://images.unsplash.com/photo-1678667720699-5c0fc04ac166", specialty: 'Booking Support', rating: 4.9 },
  { name: 'David Rodriguez', avatar: "https://images.unsplash.com/photo-1664988478104-d1d8039bc2ae", specialty: 'Technical Issues', rating: 4.8 },
  { name: 'Emma Thompson', avatar: "https://images.unsplash.com/photo-1698364019043-23fc0d9e7839", specialty: 'Payment & Billing', rating: 4.9 }];


  return (
    <>
      {/* Live Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChat}
          className={`group relative flex items-center justify-center w-14 h-14 rounded-full shadow-brand-lg transition-all duration-300 hover:scale-110 ${
          isOnline ? 'bg-primary text-primary-foreground' : 'bg-gray-500 text-white'}`
          }>

          {isChatOpen ?
          <Icon name="X" size={24} /> :

          <Icon name="MessageCircle" size={24} />
          }
          
          {/* Online Indicator */}
          {isOnline &&
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
          }
          
          {/* Notification Badge */}
          {!isChatOpen && isOnline &&
          <div className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
              1
            </div>
          }
        </button>
        
        {/* Hover Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap">
            {isOnline ? 'Start Live Chat' : 'Chat Offline'}
            <div className="w-3 h-3 bg-gray-900 rotate-45 absolute top-full right-4 transform -translate-y-1/2"></div>
          </div>
        </div>
      </div>
      {/* Chat Window */}
      {isChatOpen &&
      <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-background border border-border rounded-lg shadow-brand-2xl z-50 flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className={`p-4 ${isOnline ? 'bg-primary text-primary-foreground' : 'bg-gray-500 text-white'}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon name="MessageCircle" size={20} />
                <h3 className="font-semibold">Live Chat Support</h3>
              </div>
              <button
              onClick={toggleChat}
              className="hover:bg-white/10 p-1 rounded">

                <Icon name="Minus" size={16} />
              </button>
            </div>
            
            {isOnline ?
          <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                <span>Support team is online</span>
                {waitTime > 0 &&
            <>
                    <span>•</span>
                    <span>Typical wait: {waitTime} min</span>
                  </>
            }
              </div> :

          <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <span>Support team is offline</span>
                <span>•</span>
                <span>Back at 6:00 AM</span>
              </div>
          }
          </div>

          {/* Chat Content */}
          <div className="flex-1 flex flex-col">
            {isOnline ?
          <>
                {/* Available Agents */}
                <div className="p-4 border-b border-border">
                  <p className="text-sm text-muted-foreground mb-3">Available agents:</p>
                  <div className="space-y-2">
                    {agentProfiles?.slice(0, 2)?.map((agent, index) =>
                <div key={index} className="flex items-center space-x-3">
                        <img
                    src={agent?.avatar}
                    alt={`${agent?.name} profile`}
                    className="w-8 h-8 rounded-full object-cover" />

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{agent?.name}</p>
                          <p className="text-xs text-muted-foreground">{agent?.specialty}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Star" size={12} className="text-yellow-500 fill-current" />
                          <span className="text-xs text-muted-foreground">{agent?.rating}</span>
                        </div>
                      </div>
                )}
                  </div>
                </div>

                {/* Chat Messages Area */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                  {/* Welcome Message */}
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Bot" size={16} className="text-primary-foreground" />
                    </div>
                    <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm text-foreground">
                        👋 Hi! Welcome to StayFinder Pro support. I'm here to help you with:
                      </p>
                      <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                        <li>• Booking assistance</li>
                        <li>• Payment issues</li>
                        <li>• Technical support</li>
                        <li>• General questions</li>
                      </ul>
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Quick actions:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="text-left p-2 bg-muted hover:bg-muted/80 rounded-lg text-sm transition-colors">
                        <Icon name="Calendar" size={14} className="inline mr-1" />
                        Booking Help
                      </button>
                      <button className="text-left p-2 bg-muted hover:bg-muted/80 rounded-lg text-sm transition-colors">
                        <Icon name="CreditCard" size={14} className="inline mr-1" />
                        Payment Issue
                      </button>
                      <button className="text-left p-2 bg-muted hover:bg-muted/80 rounded-lg text-sm transition-colors">
                        <Icon name="AlertTriangle" size={14} className="inline mr-1" />
                        Technical Problem
                      </button>
                      <button className="text-left p-2 bg-muted hover:bg-muted/80 rounded-lg text-sm transition-colors">
                        <Icon name="HelpCircle" size={14} className="inline mr-1" />
                        Other Question
                      </button>
                    </div>
                  </div>
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex space-x-2">
                    <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary" />

                    <Button size="sm" className="px-3">
                      <Icon name="Send" size={16} />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Press Enter to send • Powered by StayFinder Pro
                  </p>
                </div>
              </> :

          // Offline Mode
          <div className="flex-1 p-4 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Icon name="Clock" size={24} className="text-gray-400" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Support team is offline</h4>
                <p className="text-sm text-muted-foreground mb-6">
                  We're available from 6:00 AM to 10:00 PM PST. 
                  For urgent matters, please call our 24/7 hotline.
                </p>
                <div className="space-y-2 w-full">
                  <Button variant="outline" size="sm" fullWidth>
                    <Icon name="Phone" size={16} className="mr-1" />
                    Call 24/7 Hotline
                  </Button>
                  <Button variant="ghost" size="sm" fullWidth>
                    <Icon name="Mail" size={16} className="mr-1" />
                    Send Email Instead
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  We'll be back online in 7 hours
                </p>
              </div>
          }
          </div>
        </div>
      }
    </>);

};

export default LiveChatWidget;