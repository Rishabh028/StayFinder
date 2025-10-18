import React, { useState } from 'react';
import Icon from '../../../components/Appicon';
import Image from '../../../components/Appimage';
import {Button} from '../../../components/ui/Button';
import {Input} from '../../../components/ui/Input';

const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    nationality: "United States",
    address: "123 Main Street, New York, NY 10001",
    emergencyContact: "John Johnson - +1 (555) 987-6543",
    preferences: {
      roomType: "King Bed",
      smokingPreference: "Non-smoking",
      floorPreference: "High floor",
      specialRequests: "Late checkout when possible"
    },
    notifications: {
      emailBookingUpdates: true,
      smsBookingUpdates: false,
      promotionalEmails: true,
      loyaltyUpdates: true
    }
  });

  const handleInputChange = (field, value) => {
    if (field?.includes('.')) {
      const [parent, child] = field?.split('.');
      setProfileData((prev) => ({
        ...prev,
        [parent]: {
          ...prev?.[parent],
          [child]: value
        }
      }));
    } else {
      setProfileData((prev) => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original data or fetch from backend
    setIsEditing(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Profile Settings</h2>
          <div className="flex items-center space-x-2">
            {isEditing ?
            <>
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="default" size="sm" onClick={handleSave}>
                  <Icon name="Save" size={16} />
                  Save Changes
                </Button>
              </> :

            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Icon name="Edit" size={16} />
                Edit Profile
              </Button>
            }
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Profile Picture Section */}
        <div className="flex items-center space-x-6 mb-8">
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1730222168387-051038de25be"
              alt="Professional headshot of woman with brown hair smiling at camera"
              className="w-24 h-24 rounded-full object-cover border-4 border-border" />

            {isEditing &&
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-brand">
                <Icon name="Camera" size={16} />
              </button>
            }
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {profileData?.firstName} {profileData?.lastName}
            </h3>
            <p className="text-muted-foreground">{profileData?.email}</p>
            <p className="text-sm text-muted-foreground mt-1">Gold Member since March 2023</p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium text-foreground mb-4">Personal Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                type="text"
                value={profileData?.firstName}
                onChange={(e) => handleInputChange('firstName', e?.target?.value)}
                disabled={!isEditing} />

              <Input
                label="Last Name"
                type="text"
                value={profileData?.lastName}
                onChange={(e) => handleInputChange('lastName', e?.target?.value)}
                disabled={!isEditing} />

              <Input
                label="Email Address"
                type="email"
                value={profileData?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                disabled={!isEditing} />

              <Input
                label="Phone Number"
                type="tel"
                value={profileData?.phone}
                onChange={(e) => handleInputChange('phone', e?.target?.value)}
                disabled={!isEditing} />

              <Input
                label="Date of Birth"
                type="date"
                value={profileData?.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
                disabled={!isEditing} />

              <Input
                label="Nationality"
                type="text"
                value={profileData?.nationality}
                onChange={(e) => handleInputChange('nationality', e?.target?.value)}
                disabled={!isEditing} />

            </div>
            <div className="mt-4">
              <Input
                label="Address"
                type="text"
                value={profileData?.address}
                onChange={(e) => handleInputChange('address', e?.target?.value)}
                disabled={!isEditing} />

            </div>
            <div className="mt-4">
              <Input
                label="Emergency Contact"
                type="text"
                value={profileData?.emergencyContact}
                onChange={(e) => handleInputChange('emergencyContact', e?.target?.value)}
                disabled={!isEditing}
                description="Name and phone number of emergency contact" />

            </div>
          </div>

          {/* Travel Preferences */}
          <div className="pt-6 border-t border-border">
            <h4 className="text-lg font-medium text-foreground mb-4">Travel Preferences</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Preferred Room Type"
                type="text"
                value={profileData?.preferences?.roomType}
                onChange={(e) => handleInputChange('preferences.roomType', e?.target?.value)}
                disabled={!isEditing} />

              <Input
                label="Smoking Preference"
                type="text"
                value={profileData?.preferences?.smokingPreference}
                onChange={(e) => handleInputChange('preferences.smokingPreference', e?.target?.value)}
                disabled={!isEditing} />

              <Input
                label="Floor Preference"
                type="text"
                value={profileData?.preferences?.floorPreference}
                onChange={(e) => handleInputChange('preferences.floorPreference', e?.target?.value)}
                disabled={!isEditing} />

              <Input
                label="Special Requests"
                type="text"
                value={profileData?.preferences?.specialRequests}
                onChange={(e) => handleInputChange('preferences.specialRequests', e?.target?.value)}
                disabled={!isEditing} />

            </div>
          </div>

          {/* Notification Preferences */}
          <div className="pt-6 border-t border-border">
            <h4 className="text-lg font-medium text-foreground mb-4">Notification Preferences</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Email Booking Updates</p>
                  <p className="text-sm text-muted-foreground">Receive booking confirmations and updates via email</p>
                </div>
                <input
                  type="checkbox"
                  checked={profileData?.notifications?.emailBookingUpdates}
                  onChange={(e) => handleInputChange('notifications.emailBookingUpdates', e?.target?.checked)}
                  disabled={!isEditing}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary" />

              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">SMS Booking Updates</p>
                  <p className="text-sm text-muted-foreground">Receive booking updates via text message</p>
                </div>
                <input
                  type="checkbox"
                  checked={profileData?.notifications?.smsBookingUpdates}
                  onChange={(e) => handleInputChange('notifications.smsBookingUpdates', e?.target?.checked)}
                  disabled={!isEditing}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary" />

              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Promotional Emails</p>
                  <p className="text-sm text-muted-foreground">Receive special offers and travel deals</p>
                </div>
                <input
                  type="checkbox"
                  checked={profileData?.notifications?.promotionalEmails}
                  onChange={(e) => handleInputChange('notifications.promotionalEmails', e?.target?.checked)}
                  disabled={!isEditing}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary" />

              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Loyalty Program Updates</p>
                  <p className="text-sm text-muted-foreground">Receive updates about your loyalty status and rewards</p>
                </div>
                <input
                  type="checkbox"
                  checked={profileData?.notifications?.loyaltyUpdates}
                  onChange={(e) => handleInputChange('notifications.loyaltyUpdates', e?.target?.checked)}
                  disabled={!isEditing}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary" />

              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="pt-6 border-t border-border">
            <h4 className="text-lg font-medium text-foreground mb-4">Account Actions</h4>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline">
                <Icon name="Key" size={16} />
                Change Password
              </Button>
              <Button variant="outline">
                <Icon name="Download" size={16} />
                Download My Data
              </Button>
              <Button variant="outline">
                <Icon name="Shield" size={16} />
                Privacy Settings
              </Button>
              <Button variant="destructive">
                <Icon name="Trash2" size={16} />
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default ProfileSection;