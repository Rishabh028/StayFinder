import React from 'react';
import Icon from '../../../components/Appicon';
import { Button } from '../../../components/ui/Button';

const EmergencyAssistance = () => {
  const emergencyScenarios = [
    {
      title: 'Travel Disruptions',
      description: 'Flight cancellations, natural disasters, or unexpected events affecting your trip',
      icon: 'Plane',
      actions: ['Immediate rebooking assistance', 'Alternative accommodation', 'Travel insurance claims', 'Refund processing'],
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Safety & Security',
      description: 'Personal safety concerns, property security issues, or emergency situations',
      icon: 'Shield',
      actions: ['Emergency relocation', 'Local authority contact', 'Safety verification', '24/7 monitoring'],
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Medical Emergencies',
      description: 'Health-related issues requiring immediate accommodation changes or assistance',
      icon: 'Heart',
      actions: ['Medical facility proximity', 'Accessible accommodation', 'Insurance coordination', 'Family notification'],
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      title: 'Lost Reservations',
      description: 'Cannot find booking confirmation or property claims no reservation exists',
      icon: 'Search',
      actions: ['Booking verification', 'Property contact', 'Alternative arrangements', 'Immediate confirmation'],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ];

  const globalHotlines = [
    { region: 'Americas', number: '+1-800-EMERGENCY', timezone: 'Available 24/7' },
    { region: 'Europe', number: '+44-800-EMERGENCY', timezone: 'Available 24/7' },
    { region: 'Asia Pacific', number: '+61-1800-EMERGENCY', timezone: 'Available 24/7' },
    { region: 'Global', number: '+1-415-EMERGENCY', timezone: 'International rates apply' }
  ];

  const emergencyFeatures = [
    {
      icon: 'Clock',
      title: 'Instant Response',
      description: 'Average response time under 60 seconds for emergency calls'
    },
    {
      icon: 'Users',
      title: 'Dedicated Team',
      description: 'Specialized emergency response agents available 24/7'
    },
    {
      icon: 'Globe',
      title: 'Global Coverage',
      description: 'Emergency support available worldwide in 25+ languages'
    },
    {
      icon: 'Shield',
      title: 'Secure Protocol',
      description: 'Encrypted communications and verified identity processes'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="AlertTriangle" size={16} />
            <span>Emergency Support Available 24/7</span>
          </div>
          
          <h2 className="text-4xl font-bold text-foreground mb-4">Emergency Booking Assistance</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            When urgent travel situations arise, our emergency support team is here to help. 
            We provide immediate assistance for safety concerns, travel disruptions, and critical booking issues.
          </p>
        </div>

        {/* Emergency Hotline CTA */}
        <div className="mb-12">
          <div className="bg-red-500 text-white rounded-2xl p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-400 opacity-90"></div>
            <div className="relative z-10">
              <Icon name="Phone" size={48} className="mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">Emergency Hotline</h3>
              <p className="text-red-100 mb-6 text-lg">For immediate assistance with urgent travel issues</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <div className="text-2xl font-bold">+1-800-EMERGENCY</div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-red-100">Available 24/7 Worldwide</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-red-50">
                  <Icon name="Phone" size={20} className="mr-2" />
                  Call Now
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  Emergency Chat
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Scenarios */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">When to Use Emergency Support</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {emergencyScenarios?.map((scenario, index) => (
              <div
                key={index}
                className={`p-6 border border-border rounded-lg hover:shadow-brand-md transition-all ${scenario?.bgColor}`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-white ${scenario?.color}`}>
                    <Icon name={scenario?.icon} size={24} />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-foreground mb-2">{scenario?.title}</h4>
                    <p className="text-muted-foreground mb-4">{scenario?.description}</p>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">We provide:</p>
                      <ul className="space-y-1">
                        {scenario?.actions?.map((action, actionIndex) => (
                          <li key={actionIndex} className="flex items-center space-x-2">
                            <Icon name="Check" size={14} className={scenario?.color} />
                            <span className="text-sm text-foreground">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Hotlines */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Regional Emergency Numbers</h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {globalHotlines?.map((hotline, index) => (
              <div key={index} className="p-4 bg-background border border-border rounded-lg text-center">
                <h4 className="font-semibold text-foreground mb-2">{hotline?.region}</h4>
                <p className="text-lg font-mono text-primary mb-1">{hotline?.number}</p>
                <p className="text-xs text-muted-foreground">{hotline?.timezone}</p>
              </div>
            ))}
          </div>
          
          <p className="text-center text-sm text-muted-foreground mt-4">
            All numbers connect to our emergency response center with multilingual support
          </p>
        </div>

        {/* Emergency Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {emergencyFeatures?.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-background border border-border rounded-lg">
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name={feature?.icon} size={24} className="text-red-600" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">{feature?.title}</h4>
              <p className="text-sm text-muted-foreground">{feature?.description}</p>
            </div>
          ))}
        </div>

        {/* Emergency Protocol */}
        <div className="bg-background border border-border rounded-lg p-8">
          <h3 className="text-xl font-semibold text-foreground mb-6 text-center">Emergency Response Protocol</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Immediate Triage</h4>
              <p className="text-sm text-muted-foreground">
                Emergency specialist assesses situation severity and determines appropriate response level
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-yellow-600">2</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Rapid Response</h4>
              <p className="text-sm text-muted-foreground">
                Immediate action taken including property contact, alternative arrangements, or safety measures
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Follow-up Care</h4>
              <p className="text-sm text-muted-foreground">
                Continued monitoring and support until situation is fully resolved and you're safely accommodated
              </p>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-amber-800 font-medium mb-1">Important Notice</p>
              <p className="text-amber-700">
                Emergency support is for urgent situations requiring immediate assistance. For general inquiries, 
                please use our regular support channels. In life-threatening emergencies, contact local emergency 
                services (911, 112, etc.) first, then notify our emergency team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyAssistance;