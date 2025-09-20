import React from 'react';
import { Link2, CheckCircle, XCircle, Slack, Github, Calendar } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { MockApi } from '../services/mockApi';

const Integrations = () => {
  const { state, dispatch } = useAppContext();
  const { integrations } = state;

  const integrationsList = [
    {
      id: 'slack',
      name: 'Slack',
      icon: Slack,
      description: 'Auto-announce approved leaves in team channels',
      connected: integrations.slack,
      color: 'bg-purple-600'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: Github,
      description: 'Get PR notifications and track assigned reviews',
      connected: integrations.github,
      color: 'bg-gray-900'
    },
    {
      id: 'googleCalendar',
      name: 'Google Calendar',
      icon: Calendar,
      description: 'Sync leaves and events with your calendar',
      connected: integrations.googleCalendar,
      color: 'bg-blue-600'
    }
  ];

  const handleToggle = async (service: keyof typeof integrations) => {
    try {
      const newState = !integrations[service];
      await MockApi.toggleIntegration(service, newState);
      dispatch({ type: 'TOGGLE_INTEGRATION', service });
    } catch (error) {
      console.error('Failed to toggle integration:', error);
    }
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
        <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
        <p className="text-gray-600 mt-1">Connect your favorite tools</p>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-green-50/80 backdrop-blur-sm rounded-xl border border-green-200 text-center shadow-lg">
          <p className="text-2xl font-bold text-green-600">
            {Object.values(integrations).filter(Boolean).length}
          </p>
          <p className="text-sm text-gray-600">Connected</p>
        </div>
        <div className="p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200 text-center shadow-lg">
          <p className="text-2xl font-bold text-gray-600">
            {Object.values(integrations).length}
          </p>
          <p className="text-sm text-gray-600">Total</p>
        </div>
        <div className="p-4 bg-yellow-50/80 backdrop-blur-sm rounded-xl border border-yellow-200 text-center shadow-lg">
          <p className="text-2xl font-bold text-yellow-600">100%</p>
          <p className="text-sm text-gray-600">Health</p>
        </div>
      </div>

      {/* Integrations List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Available Services</h2>
        
        {integrationsList.map((integration) => {
          const Icon = integration.icon;
          return (
            <div key={integration.id} className="p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 ${integration.color} rounded-lg`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                    <p className="text-sm text-gray-600">{integration.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    {integration.connected ? (
                      <CheckCircle className="text-green-600" size={16} />
                    ) : (
                      <XCircle className="text-gray-400" size={16} />
                    )}
                    <span className={`text-sm font-medium ${
                      integration.connected ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {integration.connected ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleToggle(integration.id as keyof typeof integrations)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      integration.connected ? 'bg-yellow-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        integration.connected ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {integration.connected && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Connection Status</p>
                      <p className="text-xs text-gray-600">Last synced 5 minutes ago</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-600">Healthy</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Connection Help */}
      <div className="p-4 bg-yellow-50/90 backdrop-blur-sm rounded-xl border border-yellow-200 shadow-lg">
        <div className="flex items-start space-x-3">
          <Link2 className="text-yellow-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <h3 className="font-semibold text-yellow-900">Need Help?</h3>
            <p className="text-sm text-yellow-700 mt-1">
              Contact IT support if you're having trouble connecting to any service. 
              All integrations use secure OAuth authentication.
            </p>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="p-4 bg-amber-50/90 backdrop-blur-sm rounded-xl border border-amber-200 shadow-lg">
        <h3 className="font-semibold text-amber-900 mb-2">Security & Privacy</h3>
        <ul className="text-sm text-amber-800 space-y-1">
          <li>• All connections are encrypted and secure</li>
          <li>• We only access necessary data for functionality</li>
          <li>• You can revoke access at any time</li>
          <li>• Data is not shared with third parties</li>
        </ul>
      </div>
      </div>
    </div>
  );
};

export default Integrations;