import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Shield, Bell, UserCircle, Key, Clock, Database, 
  Save, Trash, Check, X
} from 'lucide-react';

// Types for settings
type NotificationSettings = {
  emailNotifications: boolean;
  appointmentReminders: boolean;
  systemUpdates: boolean;
  patientUpdates: boolean;
};

type SecuritySettings = {
  twoFactorAuth: boolean;
  sessionTimeout: number;
  passwordExpiration: number;
};

type UserPreferences = {
  theme: 'light' | 'dark' | 'system';
  dashboardLayout: 'compact' | 'detailed';
  timezone: string;
  language: string;
};

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock settings data
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    appointmentReminders: true,
    systemUpdates: true,
    patientUpdates: false,
  });
  
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiration: 90,
  });
  
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: 'light',
    dashboardLayout: 'detailed',
    timezone: 'America/New_York',
    language: 'en',
  });
  
  // Mock user profile data
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '(555) 123-4567',
    departmentId: '1',
    bio: 'Senior physician with over 15 years of experience in Family Medicine.',
  });
  
  // Mock departments
  const departments = [
    { id: '1', name: 'Family Medicine' },
    { id: '2', name: 'Internal Medicine' },
    { id: '3', name: 'Cardiology' },
    { id: '4', name: 'Psychiatry' },
  ];
  
  // Handlers for form updates
  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked,
    }));
  };
  
  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : type === 'number' 
        ? Number(value) 
        : value;
        
    setSecuritySettings(prev => ({
      ...prev,
      [name]: newValue,
    }));
  };
  
  const handlePreferenceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Mock save functions
  const saveSettings = () => {
    // In a real app, this would save to the server
    console.log('Settings saved');
    
    // Show a success message
    alert('Settings saved successfully');
  };
  
  // Render the appropriate tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Profile Information</h3>
              <p className="mt-1 text-sm text-gray-500">
                Update your personal information and how it appears across the system.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone number
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    autoComplete="tel"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="departmentId" className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <div className="mt-1">
                  <select
                    id="departmentId"
                    name="departmentId"
                    value={profile.departmentId}
                    onChange={handleProfileChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="sm:col-span-6">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <div className="mt-1">
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={profile.bio}
                    onChange={handleProfileChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Brief description visible to other staff members.
                </p>
              </div>
            </div>
            
            <div className="pt-5 border-t border-gray-200">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveSettings}
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Save className="-ml-1 mr-2 h-4 w-4" />
                  Save
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Notification Settings</h3>
              <p className="mt-1 text-sm text-gray-500">
                Configure how and when you receive notifications.
              </p>
            </div>
            
            <fieldset className="space-y-5">
              <legend className="sr-only">Notifications</legend>
              
              <div className="relative flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="emailNotifications"
                    name="emailNotifications"
                    type="checkbox"
                    checked={notificationSettings.emailNotifications}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="emailNotifications" className="font-medium text-gray-700">
                    Email notifications
                  </label>
                  <p className="text-gray-500">Receive email notifications for important updates.</p>
                </div>
              </div>
              
              <div className="relative flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="appointmentReminders"
                    name="appointmentReminders"
                    type="checkbox"
                    checked={notificationSettings.appointmentReminders}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="appointmentReminders" className="font-medium text-gray-700">
                    Appointment reminders
                  </label>
                  <p className="text-gray-500">Get notified about upcoming appointments.</p>
                </div>
              </div>
              
              <div className="relative flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="systemUpdates"
                    name="systemUpdates"
                    type="checkbox"
                    checked={notificationSettings.systemUpdates}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="systemUpdates" className="font-medium text-gray-700">
                    System updates
                  </label>
                  <p className="text-gray-500">Receive notifications about system maintenance and updates.</p>
                </div>
              </div>
              
              <div className="relative flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="patientUpdates"
                    name="patientUpdates"
                    type="checkbox"
                    checked={notificationSettings.patientUpdates}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="patientUpdates" className="font-medium text-gray-700">
                    Patient updates
                  </label>
                  <p className="text-gray-500">Get notified when your patients' records are updated.</p>
                </div>
              </div>
            </fieldset>
            
            <div className="pt-5 border-t border-gray-200">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveSettings}
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Save className="-ml-1 mr-2 h-4 w-4" />
                  Save
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Security Settings</h3>
              <p className="mt-1 text-sm text-gray-500">
                Manage your account security and authentication preferences.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="relative flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="twoFactorAuth"
                    name="twoFactorAuth"
                    type="checkbox"
                    checked={securitySettings.twoFactorAuth}
                    onChange={handleSecurityChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="twoFactorAuth" className="font-medium text-gray-700">
                    Two-factor authentication
                  </label>
                  <p className="text-gray-500">Add an extra layer of security to your account by requiring a verification code in addition to your password.</p>
                </div>
              </div>
              
              <div>
                <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700">
                  Session timeout (minutes)
                </label>
                <div className="mt-1">
                  <select
                    id="sessionTimeout"
                    name="sessionTimeout"
                    value={securitySettings.sessionTimeout}
                    onChange={handleSecurityChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={60}>60 minutes</option>
                    <option value={120}>2 hours</option>
                  </select>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Automatically log out after a period of inactivity.
                </p>
              </div>
              
              <div>
                <label htmlFor="passwordExpiration" className="block text-sm font-medium text-gray-700">
                  Password expiration (days)
                </label>
                <div className="mt-1">
                  <select
                    id="passwordExpiration"
                    name="passwordExpiration"
                    value={securitySettings.passwordExpiration}
                    onChange={handleSecurityChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value={30}>30 days</option>
                    <option value={60}>60 days</option>
                    <option value={90}>90 days</option>
                    <option value={180}>180 days</option>
                    <option value={365}>365 days</option>
                  </select>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Require password change after this many days.
                </p>
              </div>
              
              <div>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Key className="mr-2 h-4 w-4" />
                  Change Password
                </button>
              </div>
              
              <div>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Revoke All Active Sessions
                </button>
              </div>
            </div>
            
            <div className="pt-5 border-t border-gray-200">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveSettings}
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Save className="-ml-1 mr-2 h-4 w-4" />
                  Save
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'preferences':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Preferences</h3>
              <p className="mt-1 text-sm text-gray-500">
                Customize your experience within the system.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                  Theme
                </label>
                <div className="mt-1">
                  <select
                    id="theme"
                    name="theme"
                    value={preferences.theme}
                    onChange={handlePreferenceChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System Default</option>
                  </select>
                </div>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="dashboardLayout" className="block text-sm font-medium text-gray-700">
                  Dashboard Layout
                </label>
                <div className="mt-1">
                  <select
                    id="dashboardLayout"
                    name="dashboardLayout"
                    value={preferences.dashboardLayout}
                    onChange={handlePreferenceChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="compact">Compact</option>
                    <option value="detailed">Detailed</option>
                  </select>
                </div>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                  Timezone
                </label>
                <div className="mt-1">
                  <select
                    id="timezone"
                    name="timezone"
                    value={preferences.timezone}
                    onChange={handlePreferenceChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Europe/London">London (GMT)</option>
                  </select>
                </div>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                  Language
                </label>
                <div className="mt-1">
                  <select
                    id="language"
                    name="language"
                    value={preferences.language}
                    onChange={handlePreferenceChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="pt-5 border-t border-gray-200">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveSettings}
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Save className="-ml-1 mr-2 h-4 w-4" />
                  Save
                </button>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Settings
          </h2>
        </div>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="divide-y divide-gray-200">
          {/* Tabs */}
          <div className="px-4 py-5 sm:px-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`${
                    activeTab === 'profile'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <UserCircle className="mr-2 h-5 w-5" />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`${
                    activeTab === 'notifications'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <Bell className="mr-2 h-5 w-5" />
                  Notifications
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`${
                    activeTab === 'security'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <Shield className="mr-2 h-5 w-5" />
                  Security
                </button>
                <button
                  onClick={() => setActiveTab('preferences')}
                  className={`${
                    activeTab === 'preferences'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <Settings className="mr-2 h-5 w-5" />
                  Preferences
                </button>
              </nav>
            </div>
          </div>
          
          {/* Tab content */}
          <div className="px-4 py-5 sm:p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;