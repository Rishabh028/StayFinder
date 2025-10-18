import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Icon from '../../../components/Appicon';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();

  const inquiryTypes = [
    { value: 'booking_support', label: 'Booking Support', icon: 'Calendar', description: 'Help with reservations, modifications, cancellations' },
    { value: 'technical_issues', label: 'Technical Issues', icon: 'AlertTriangle', description: 'Website problems, app bugs, login issues' },
    { value: 'partnership', label: 'Partnership Inquiries', icon: 'Handshake', description: 'Business partnerships, property listings' },
    { value: 'payment_billing', label: 'Payment & Billing', icon: 'CreditCard', description: 'Payment issues, refunds, billing questions' },
    { value: 'account_management', label: 'Account Management', icon: 'User', description: 'Profile updates, security, preferences' },
    { value: 'general', label: 'General Questions', icon: 'HelpCircle', description: 'Other questions and feedback' }
  ];

  const priorityLevels = [
    { value: 'low', label: 'Low', color: 'text-green-600' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
    { value: 'high', label: 'High', color: 'text-orange-600' },
    { value: 'urgent', label: 'Urgent', color: 'text-red-600' }
  ];

  const selectedInquiryType = watch('inquiry_type');
  const selectedInquiry = inquiryTypes?.find(type => type?.value === selectedInquiryType);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      reset();
      
      // Auto-clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Send us a Message</h2>
        <p className="text-muted-foreground">
          Fill out the form below and we'll get back to you within 2 hours during business hours.
        </p>
      </div>

      {/* Success/Error Messages */}
      {submitStatus === 'success' && (
        <div className="flex items-center space-x-2 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
          <Icon name="CheckCircle" size={20} />
          <span>Thank you! Your message has been sent successfully. We'll respond within 2 hours.</span>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="flex items-center space-x-2 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
          <Icon name="AlertCircle" size={20} />
          <span>Something went wrong. Please try again or contact us directly.</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Input
              label="First Name"
              placeholder="Enter your first name"
              {...register('first_name', { required: 'First name is required' })}
              error={errors?.first_name?.message}
            />
          </div>
          <div>
            <Input
              label="Last Name"
              placeholder="Enter your last name"
              {...register('last_name', { required: 'Last name is required' })}
              error={errors?.last_name?.message}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Input
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address'
                }
              })}
              error={errors?.email?.message}
            />
          </div>
          <div>
            <Input
              type="tel"
              label="Phone Number (Optional)"
              placeholder="Enter your phone number"
              {...register('phone')}
            />
          </div>
        </div>

        {/* Inquiry Details */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Inquiry Type
          </label>
          <Select
            {...register('inquiry_type', { required: 'Please select an inquiry type' })}
            error={errors?.inquiry_type?.message}
          >
            <option value="">Select inquiry type</option>
            {inquiryTypes?.map((type) => (
              <option key={type?.value} value={type?.value}>
                {type?.label}
              </option>
            ))}
          </Select>
          {selectedInquiry && (
            <p className="text-sm text-muted-foreground mt-1 flex items-center space-x-1">
              <Icon name={selectedInquiry?.icon} size={14} />
              <span>{selectedInquiry?.description}</span>
            </p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Priority Level
            </label>
            <Select
              {...register('priority', { required: 'Please select priority level' })}
              error={errors?.priority?.message}
            >
              <option value="">Select priority</option>
              {priorityLevels?.map((level) => (
                <option key={level?.value} value={level?.value}>
                  {level?.label}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Input
              label="Booking Reference (If applicable)"
              placeholder="e.g., BK123456789"
              {...register('booking_reference')}
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Message
          </label>
          <textarea
            {...register('message', { 
              required: 'Message is required',
              minLength: {
                value: 10,
                message: 'Message must be at least 10 characters long'
              }
            })}
            rows={6}
            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
            placeholder="Please describe your issue or question in detail. Include any relevant information that might help us assist you better."
          />
          {errors?.message && (
            <p className="text-sm text-red-600 mt-1">{errors?.message?.message}</p>
          )}
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Attachments (Optional)
          </label>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
            <Icon name="Upload" size={24} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-2">
              Drag and drop files here, or click to browse
            </p>
            <input
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
              {...register('attachments')}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-primary hover:text-primary/80 text-sm font-medium"
            >
              Choose Files
            </label>
            <p className="text-xs text-muted-foreground mt-1">
              Max 5MB per file. Supported: JPG, PNG, PDF, DOC, DOCX
            </p>
          </div>
        </div>

        {/* Consent */}
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="consent"
            {...register('consent', { required: 'Please agree to our privacy policy' })}
            className="mt-1"
          />
          <label htmlFor="consent" className="text-sm text-muted-foreground">
            I agree to StayFinder Pro's{' '}
            <a href="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </a>{' '}
            and consent to the processing of my personal data for support purposes.
          </label>
        </div>
        {errors?.consent && (
          <p className="text-sm text-red-600">{errors?.consent?.message}</p>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
          size="lg"
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <Icon name="Loader2" size={20} className="animate-spin" />
              <span>Sending Message...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Icon name="Send" size={20} />
              <span>Send Message</span>
            </div>
          )}
        </Button>
      </form>

      {/* Help Text */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="text-blue-700 font-medium mb-1">Need immediate assistance?</p>
            <p className="text-blue-600">
              For urgent issues, please call our 24/7 hotline at{' '}
              <span className="font-medium">+1-800-STAYFINDER</span> or use our live chat feature.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;