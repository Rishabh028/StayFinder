import React from 'react';
import Icon from '../../../components/Appicon';

const ContactMethods = () => {
  const contactMethods = [
    {
      id: 'phone',
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      details: [
        { label: 'US & Canada', value: '+1-800-STAYFINDER', subtext: 'Toll-free' },
        { label: 'UK & Ireland', value: '+44-800-123-4567', subtext: 'Free from landlines' },
        { label: 'Australia', value: '+61-1800-123-456', subtext: 'Free call' },
        { label: 'International', value: '+1-415-555-0123', subtext: 'Standard rates apply' }
      ],
      hours: '24/7 Emergency • 6 AM - 10 PM PST General Support',
      icon: 'Phone',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'email',
      title: 'Email Support',
      description: 'Send detailed queries and get comprehensive responses',
      details: [
        { label: 'General Support', value: 'support@stayfinder.pro', subtext: 'All general inquiries' },
        { label: 'Booking Help', value: 'bookings@stayfinder.pro', subtext: 'Reservation assistance' },
        { label: 'Payment Issues', value: 'billing@stayfinder.pro', subtext: 'Payment & refunds' },
        { label: 'Technical Support', value: 'tech@stayfinder.pro', subtext: 'App & website issues' },
        { label: 'Partnership', value: 'partners@stayfinder.pro', subtext: 'Business inquiries' }
      ],
      hours: 'Response within 2 hours • Business days',
      icon: 'Mail',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'social',
      title: 'Social Media',
      description: 'Connect with us on social platforms',
      details: [
        { label: 'Twitter', value: '@StayFinderPro', subtext: 'Quick updates & support' },
        { label: 'Facebook', value: 'facebook.com/stayfinderpro', subtext: 'Community & announcements' },
        { label: 'Instagram', value: '@stayfinderpro', subtext: 'Travel inspiration' },
        { label: 'LinkedIn', value: 'StayFinder Pro', subtext: 'Business updates' }
      ],
      hours: 'Monitored during business hours',
      icon: 'MessageSquare',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ];

  const emergencyInfo = {
    title: '24/7 Emergency Assistance',
    description: 'For urgent booking issues, safety concerns, or emergency travel assistance',
    hotline: '+1-800-EMERGENCY',
    features: [
      'Immediate response for safety concerns',
      'Emergency rebooking assistance',
      'Travel disruption support',
      'Lost reservation recovery',
      'Payment authorization issues'
    ]
  };

  const serviceCommitments = [
    { metric: '<2 hours', label: 'Average Email Response', icon: 'Clock' },
    { metric: '<30 seconds', label: 'Average Phone Wait', icon: 'Phone' },
    { metric: '99.9%', label: 'Resolution Rate', icon: 'CheckCircle' },
    { metric: '25+', label: 'Languages Supported', icon: 'Globe' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Multiple Ways to Reach Us</h2>
        <p className="text-muted-foreground">
          Choose the contact method that works best for you. Our support team is available 
          across multiple channels to ensure you get help when you need it.
        </p>
      </div>

      {/* Contact Methods */}
      <div className="space-y-6">
        {contactMethods?.map((method) => (
          <div
            key={method?.id}
            className={`p-6 border rounded-lg transition-all hover:shadow-brand-sm ${method?.bgColor} ${method?.borderColor}`}
          >
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-background ${method?.color}`}>
                <Icon name={method?.icon} size={24} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-foreground mb-1">{method?.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{method?.description}</p>
                
                <div className="space-y-3">
                  {method?.details?.map((detail, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-foreground">{detail?.label}:</span>
                        <span className={`text-sm font-mono ${method?.color}`}>{detail?.value}</span>
                      </div>
                      {detail?.subtext && (
                        <span className="text-xs text-muted-foreground mt-1 sm:mt-0">{detail?.subtext}</span>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={14} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{method?.hours}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Assistance */}
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="AlertTriangle" size={24} className="text-white" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">{emergencyInfo?.title}</h3>
            <p className="text-muted-foreground mb-4">{emergencyInfo?.description}</p>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={18} className="text-red-600" />
                <span className="text-lg font-bold text-red-600">{emergencyInfo?.hotline}</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700 font-medium">Available 24/7</span>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-2">
              {emergencyInfo?.features?.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon name="Check" size={14} className="text-red-600 flex-shrink-0" />
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Service Level Commitments */}
      <div className="p-6 border border-border rounded-lg">
        <h3 className="text-lg font-semibold text-foreground mb-6 text-center">Our Service Commitments</h3>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {serviceCommitments?.map((commitment, index) => (
            <div key={index} className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name={commitment?.icon} size={20} className="text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{commitment?.metric}</div>
              <div className="text-sm text-muted-foreground">{commitment?.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Accessibility Notice */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Accessibility" size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="text-blue-700 font-medium mb-1">Accessibility Support</p>
            <p className="text-blue-600">
              We provide support for customers with disabilities. TTY services available at{' '}
              <span className="font-medium">1-800-TTY-STAY</span>. Our website and mobile app 
              follow WCAG 2.1 AA accessibility standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMethods;