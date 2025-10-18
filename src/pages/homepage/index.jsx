import React from "react";
import { Helmet } from "react-helmet-async"; // <-- CORRECTED IMPORT
import Header from "../../components/ui/Header";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import FeaturedDestinations from "./components/FeaturedDestinations";
import SocialProofSection from "./components/SocialProofSection";
import CallToActionSection from "./components/CallToActionSection";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>StayFinder Pro - Your Perfect Stay, Simplified | Hotel Booking Platform</title>
        <meta name="description" content="Discover extraordinary accommodations worldwide with StayFinder Pro. Book hotels with confidence - secure booking, instant confirmation, and best price guarantee. Join 2M+ happy travelers." />
        <meta name="keywords" content="hotel booking, accommodation, travel, hotels, resorts, vacation rental, business travel, luxury hotels" />
        <meta property="og:title" content="StayFinder Pro - Your Perfect Stay, Simplified" />
        <meta property="og:description" content="Find and book the perfect hotel from 50,000+ properties worldwide. Secure booking, instant confirmation, 24/7 support." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="/homepage" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section with Search */}
          <HeroSection />
          
          {/* Featured Destinations Carousel */}
          <FeaturedDestinations />
          
          {/* Features and Benefits */}
          <FeaturesSection />
          
          {/* Social Proof and Testimonials */}
          <SocialProofSection />
          
          {/* Call to Action */}
          <CallToActionSection />
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              {/* Brand */}
              <div className="md:col-span-1">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="text-xl font-bold font-accent">StayFinder</span>
                    <span className="text-xs text-gray-400 block">Pro</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Your trusted partner for extraordinary accommodations worldwide. 
                  Making every booking the first step of an amazing journey.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/search-results" className="text-gray-400 hover:text-white transition-colors">Search Hotels</a></li>
                  <li><a href="/hotel-details" className="text-gray-400 hover:text-white transition-colors">Featured Hotels</a></li>
                  <li><a href="/booking-flow" className="text-gray-400 hover:text-white transition-colors">Book Now</a></li>
                  <li><a href="/user-dashboard" className="text-gray-400 hover:text-white transition-colors">My Account</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                </ul>
              </div>

              {/* For Business */}
              <div>
                <h3 className="text-lg font-semibold mb-4">For Business</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/owner-portal" className="text-gray-400 hover:text-white transition-colors">List Your Property</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Partner Program</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Corporate Travel</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Integration</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Affiliate Program</a></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Customer Service</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Safety Center</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © {new Date()?.getFullYear()} StayFinder Pro. All rights reserved.
              </p>
              {/* Stylish "Made with love" text */}
                <p className="text-sm font-semibold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 mt-4 md:mt-0">
                  Made with love❤️ by Rishabh Rajak
                </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                  <span>PCI Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;