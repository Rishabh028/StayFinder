import React from 'react';
import Icon from '../../../components/Appicon';
import {Button} from '../../../components/ui/Button';

const SupportHero = () => {
  const supportStats = [
    { label: 'Response Time', value: '<2 hours', icon: 'Clock' },
    { label: 'Resolution Rate', value: '99.9%', icon: 'CheckCircle' },
    { label: 'Customer Satisfaction', value: '4.9/5', icon: 'Star' },
    { label: 'Languages Supported', value: '25+', icon: 'Globe' }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/5 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="Headphones" size={16} />
            <span>24/7 Customer Support</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            How can we
            <span className="text-primary block md:inline"> help you?</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Get comprehensive support for your StayFinder Pro experience. Our expert team is available 
            24/7 to assist with bookings, technical issues, partnerships, and general inquiries.
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="space-x-2">
              <Icon name="MessageCircle" size={20} />
              <span>Start Live Chat</span>
            </Button>
            <Button variant="outline" size="lg" className="space-x-2">
              <Icon name="Phone" size={20} />
              <span>Call Now: +1-800-STAYFINDER</span>
            </Button>
            <Button variant="ghost" size="lg" className="space-x-2">
              <Icon name="Mail" size={20} />
              <span>Send Email</span>
            </Button>
          </div>
        </div>

        {/* Support Statistics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportStats?.map((stat, index) => (
            <div 
              key={index}
              className="bg-background/60 backdrop-blur-sm border border-border rounded-2xl p-6 text-center hover:shadow-brand-md transition-all duration-300 hover:scale-105"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-xl mb-4">
                <Icon name={stat?.icon} size={24} />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{stat?.value}</div>
              <div className="text-sm text-muted-foreground">{stat?.label}</div>
            </div>
          ))}
        </div>

        {/* Business Hours Notice */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm border border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium">Support team is currently online</span>
            <span className="text-green-600">•</span>
            <span>Average response time: 1.2 minutes</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportHero;