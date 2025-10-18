import React, { useState } from 'react';
import Icon from '../../../components/Appicon';
import { Input } from '../../../components/ui/Input';

const FAQSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState(new Set());

  const categories = [
    { id: 'all', name: 'All Topics', count: 24 },
    { id: 'booking', name: 'Booking', count: 8 },
    { id: 'payment', name: 'Payment', count: 6 },
    { id: 'account', name: 'Account', count: 5 },
    { id: 'technical', name: 'Technical', count: 3 },
    { id: 'property', name: 'Property', count: 2 }
  ];

  const faqItems = [
    {
      id: 1,
      category: 'booking',
      question: 'How do I modify or cancel my booking?',
      answer: 'You can modify or cancel your booking through your account dashboard. Go to "My Bookings" and select the reservation you want to change. Please note that cancellation policies vary by property and may include fees.',
      helpful: 89,
      tags: ['booking', 'cancellation', 'modification']
    },
    {
      id: 2,
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and bank transfers. Some properties may also accept cryptocurrency payments.',
      helpful: 95,
      tags: ['payment', 'credit card', 'paypal']
    },
    {
      id: 3,
      category: 'booking',
      question: 'When will I receive my booking confirmation?',
      answer: 'Booking confirmations are sent immediately after payment is processed. Check your email inbox and spam folder. You can also view your confirmation in the "My Bookings" section of your account.',
      helpful: 87,
      tags: ['booking', 'confirmation', 'email']
    },
    {
      id: 4,
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'Click "Forgot Password" on the login page and enter your email address. We\'ll send you a secure link to reset your password. If you don\'t receive the email within 15 minutes, check your spam folder or contact support.',
      helpful: 92,
      tags: ['account', 'password', 'login']
    },
    {
      id: 5,
      category: 'payment',
      question: 'Why was my payment declined?',
      answer: 'Payment declines can occur due to insufficient funds, incorrect card details, security blocks, or expired cards. Contact your bank to verify the issue, or try a different payment method.',
      helpful: 78,
      tags: ['payment', 'declined', 'error']
    },
    {
      id: 6,
      category: 'booking',
      question: 'What is your cancellation policy?',
      answer: 'Cancellation policies vary by property. Most offer free cancellation up to 24-48 hours before check-in. Premium properties may have stricter policies. Always check the specific policy during booking.',
      helpful: 85,
      tags: ['booking', 'cancellation', 'policy']
    },
    {
      id: 7,
      category: 'technical',
      question: 'The website is not loading properly. What should I do?',
      answer: 'Try clearing your browser cache, disabling browser extensions, or using an incognito/private window. If the issue persists, try a different browser or device. Contact technical support if problems continue.',
      helpful: 81,
      tags: ['technical', 'website', 'loading']
    },
    {
      id: 8,
      category: 'account',
      question: 'How do I update my personal information?',
      answer: 'Log into your account and go to "Profile Settings". You can update your name, email, phone number, and preferences. Some changes may require email verification for security purposes.',
      helpful: 88,
      tags: ['account', 'profile', 'update']
    }
  ];

  const filteredFAQs = faqItems?.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item?.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      item?.question?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item?.answer?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item?.tags?.some(tag => tag?.toLowerCase()?.includes(searchTerm?.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded?.has(id)) {
      newExpanded?.delete(id);
    } else {
      newExpanded?.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const handleHelpful = (id, helpful) => {
    // Simulate helpful vote
    console.log(`FAQ ${id} marked as ${helpful ? 'helpful' : 'not helpful'}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Frequently Asked Questions</h2>
        <p className="text-muted-foreground">
          Find quick answers to common questions. Can't find what you're looking for? Contact our support team.
        </p>
      </div>
      {/* Search Bar */}
      <div className="relative">
        <Input
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          className="pl-10"
        />
        <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
      </div>
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => setSelectedCategory(category?.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category?.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {category?.name}
            <span className="ml-1.5 text-xs opacity-75">({category?.count})</span>
          </button>
        ))}
      </div>
      {/* FAQ Results */}
      <div className="space-y-4">
        {filteredFAQs?.length > 0 ? (
          <>
            <p className="text-sm text-muted-foreground">
              Showing {filteredFAQs?.length} {filteredFAQs?.length === 1 ? 'result' : 'results'}
            </p>
            
            <div className="space-y-3">
              {filteredFAQs?.map((item) => (
                <div
                  key={item?.id}
                  className="border border-border rounded-lg overflow-hidden hover:shadow-brand-sm transition-shadow"
                >
                  <button
                    onClick={() => toggleExpanded(item?.id)}
                    className="w-full text-left p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-foreground pr-4">{item?.question}</h3>
                      <Icon 
                        name={expandedItems?.has(item?.id) ? "ChevronUp" : "ChevronDown"} 
                        size={20} 
                        className="text-muted-foreground flex-shrink-0"
                      />
                    </div>
                  </button>
                  
                  {expandedItems?.has(item?.id) && (
                    <div className="px-4 pb-4 border-t border-border bg-muted/20">
                      <div className="pt-4">
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {item?.answer}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item?.tags?.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        {/* Helpful Rating */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>{item?.helpful}% found this helpful</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">Was this helpful?</span>
                            <button
                              onClick={() => handleHelpful(item?.id, true)}
                              className="p-1 hover:bg-green-100 rounded transition-colors"
                              title="Yes, this was helpful"
                            >
                              <Icon name="ThumbsUp" size={16} className="text-green-600" />
                            </button>
                            <button
                              onClick={() => handleHelpful(item?.id, false)}
                              className="p-1 hover:bg-red-100 rounded transition-colors"
                              title="No, this wasn't helpful"
                            >
                              <Icon name="ThumbsDown" size={16} className="text-red-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No results found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We couldn't find any FAQs matching your search. Try different keywords or browse by category.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => setSearchTerm('')}
                className="text-primary hover:underline text-sm font-medium"
              >
                Clear search
              </button>
              <p className="text-xs text-muted-foreground">
                Still need help? <a href="#contact-form" className="text-primary hover:underline">Contact our support team</a>
              </p>
            </div>
          </div>
        )}
      </div>
      {/* FAQ Footer */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="text-blue-700 font-medium mb-1">Still have questions?</p>
            <p className="text-blue-600">
              Our support team is here to help. Start a live chat or send us a message and we'll respond within 2 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;