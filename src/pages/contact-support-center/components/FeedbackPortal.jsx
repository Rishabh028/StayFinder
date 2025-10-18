import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Icon from '../../../components/Appicon';
import {Button} from '../../../components/ui/Button';
import {Input} from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FeedbackPortal = () => {
  const [activeTab, setActiveTab] = useState('feedback');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [rating, setRating] = useState(0);
  
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();

  const feedbackCategories = [
    { value: 'website_app', label: 'Website/App Experience', icon: 'Monitor' },
    { value: 'booking_process', label: 'Booking Process', icon: 'Calendar' },
    { value: 'customer_service', label: 'Customer Service', icon: 'Users' },
    { value: 'property_quality', label: 'Property Quality', icon: 'Building2' },
    { value: 'payment_billing', label: 'Payment & Billing', icon: 'CreditCard' },
    { value: 'new_features', label: 'Feature Suggestions', icon: 'Lightbulb' },
    { value: 'other', label: 'Other Feedback', icon: 'MessageSquare' }
  ];

  const suggestionTypes = [
    { value: 'new_feature', label: 'New Feature Idea', icon: 'Plus' },
    { value: 'improvement', label: 'Existing Feature Improvement', icon: 'RefreshCw' },
    { value: 'integration', label: 'Third-party Integration', icon: 'Link' },
    { value: 'mobile_app', label: 'Mobile App Enhancement', icon: 'Smartphone' },
    { value: 'accessibility', label: 'Accessibility Improvement', icon: 'Accessibility' }
  ];

  const tabs = [
    { id: 'feedback', label: 'General Feedback', icon: 'MessageCircle' },
    { id: 'suggestions', label: 'Feature Suggestions', icon: 'Lightbulb' },
    { id: 'testimonial', label: 'Share Success Story', icon: 'Star' }
  ];

  const recentFeedback = [
    {
      id: 1,
      type: 'improvement',
      title: 'Faster checkout process',
      description: 'The checkout could be streamlined with saved payment methods',
      status: 'under_review',
      votes: 24,
      date: '2024-10-10'
    },
    {
      id: 2,
      type: 'new_feature',
      title: 'Dark mode for mobile app',
      description: 'Add dark mode option for better night-time usage',
      status: 'planned',
      votes: 156,
      date: '2024-10-08'
    },
    {
      id: 3,
      type: 'integration',
      title: 'Calendar sync integration',
      description: 'Sync bookings with Google Calendar and Outlook',
      status: 'in_development',
      votes: 89,
      date: '2024-10-05'
    }
  ];

  const statusConfig = {
    submitted: { label: 'Submitted', color: 'text-blue-600', bg: 'bg-blue-100' },
    under_review: { label: 'Under Review', color: 'text-yellow-600', bg: 'bg-yellow-100' },
    planned: { label: 'Planned', color: 'text-purple-600', bg: 'bg-purple-100' },
    in_development: { label: 'In Development', color: 'text-orange-600', bg: 'bg-orange-100' },
    completed: { label: 'Completed', color: 'text-green-600', bg: 'bg-green-100' }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      reset();
      setRating(0);
      
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVote = (feedbackId) => {
    console.log(`Voted for feedback ${feedbackId}`);
  };

  const StarRating = ({ rating, onRatingChange, readonly = false }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => !readonly && onRatingChange?.(star)}
            className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-all`}
          >
            <Icon
              name="Star"
              size={24}
              className={`${
                star <= rating
                  ? 'text-yellow-400 fill-current' :'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Feedback & Suggestions</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your feedback drives our improvements. Share your thoughts, suggest new features, 
            and help us create an even better experience for travelers worldwide.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Feedback Form */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-6 bg-muted/30 p-1 rounded-lg">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab?.id
                      ? 'bg-background text-foreground shadow-brand-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>

            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <div className="flex items-center space-x-2 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200 mb-6">
                <Icon name="CheckCircle" size={20} />
                <span>Thank you for your feedback! We'll review it and get back to you if needed.</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="flex items-center space-x-2 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 mb-6">
                <Icon name="AlertCircle" size={20} />
                <span>Something went wrong. Please try again or contact support.</span>
              </div>
            )}

            {/* Feedback Form */}
            <div className="bg-background border border-border rounded-lg p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {activeTab === 'feedback' && (
                  <>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        label="Your Name (Optional)"
                        placeholder="Enter your name"
                        {...register('name')}
                      />
                      <Input
                        type="email"
                        label="Email Address (Optional)"
                        placeholder="Enter your email"
                        {...register('email', {
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Please enter a valid email address'
                          }
                        })}
                        error={errors?.email?.message}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Feedback Category
                      </label>
                      <Select
                        {...register('category', { required: 'Please select a category' })}
                        error={errors?.category?.message}
                      >
                        <option value="">Select feedback category</option>
                        {feedbackCategories?.map((category) => (
                          <option key={category?.value} value={category?.value}>
                            {category?.label}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Overall Rating
                      </label>
                      <div className="flex items-center space-x-4">
                        <StarRating rating={rating} onRatingChange={setRating} />
                        <span className="text-sm text-muted-foreground">
                          {rating > 0 && `${rating} out of 5 stars`}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'suggestions' && (
                  <>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        label="Your Name (Optional)"
                        placeholder="Enter your name"
                        {...register('name')}
                      />
                      <Input
                        type="email"
                        label="Email Address (Optional)"
                        placeholder="Enter your email"
                        {...register('email')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Suggestion Type
                      </label>
                      <Select
                        {...register('suggestion_type', { required: 'Please select a suggestion type' })}
                        error={errors?.suggestion_type?.message}
                      >
                        <option value="">Select suggestion type</option>
                        {suggestionTypes?.map((type) => (
                          <option key={type?.value} value={type?.value}>
                            {type?.label}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <Input
                      label="Feature Title"
                      placeholder="Brief title for your suggestion"
                      {...register('title', { required: 'Title is required' })}
                      error={errors?.title?.message}
                    />
                  </>
                )}

                {activeTab === 'testimonial' && (
                  <>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        label="Your Name"
                        placeholder="Enter your full name"
                        {...register('name', { required: 'Name is required for testimonials' })}
                        error={errors?.name?.message}
                      />
                      <Input
                        label="Location (Optional)"
                        placeholder="City, Country"
                        {...register('location')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Your Experience Rating
                      </label>
                      <StarRating rating={rating} onRatingChange={setRating} />
                    </div>

                    <Input
                      label="Trip Destination"
                      placeholder="Where did you travel?"
                      {...register('destination')}
                    />
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {activeTab === 'feedback' ? 'Your Feedback' : 
                     activeTab === 'suggestions'? 'Detailed Description' : 'Your Success Story'}
                  </label>
                  <textarea
                    {...register('message', {
                      required: 'This field is required',
                      minLength: { value: 10, message: 'Please provide at least 10 characters' }
                    })}
                    rows={6}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
                    placeholder={
                      activeTab === 'feedback' 
                        ? "Tell us about your experience, what you liked, and what could be improved..." 
                        : activeTab === 'suggestions'
                        ? "Describe your feature idea in detail. How would it work? What problem would it solve?" :"Share your positive experience with StayFinder Pro. What made your trip special?"
                    }
                  />
                  {errors?.message && (
                    <p className="text-sm text-red-600 mt-1">{errors?.message?.message}</p>
                  )}
                </div>

                {activeTab === 'testimonial' && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="testimonial-consent"
                      {...register('testimonial_consent', { 
                        required: 'Please agree to allow us to use your testimonial' 
                      })}
                    />
                    <label htmlFor="testimonial-consent" className="text-sm text-muted-foreground">
                      I agree to let StayFinder Pro use this testimonial in marketing materials
                    </label>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <Icon name="Loader2" size={20} className="animate-spin" />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Icon name="Send" size={20} />
                      <span>
                        {activeTab === 'feedback' ? 'Submit Feedback' : 
                         activeTab === 'suggestions'? 'Submit Suggestion' : 'Share Story'}
                      </span>
                    </div>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Community Feedback */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Recent Community Feedback</h3>
              
              <div className="space-y-4">
                {recentFeedback?.map((feedback) => (
                  <div key={feedback?.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-foreground text-sm">{feedback?.title}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        statusConfig?.[feedback?.status]?.bg} ${statusConfig?.[feedback?.status]?.color}`}>
                        {statusConfig?.[feedback?.status]?.label}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {feedback?.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleVote(feedback?.id)}
                        className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Icon name="ThumbsUp" size={14} />
                        <span>{feedback?.votes}</span>
                      </button>
                      <span className="text-xs text-muted-foreground">
                        {new Date(feedback?.date)?.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" size="sm" fullWidth className="mt-4">
                View All Feedback
              </Button>
            </div>

            {/* Feedback Stats */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Your Impact</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Feedback Implemented</span>
                  <span className="font-semibold text-primary">1,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Community Votes</span>
                  <span className="font-semibold text-primary">18,432</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Average Rating</span>
                  <div className="flex items-center space-x-1">
                    <StarRating rating={4} onRatingChange={() => {}} readonly />
                    <span className="text-sm font-semibold text-primary">(4.2)</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Reward Program */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Icon name="Gift" size={20} className="text-yellow-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Feedback Rewards</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Earn points for valuable feedback and feature suggestions that help improve our platform.
                  </p>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackPortal;