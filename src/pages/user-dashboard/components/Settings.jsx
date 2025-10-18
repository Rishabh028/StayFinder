import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { supabase } from '../../../lib/supabaseClient';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const Settings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    full_name: '',
    phone: '',
    address: '',
    email_notifications: true,
    marketing_emails: false
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data || profile);
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name) => {
    setProfile(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...profile,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      alert('Settings saved successfully!');
    } catch (err) {
      console.error('Error saving settings:', err);
      alert('Error saving settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Loading settings...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Email Address</label>
          <Input
            type="email"
            value={user?.email}
            disabled
            className="bg-muted"
          />
          <p className="text-xs text-muted-foreground">
            Your email address cannot be changed
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name</label>
          <Input
            name="full_name"
            value={profile.full_name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Phone Number</label>
          <Input
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Address</label>
          <Input
            name="address"
            value={profile.address}
            onChange={handleChange}
            placeholder="Enter your address"
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Notification Preferences</h4>
          <div className="space-y-2">
            <Checkbox
              id="email_notifications"
              checked={profile.email_notifications}
              onCheckedChange={() => handleCheckboxChange('email_notifications')}
              label="Email Notifications"
              description="Receive booking confirmations and updates via email"
            />
            <Checkbox
              id="marketing_emails"
              checked={profile.marketing_emails}
              onCheckedChange={() => handleCheckboxChange('marketing_emails')}
              label="Marketing Emails"
              description="Receive special offers and promotions"
            />
          </div>
        </div>
      </div>

      <Button type="submit" disabled={saving}>
        {saving ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  );
};

export default Settings;