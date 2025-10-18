import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/Appicon';
import Image from '../../../components/Appimage';
import {Button} from '../../../components/ui/Button';

const CallToActionSection = () => {
  const navigate = useNavigate();

  const quickActions = [
  {
    title: "Start Your Journey",
    description: "Search thousands of hotels worldwide",
    icon: "Search",
    action: () => navigate('/search-results'),
    color: "bg-primary"
  },
  {
    title: "Join as Hotel Owner",
    description: "List your property and grow your business",
    icon: "Building2",
    action: () => navigate('/owner-portal'),
    color: "bg-green-600"
  },
  {
    title: "Manage Your Bookings",
    description: "Access your travel dashboard",
    icon: "User",
    action: () => navigate('/user-dashboard'),
    color: "bg-purple-600"
  }];


  const offers = [
  {
    title: "First Booking Discount",
    description: "Get 15% off your first hotel booking",
    code: "WELCOME15",
    icon: "Percent",
    color: "text-green-600"
  },
  {
    title: "Extended Stay Savings",
    description: "Save up to 25% on stays of 7+ nights",
    code: "LONGSTAY25",
    icon: "Calendar",
    color: "text-blue-600"
  },
  {
    title: "Group Booking Benefits",
    description: "Special rates for 5+ rooms",
    code: "GROUP5",
    icon: "Users",
    color: "text-purple-600"
  }];


  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main CTA */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-accent">
            Ready to Find Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 block">
              Perfect Stay?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Join millions of travelers who trust StayFinder Pro for their accommodation needs. 
            Start your journey today and discover extraordinary places to stay around the world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="default"
              size="xl"
              onClick={() => navigate('/search-results')}
              iconName="Search"
              iconPosition="left"
              className="bg-white text-gray-900 hover:bg-gray-100 shadow-brand-lg">

              Start Searching Hotels
            </Button>
            <Button
              variant="outline"
              size="xl"
              onClick={() => navigate('/user-dashboard')}
              iconName="User"
              iconPosition="left"
              className="border-white text-white hover:bg-white hover:text-gray-900">

              Create Account
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {quickActions?.map((action, index) =>
          <div
            key={index}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-brand cursor-pointer group"
            onClick={action?.action}>

              <div className={`inline-flex items-center justify-center w-16 h-16 ${action?.color} rounded-full mb-4 group-hover:scale-110 transition-transform`}>
                <Icon name={action?.icon} size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{action?.title}</h3>
              <p className="text-gray-300 mb-4">{action?.description}</p>
              <div className="flex items-center text-blue-400 group-hover:text-blue-300">
                <span className="text-sm font-medium">Get Started</span>
                <Icon name="ArrowRight" size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          )}
        </div>

        {/* Special Offers */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-12 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Exclusive Offers</h3>
            <p className="text-gray-300">
              Take advantage of these limited-time deals and save on your next booking.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {offers?.map((offer, index) =>
            <div key={index} className="bg-white rounded-2xl p-6 text-gray-900 hover-lift">
                <div className="flex items-center space-x-3 mb-4">
                  <Icon name={offer?.icon} size={24} className={offer?.color} />
                  <h4 className="text-lg font-semibold">{offer?.title}</h4>
                </div>
                <p className="text-gray-600 mb-4">{offer?.description}</p>
                <div className="flex items-center justify-between">
                  <div className="bg-gray-100 px-3 py-1 rounded-lg">
                    <span className="text-sm font-mono font-semibold">{offer?.code}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary">
                    Copy Code
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 lg:p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <Icon name="Mail" size={48} className="text-white mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4">Stay in the Loop</h3>
            <p className="text-blue-100 mb-8">
              Get exclusive deals, travel tips, and destination inspiration delivered to your inbox. 
              Join over 500,000 subscribers who never miss a great deal.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white" />

              <Button
                variant="default"
                className="bg-white text-gray-900 hover:bg-gray-100 px-8">

                Subscribe
              </Button>
            </div>
            
            <p className="text-xs text-blue-200 mt-4">
              No spam, unsubscribe anytime. Read our privacy policy.
            </p>
          </div>
        </div>

        {/* Final CTA with Image */}
        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-6">
              Your Next Adventure Awaits
            </h3>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Whether you're planning a romantic getaway, family vacation, or business trip, 
              StayFinder Pro has the perfect accommodation waiting for you. With our extensive 
              network of verified properties and unbeatable customer service, your dream stay 
              is just a few clicks away.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
              "Instant booking confirmation",
              "24/7 customer support",
              "Best price guarantee",
              "Secure payment processing"]?.
              map((feature, index) =>
              <div key={index} className="flex items-center space-x-3">
                  <Icon name="CheckCircle" size={20} className="text-green-400" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              )}
            </div>
            
            <Button
              variant="default"
              size="lg"
              onClick={() => navigate('/search-results')}
              iconName="ArrowRight"
              iconPosition="right"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">

              Book Your Stay Now
            </Button>
          </div>
          
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-brand-lg">
              <Image
                src="https://images.unsplash.com/photo-1718303736391-1da48f357621"
                alt="Happy couple with luggage standing in elegant hotel lobby with marble floors and modern decor, smiling after successful check-in"
                className="w-full h-96 object-cover" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm opacity-90">Start your journey today</p>
                <p className="text-2xl font-bold">Find Your Perfect Stay</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default CallToActionSection;