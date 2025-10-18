import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import CompanyStorySection from './components/CompanyStorySection';
import TeamSection from './components/TeamSection';
import MissionSection from './components/MissionSection';
import StatisticsSection from './components/StatisticsSection';
import TechnologySection from './components/TechnologySection';
import PartnershipsSection from './components/PartnershipsSection';
import AwardsSection from './components/AwardsSection';
import ContactSection from './components/ContactSection';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About StayFinder Pro - Transforming Hotel Discovery | Our Story & Mission</title>
        <meta name="description" content="Discover the story behind StayFinder Pro - from our founding vision to transform hotel booking into inspiring journeys of discovery. Meet our team, explore our mission, and learn about our commitment to trust, choice, and seamless travel experiences." />
        <meta name="keywords" content="about stayfinder pro, company story, hotel booking platform, travel technology, mission vision, team, partnerships, awards" />
        <meta property="og:title" content="About StayFinder Pro - Transforming Hotel Discovery" />
        <meta property="og:description" content="Learn about our mission to transform hotel booking into inspiring journeys of discovery. Meet our team and explore our commitment to effortless travel experiences." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/images/about-hero.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About StayFinder Pro - Our Story & Mission" />
        <meta name="twitter:description" content="Discover the story behind StayFinder Pro and our mission to transform hotel booking into inspiring journeys of discovery." />
        <link rel="canonical" href="/about-page" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-16">
          {/* Hero Section with Brand Video */}
          <HeroSection />

          {/* Company Story */}
          <CompanyStorySection />

          {/* Mission Statement */}
          <MissionSection />

          {/* Statistics */}
          <StatisticsSection />

          {/* Team Showcase */}
          <TeamSection />

          {/* Technology Innovation */}
          <TechnologySection />

          {/* Partnership Ecosystem */}
          <PartnershipsSection />

          {/* Awards and Recognition */}
          <AwardsSection />

          {/* Contact Information */}
          <ContactSection />
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
                  Transforming hotel booking into inspiring journeys of discovery. 
                  Where wanderlust meets reliability.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.370 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/about-page" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Investor Relations</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sustainability</a></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Safety Center</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                </ul>
              </div>

              {/* Connect */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Connect</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Partner With Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Affiliate Program</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Developer API</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Travel Agents</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Corporate Travel</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © {new Date()?.getFullYear()} StayFinder Pro. All rights reserved. Making every journey extraordinary.
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Trusted Platform</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>ISO Certified</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AboutPage;