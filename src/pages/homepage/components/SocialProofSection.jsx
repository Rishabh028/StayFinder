import React, { useState, useEffect } from 'react';
import Icon from '../../../components/Appicon';
import Image from '../../../components/Appimage';

const SocialProofSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [recentBookings, setRecentBookings] = useState([]);

  const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, NY",
    avatar: "https://images.unsplash.com/photo-1519234302787-f17b7656c7b3",
    avatarAlt: "Professional headshot of young woman with brown hair and warm smile wearing navy blazer",
    rating: 5,
    review: "StayFinder Pro made our European vacation planning effortless. The hotel recommendations were spot-on, and the booking process was incredibly smooth. We saved both time and money!",
    hotel: "Grand Hotel Vienna",
    verified: true
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1724128192920-a6f9083d6aac",
    avatarAlt: "Professional headshot of Asian man with short black hair wearing white dress shirt and confident smile",
    rating: 5,
    review: "As a frequent business traveler, I appreciate the detailed hotel information and instant confirmation. The customer service team went above and beyond when I needed to modify my booking last minute.",
    hotel: "Marriott Downtown Seattle",
    verified: true
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Miami, FL",
    avatar: "https://images.unsplash.com/photo-1550433830-5640b04d8134",
    avatarAlt: "Professional headshot of Hispanic woman with long dark hair and bright smile wearing coral colored top",
    rating: 5,
    review: "The best hotel booking experience I've ever had! The search filters helped me find exactly what I was looking for, and the photos were accurate. Our honeymoon was perfect thanks to StayFinder Pro.",
    hotel: "Oceanview Resort Bali",
    verified: true
  }];


  const mockRecentBookings = [
  { user: "Alex M.", hotel: "Hilton Garden Inn", location: "Chicago", time: "2 minutes ago" },
  { user: "Jessica L.", hotel: "The Ritz-Carlton", location: "New York", time: "5 minutes ago" },
  { user: "David K.", hotel: "W Hotel", location: "Los Angeles", time: "8 minutes ago" },
  { user: "Maria S.", hotel: "Four Seasons", location: "Miami", time: "12 minutes ago" },
  { user: "James T.", hotel: "Marriott", location: "Boston", time: "15 minutes ago" }];


  const stats = [
  { label: "Hotels Booked Today", value: "1,247", icon: "Calendar" },
  { label: "Active Users", value: "23,891", icon: "Users" },
  { label: "Countries Covered", value: "195", icon: "Globe" },
  { label: "Customer Satisfaction", value: "98.5%", icon: "Heart" }];


  const trustBadges = [
  { name: "SSL Secured", icon: "Shield", color: "text-green-500" },
  { name: "PCI Compliant", icon: "CreditCard", color: "text-blue-500" },
  { name: "24/7 Support", icon: "Headphones", color: "text-purple-500" },
  { name: "Best Price Guarantee", icon: "Award", color: "text-amber-500" }];


  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials?.length]);

  // Simulate recent bookings updates
  useEffect(() => {
    setRecentBookings(mockRecentBookings);
    const interval = setInterval(() => {
      setRecentBookings((prev) => {
        const updated = [...prev];
        // Simulate new booking
        const newBooking = {
          user: `User ${Math.floor(Math.random() * 1000)}`,
          hotel: "Premium Hotel",
          location: "Popular City",
          time: "Just now"
        };
        updated?.unshift(newBooking);
        return updated?.slice(0, 5);
      });
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-brand-heading mb-4">
            Trusted by Millions of Travelers
          </h2>
          <p className="text-brand-body text-gray-600 max-w-2xl mx-auto">
            Join our community of satisfied travelers who have discovered their perfect stays through StayFinder Pro.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats?.map((stat, index) =>
          <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Icon name={stat?.icon} size={24} className="text-primary" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat?.value}</div>
              <div className="text-sm text-gray-600">{stat?.label}</div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Testimonials */}
          <div className="bg-white rounded-2xl shadow-brand-md p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">What Our Travelers Say</h3>
              <div className="flex space-x-2">
                {testimonials?.map((_, index) =>
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-brand ${
                  index === currentTestimonial ? 'bg-primary' : 'bg-gray-300'}`
                  } />

                )}
              </div>
            </div>

            <div className="relative min-h-[200px]">
              {testimonials?.map((testimonial, index) =>
              <div
                key={testimonial?.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentTestimonial ? 'opacity-100' : 'opacity-0'}`
                }>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    {Array.from({ length: testimonial?.rating })?.map((_, i) =>
                  <Icon key={i} name="Star" size={16} className="text-amber-400 fill-current" />
                  )}
                  </div>

                  {/* Review */}
                  <blockquote className="text-gray-700 mb-6 leading-relaxed">
                    "{testimonial?.review}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center space-x-4">
                    <Image
                    src={testimonial?.avatar}
                    alt={testimonial?.avatarAlt}
                    className="w-12 h-12 rounded-full object-cover" />

                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-gray-900">{testimonial?.name}</h4>
                        {testimonial?.verified &&
                      <Icon name="CheckCircle" size={16} className="text-green-500" />
                      }
                      </div>
                      <p className="text-sm text-gray-500">{testimonial?.location}</p>
                      <p className="text-xs text-gray-400">Stayed at {testimonial?.hotel}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity & Trust Signals */}
          <div className="space-y-8">
            {/* Recent Bookings */}
            <div className="bg-white rounded-2xl shadow-brand-md p-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h3 className="text-lg font-semibold text-gray-900">Live Booking Activity</h3>
              </div>
              
              <div className="space-y-3">
                {recentBookings?.slice(0, 4)?.map((booking, index) =>
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{booking?.user}</p>
                      <p className="text-xs text-gray-500">booked {booking?.hotel} in {booking?.location}</p>
                    </div>
                    <span className="text-xs text-gray-400">{booking?.time}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-white rounded-2xl shadow-brand-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Security Matters</h3>
              <div className="grid grid-cols-2 gap-4">
                {trustBadges?.map((badge, index) =>
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Icon name={badge?.icon} size={20} className={badge?.color} />
                    <span className="text-sm font-medium text-gray-700">{badge?.name}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Awards */}
            <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl shadow-brand-md p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Industry Recognition</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Icon name="Award" size={20} className="text-amber-300" />
                  <span className="text-sm">Best Travel Platform 2024</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Star" size={20} className="text-amber-300" />
                  <span className="text-sm">4.8/5 Customer Rating</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Shield" size={20} className="text-green-300" />
                  <span className="text-sm">Certified Secure Platform</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default SocialProofSection;