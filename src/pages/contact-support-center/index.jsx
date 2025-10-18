import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/ui/Header';
import ContactForm from './components/ContactForm';
import LiveChatWidget from './components/LiveChatWidget';
import FAQSection from './components/FAQSection';
import SupportTickets from './components/SupportTickets';
import ContactMethods from './components/ContactMethods';
import EmergencyAssistance from './components/EmergencyAssistance';
import FeedbackPortal from './components/FeedbackPortal';
import OfficeLocations from './components/OfficeLocations';
import SupportHero from './components/SupportHero';

const ContactSupportCenter = () => {
  return (
    <>
      <Helmet>
        <title>Contact & Support Center - StayFinder Pro | 24/7 Customer Support</title>
        <meta name="description" content="Get comprehensive support for your StayFinder Pro booking experience. Contact our expert team via live chat, phone, email, or support tickets. Emergency assistance available 24/7." />
        <meta name="keywords" content="customer support, help center, contact, live chat, booking support, travel assistance, 24/7 support" />
        <meta property="og:title" content="Contact & Support Center - StayFinder Pro" />
        <meta property="og:description" content="Multi-channel customer support hub with live chat, support tickets, FAQ, and emergency assistance for all your travel needs." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="/contact-support-center" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Support Hero Section */}
          <SupportHero />
          
          {/* Live Chat Widget */}
          <LiveChatWidget />
          
          {/* Contact Form Section */}
          <section className="py-16 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12">
                <ContactForm />
                <ContactMethods />
              </div>
            </div>
          </section>
          
          {/* Emergency Assistance */}
          <EmergencyAssistance />
          
          {/* Support Tickets & FAQ */}
          <section className="py-16 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12">
                <SupportTickets />
                <FAQSection />
              </div>
            </div>
          </section>
          
          {/* Feedback Portal */}
          <FeedbackPortal />
          
          {/* Office Locations */}
          <OfficeLocations />
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold mb-4">Still Need Help?</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Our support team is here to ensure you have the best possible experience with StayFinder Pro. 
                We're committed to resolving your queries quickly and efficiently.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  Start Live Chat
                </button>
                <button className="border border-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  Call Support: +1-800-STAYFINDER
                </button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              {/* Support Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Support</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#contact-form" className="text-gray-400 hover:text-white transition-colors">Contact Form</a></li>
                  <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                  <li><a href="#live-chat" className="text-gray-400 hover:text-white transition-colors">Live Chat</a></li>
                  <li><a href="#emergency" className="text-gray-400 hover:text-white transition-colors">Emergency Help</a></li>
                  <li><a href="#feedback" className="text-gray-400 hover:text-white transition-colors">Feedback</a></li>
                </ul>
              </div>

              {/* Support Categories */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Support Topics</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Booking Issues</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Payment Problems</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Account Management</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Property Questions</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Technical Support</a></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
                <ul className="space-y-2 text-sm">
                  <li className="text-gray-400">📞 +1-800-STAYFINDER</li>
                  <li className="text-gray-400">📧 support@stayfinder.pro</li>
                  <li className="text-gray-400">🌐 24/7 Live Chat</li>
                  <li className="text-gray-400">📍 Global Offices</li>
                  <li className="text-gray-400">⏰ Response: &lt;2 hours</li>
                </ul>
              </div>

              {/* Service Level */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Service Commitment</h4>
                <ul className="space-y-2 text-sm">
                  <li className="text-gray-400">✓ 24/7 Emergency Support</li>
                  <li className="text-gray-400">✓ &lt;2hr Response Time</li>
                  <li className="text-gray-400">✓ Multi-language Support</li>
                  <li className="text-gray-400">✓ 99.9% Resolution Rate</li>
                  <li className="text-gray-400">✓ Accessibility Compliant</li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 pt-8 text-center">
              <p className="text-gray-400 text-sm">
                © {new Date()?.getFullYear()} StayFinder Pro Support Center. We're here to help 24/7.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ContactSupportCenter;