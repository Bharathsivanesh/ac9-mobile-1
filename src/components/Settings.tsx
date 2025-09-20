import React, { useState } from 'react';
import { Bell, Shield, Smartphone, Wifi, Moon, Globe, ChevronRight, ToggleLeft as Toggle } from 'lucide-react';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    attendance: true,
    leaves: true,
    breaks: false,
    production: true,
    github: false
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    autoCheckIn: true,
    wifiOnly: false,
    language: 'English'
  });

  const settingsCategories = [
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        {
          key: 'attendance',
          label: 'Attendance Reminders',
          description: 'Get reminded to check in/out'
        },
        {
          key: 'leaves',
          label: 'Leave Updates',
          description: 'Status updates on leave applications'
        },
        {
          key: 'breaks',
          label: 'Break Notifications',
          description: 'Wellness break reminders'
        },
        {
          key: 'production',
          label: 'Production Alerts',
          description: 'Important system alerts'
        },
        {
          key: 'github',
          label: 'GitHub PR Alerts',
          description: 'Pull request notifications'
        }
      ]
    },
    {
      title: 'Preferences',
      icon: Smartphone,
      settings: [
        {
          key: 'darkMode',
          label: 'Dark Mode',
          description: 'Use dark theme interface'
        },
        {
          key: 'autoCheckIn',
          label: 'Auto Check-in',
          description: 'Automatic attendance when on WiFi'
        },
        {
          key: 'wifiOnly',
          label: 'WiFi Only Mode',
          description: 'Only allow WiFi-based check-ins'
        }
      ]
    }
  ];

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePreferenceToggle = (key: keyof typeof preferences) => {
    if (key === 'language') return; // Handle separately
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
        {/* Floating Shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-200/30 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-amber-200/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-64 left-20 w-12 h-12 bg-orange-200/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-8 w-24 h-24 bg-yellow-300/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-20 left-12 w-14 h-14 bg-amber-300/30 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Geometric Patterns */}
        <div className="absolute top-20 right-4 w-8 h-8 border-2 border-yellow-300/40 rotate-45 animate-spin" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-32 left-6 w-6 h-6 border-2 border-amber-400/30 rotate-12 animate-spin" style={{ animationDuration: '12s' }}></div>
        
        {/* Wave Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-yellow-100/50 to-transparent">
          <svg className="absolute bottom-0 w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="rgba(251, 191, 36, 0.1)"></path>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 pb-8 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Customize your experience</p>
      </div>

      {/* Security Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <Shield className="text-green-600" size={20} />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Security & Authentication</h2>
        </div>
        
        <div className="space-y-3">
          <div className="p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Single Sign-On (SSO)</h3>
                <p className="text-sm text-gray-600">Connected via company Google Workspace</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">Active</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">OAuth Permissions</h3>
                <p className="text-sm text-gray-600">Manage connected app permissions</p>
              </div>
              <ChevronRight className="text-gray-400" size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Settings Categories */}
      {settingsCategories.map((category, categoryIndex) => {
        const Icon = category.icon;
        return (
          <div key={categoryIndex} className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Icon className="text-yellow-600" size={20} />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">{category.title}</h2>
            </div>

            <div className="space-y-3">
              {category.settings.map((setting, settingIndex) => {
                const isEnabled = category.title === 'Notifications' 
                  ? notifications[setting.key as keyof typeof notifications]
                  : preferences[setting.key as keyof typeof preferences];
                
                return (
                  <div key={settingIndex} className="p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{setting.label}</h3>
                        <p className="text-sm text-gray-600 mt-1">{setting.description}</p>
                      </div>
                      <button
                        onClick={() => 
                          category.title === 'Notifications'
                            ? handleNotificationToggle(setting.key as keyof typeof notifications)
                            : handlePreferenceToggle(setting.key as keyof typeof preferences)
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          isEnabled ? 'bg-yellow-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            isEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Additional Settings */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Globe className="text-amber-600" size={20} />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">General</h2>
        </div>

        <div className="space-y-3">
          <div className="p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Language</h3>
                <p className="text-sm text-gray-600">Choose your preferred language</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">English</span>
                <ChevronRight className="text-gray-400" size={16} />
              </div>
            </div>
          </div>

          <div className="p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Data & Storage</h3>
                <p className="text-sm text-gray-600">Manage your data preferences</p>
              </div>
              <ChevronRight className="text-gray-400" size={16} />
            </div>
          </div>

          <div className="p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">About</h3>
                <p className="text-sm text-gray-600">App version and information</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">v1.2.0</span>
                <ChevronRight className="text-gray-400" size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* App Info */}
      <div className="p-4 bg-gradient-to-r from-yellow-50/90 to-amber-50/90 backdrop-blur-sm rounded-xl border border-yellow-200 shadow-lg">
        <div className="text-center">
          <h3 className="font-semibold text-gray-900 mb-2">Company Hub</h3>
          <p className="text-sm text-gray-600 mb-1">Version 1.2.0</p>
          <p className="text-xs text-gray-500">
            Built with ❤️ for our amazing team
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Settings;