import React from 'react';
import Icon from '../../../components/Appicon';
import Image from '../../../components/Appimage';

const FeaturesSection = () => {
  const features = [
  {
    id: 1,
    icon: "Search",
    title: "Smart Search Technology",
    description: "Our AI-powered search understands your preferences and finds the perfect match from over 50,000 properties worldwide.",
    image: "https://images.unsplash.com/photo-1666281466387-0639381c5680",
    imageAlt: "Modern laptop displaying hotel search interface with multiple property options and filtering tools on screen"
  },
  {
    id: 2,
    icon: "Shield",
    title: "Secure Booking Guarantee",
    description: "Book with confidence knowing your payment is protected and your reservation is guaranteed with our secure platform.",
    image: "https://images.unsplash.com/photo-1603899122361-e99b4f6fecf5",
    imageAlt: "Close-up of hands holding smartphone showing secure payment confirmation screen with green checkmark and lock icon"
  },
  {
    id: 3,
    icon: "Clock",
    title: "Instant Confirmation",
    description: "Get immediate booking confirmation and digital receipts. No waiting, no uncertainty - just instant peace of mind.",
    image: "https://images.unsplash.com/photo-1652936958114-9342efa6e6c9",
    imageAlt: "Smartphone notification screen showing booking confirmation message with hotel details and check-in information"
  },
  {
    id: 4,
    icon: "Headphones",
    title: "24/7 Customer Support",
    description: "Our dedicated support team is available around the clock to assist with any questions or changes to your booking.",
    image: "https://images.unsplash.com/photo-1709715357479-591f9971fb05",
    imageAlt: "Professional customer service representative wearing headset smiling while assisting customer at modern office desk"
  },
  {
    id: 5,
    icon: "DollarSign",
    title: "Best Price Guarantee",
    description: "Find a lower price elsewhere? We'll match it and give you an additional 10% off. Your savings are guaranteed.",
    image: "https://images.unsplash.com/photo-1723095304732-7bb4d8a69b51",
    imageAlt: "Calculator and financial documents showing price comparison charts with highlighted savings and discount percentages"
  },
  {
    id: 6,
    icon: "MapPin",
    title: "Local Insights",
    description: "Discover hidden gems and local recommendations from our travel experts and verified guest reviews.",
    image: "https://images.unsplash.com/photo-1716407503971-eb3120d7616e",
    imageAlt: "Vintage map with compass and travel pins marking popular destinations alongside local guidebook and travel photos"
  }];


  const benefits = [
  {
    icon: "Users",
    title: "2M+ Happy Travelers",
    description: "Join millions who trust us for their perfect stays"
  },
  {
    icon: "Building2",
    title: "50K+ Properties",
    description: "From boutique hotels to luxury resorts worldwide"
  },
  {
    icon: "Globe",
    title: "195 Countries",
    description: "Book accommodations anywhere in the world"
  },
  {
    icon: "Award",
    title: "Industry Leader",
    description: "Recognized as the best travel platform 2024"
  }];


  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-brand-heading mb-4">
            Why Choose StayFinder Pro?
          </h2>
          <p className="text-brand-body text-gray-600 max-w-3xl mx-auto">
            We've revolutionized hotel booking with cutting-edge technology, unmatched security, 
            and personalized service that puts your travel dreams first.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {features?.map((feature, index) =>
          <div
            key={feature?.id}
            className={`flex flex-col ${
            index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 group`
            }>

              {/* Image */}
              <div className="flex-1 relative">
                <div className="relative overflow-hidden rounded-2xl shadow-brand-md group-hover:shadow-brand-lg transition-brand">
                  <Image
                  src={feature?.image}
                  alt={feature?.imageAlt}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                  <Icon name={feature?.icon} size={28} className="text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {feature?.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature?.description}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-8 lg:p-12 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Trusted Worldwide</h3>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Our commitment to excellence has made us the preferred choice for travelers around the globe.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits?.map((benefit, index) =>
            <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                  <Icon name={benefit?.icon} size={24} className="text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-2">{benefit?.title}</h4>
                <p className="text-blue-100 text-sm">{benefit?.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Process Steps */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-brand-heading mb-4">How It Works</h3>
            <p className="text-brand-body text-gray-600">
              Booking your perfect stay is easier than ever with our streamlined process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
            {
              step: "01",
              icon: "Search",
              title: "Search & Compare",
              description: "Enter your destination and dates to discover thousands of verified properties with real-time availability."
            },
            {
              step: "02",
              icon: "Heart",
              title: "Choose Your Perfect Stay",
              description: "Filter by amenities, price, and location. Read authentic reviews and view detailed photos."
            },
            {
              step: "03",
              icon: "CheckCircle",
              title: "Book with Confidence",
              description: "Secure your reservation with our encrypted payment system and receive instant confirmation."
            }]?.
            map((step, index) =>
            <div key={index} className="relative text-center">
                {/* Connection Line */}
                {index < 2 &&
              <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gray-200 z-0">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full"></div>
                  </div>
              }

                <div className="relative z-10 bg-white">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-primary rounded-full mb-6 relative">
                    <span className="text-2xl font-bold text-white">{step?.step}</span>
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-brand-sm">
                      <Icon name={step?.icon} size={20} className="text-primary" />
                    </div>
                  </div>

                  <h4 className="text-xl font-semibold text-gray-900 mb-3">{step?.title}</h4>
                  <p className="text-gray-600">{step?.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

};

export default FeaturesSection;