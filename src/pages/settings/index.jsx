import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../../lib/supabaseClient';
import Header from '../../components/ui/Header';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import Icon from '../../components/Appicon';

const SettingsPage = () => {
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

      if (error && error.code !== 'PGRST116') throw error;
      if (data) setProfile(data);
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
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
      alert('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <Icon name="Loader2" className="w-8 h-8 animate-spin" />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Settings - StayFinder Pro</title>
      </Helmet>

      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold">Account Settings</h1>
            <p className="text-gray-600 mt-2">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium">Email Address</label>
              <Input
                type="email"
                value={user?.email}
                disabled
                className="mt-1 bg-gray-50"
              />
              <p className="mt-1 text-sm text-gray-500">
                Your email address cannot be changed
              </p>
            </div>

            <div>
              <label className="text-sm font-medium">Full Name</label>
              <Input
                type="text"
                value={profile.full_name}
                onChange={(e) => setProfile(p => ({ ...p, full_name: e.target.value }))}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Phone Number</label>
              <Input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile(p => ({ ...p, phone: e.target.value }))}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Address</label>
              <Input
                type="text"
                value={profile.address}
                onChange={(e) => setProfile(p => ({ ...p, address: e.target.value }))}
                className="mt-1"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notification Preferences</h3>
              
              <div className="space-y-2">
                <Checkbox
                  id="emailNotifications"
                  checked={profile.email_notifications}
                  onCheckedChange={(checked) => 
                    setProfile(p => ({ ...p, email_notifications: checked }))}
                  label="Email Notifications"
                />
                <p className="text-sm text-gray-500 ml-6">
                  Receive booking confirmations and updates via email
                </p>
              </div>

              <div className="space-y-2">
                <Checkbox
                  id="marketingEmails"
                  checked={profile.marketing_emails}
                  onCheckedChange={(checked) => 
                    setProfile(p => ({ ...p, marketing_emails: checked }))}
                  label="Marketing Emails"
                />
                <p className="text-sm text-gray-500 ml-6">
                  Receive special offers and promotions
                </p>
              </div>
            </div>
          </div>

          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </form>
      </main>
    </>
  );
};

export default SettingsPage;