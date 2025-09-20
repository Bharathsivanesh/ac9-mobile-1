import React, { useState } from 'react';
import { Code, GitBranch, Rocket, Activity, Database, Shield, Settings, Play, Pause, RotateCcw, AlertTriangle, CheckCircle, Clock, Zap, Server, Monitor, Terminal, Package, Users, Eye, ExternalLink, RefreshCw } from 'lucide-react';
import { useDevPlatform } from '../hooks/useDevPlatform';

const DeveloperPlatform = () => {
  const [activeTab, setActiveTab] = useState<'pipelines' | 'services' | 'environments' | 'monitoring'>('pipelines');
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [selectedEnvironment, setSelectedEnvironment] = useState('staging');
  const [selectedBranch, setSelectedBranch] = useState('main');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployMessage, setDeployMessage] = useState('');

  // Use the custom hook for API data
  const {
    pipelines,
    services,
    environments,
    systemHealth,
    alerts,
    branches,
    environmentOptions,
    loading,
    error,
    actions
  } = useDevPlatform();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
      case 'healthy':
      case 'active':
        return <CheckCircle className="text-green-600" size={16} />;
      case 'running':
      case 'deploying':
        return <Clock className="text-blue-600" size={16} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-600" size={16} />;
      case 'failed':
      case 'critical':
        return <AlertTriangle className="text-red-600" size={16} />;
      case 'inactive':
        return <Pause className="text-gray-600" size={16} />;
      default:
        return <Clock className="text-gray-600" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
      case 'healthy':
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'running':
      case 'deploying':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed':
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    setDeployMessage('');
    
    try {
      const environmentId = environments.find(env => 
        env.name.toLowerCase() === selectedEnvironment.toLowerCase()
      )?.id;
      
      if (!environmentId) {
        throw new Error('Environment not found');
      }
      
      const result = await actions.deployToEnvironment(environmentId, selectedBranch);
      
      if (result.success) {
        setDeployMessage(`Deployment initiated successfully! Deployment ID: ${result.deploymentId}`);
        setTimeout(() => {
          setShowDeployModal(false);
          setDeployMessage('');
        }, 2000);
      }
    } catch (error) {
      setDeployMessage(`Deployment failed: ${(error as Error).message}`);
    } finally {
      setIsDeploying(false);
    }
  };

  const handleRestartService = async (serviceId: string) => {
    try {
      const result = await actions.restartService(serviceId);
      if (result.success) {
        // Show success message or toast
        console.log(result.message);
      }
    } catch (error) {
      console.error('Failed to restart service:', error);
    }
  };

  const handleRetryPipeline = async (pipelineId: string) => {
    try {
      const result = await actions.retryPipeline(pipelineId);
      if (result.success) {
        // Show success message or toast
        console.log(result.message);
      }
    } catch (error) {
      console.error('Failed to retry pipeline:', error);
    }
  };

  const handleAcknowledgeAlert = async (alertId: string) => {
    try {
      const result = await actions.acknowledgeAlert(alertId);
      if (result.success) {
        // Alert will be removed from state by the hook
        console.log('Alert acknowledged');
      }
    } catch (error) {
      console.error('Failed to acknowledge alert:', error);
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Developer Platform</h1>
            <p className="text-gray-600 mt-1">Deploy, monitor, and manage applications</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={actions.refreshAll}
              disabled={Object.values(loading).some(Boolean)}
              className="flex items-center space-x-2 bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={16} className={Object.values(loading).some(Boolean) ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
            <button
              onClick={() => setShowDeployModal(true)}
              className="flex items-center space-x-2 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
            >
              <Rocket size={18} />
              <span>Deploy</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-gray-100/80 backdrop-blur-sm rounded-lg p-1 shadow-lg overflow-x-auto">
          <button
            onClick={() => setActiveTab('pipelines')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'pipelines' 
                ? 'bg-white text-yellow-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <GitBranch size={16} />
            <span>Pipelines</span>
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'services' 
                ? 'bg-white text-yellow-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Server size={16} />
            <span>Services</span>
          </button>
          <button
            onClick={() => setActiveTab('environments')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'environments' 
                ? 'bg-white text-yellow-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Package size={16} />
            <span>Environments</span>
          </button>
          <button
            onClick={() => setActiveTab('monitoring')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'monitoring' 
                ? 'bg-white text-yellow-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Monitor size={16} />
            <span>Monitoring</span>
          </button>
        </div>

        {/* Pipelines Tab */}
        {activeTab === 'pipelines' && (
          <div className="space-y-4">
            {/* Loading State */}
            {loading.pipelines && (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="animate-spin text-yellow-600 mr-2" size={20} />
                <span className="text-gray-600">Loading pipelines...</span>
              </div>
            )}

            {/* Error State */}
            {error.pipelines && (
              <div className="p-4 bg-red-50/90 backdrop-blur-sm rounded-xl border border-red-200">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="text-red-600" size={16} />
                  <span className="text-red-800 font-medium">Error loading pipelines</span>
                </div>
                <p className="text-red-700 text-sm mt-1">{error.pipelines}</p>
              </div>
            )}

            {/* Pipeline Stats */}
            {!loading.pipelines && !error.pipelines && (
              <div className="grid grid-cols-4 gap-4">
              <div className="p-4 bg-green-50/80 backdrop-blur-sm rounded-xl border border-green-200 text-center shadow-lg">
                <CheckCircle className="text-green-600 mx-auto mb-2" size={20} />
                <p className="text-2xl font-bold text-green-600">
                  {pipelines.filter(p => p.status === 'success').length}
                </p>
                <p className="text-sm text-gray-600">Successful</p>
              </div>
              <div className="p-4 bg-blue-50/80 backdrop-blur-sm rounded-xl border border-blue-200 text-center shadow-lg">
                <Clock className="text-blue-600 mx-auto mb-2" size={20} />
                <p className="text-2xl font-bold text-blue-600">
                  {pipelines.filter(p => p.status === 'running').length}
                </p>
                <p className="text-sm text-gray-600">Running</p>
              </div>
              <div className="p-4 bg-red-50/80 backdrop-blur-sm rounded-xl border border-red-200 text-center shadow-lg">
                <AlertTriangle className="text-red-600 mx-auto mb-2" size={20} />
                <p className="text-2xl font-bold text-red-600">
                  {pipelines.filter(p => p.status === 'failed').length}
                </p>
                <p className="text-sm text-gray-600">Failed</p>
              </div>
              <div className="p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200 text-center shadow-lg">
                <Pause className="text-gray-600 mx-auto mb-2" size={20} />
                <p className="text-2xl font-bold text-gray-600">
                  {pipelines.filter(p => p.status === 'pending').length}
                </p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
            )}

            {/* Pipeline List */}
            {!loading.pipelines && !error.pipelines && (
              <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">Recent Pipelines</h2>
              {pipelines.map((pipeline) => (
                <div key={pipeline.id} className="p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Code className="text-gray-600" size={20} />
                      <div>
                        <h3 className="font-semibold text-gray-900">{pipeline.name}</h3>
                        <p className="text-sm text-gray-600">
                          {pipeline.branch} • {pipeline.commit} • by {pipeline.author}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(pipeline.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(pipeline.status)}`}>
                        {pipeline.status.charAt(0).toUpperCase() + pipeline.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <span>Duration: {pipeline.duration}</span>
                      <span>Environment: {pipeline.environment}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>{new Date(pipeline.timestamp).toLocaleTimeString()}</span>
                      {pipeline.status === 'failed' && (
                        <button
                          onClick={() => handleRetryPipeline(pipeline.id)}
                          className="flex items-center space-x-1 text-yellow-600 hover:text-yellow-700"
                        >
                          <RotateCcw size={14} />
                          <span>Retry</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            )}
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="space-y-4">
            {/* Loading State */}
            {loading.services && (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="animate-spin text-yellow-600 mr-2" size={20} />
                <span className="text-gray-600">Loading services...</span>
              </div>
            )}

            {/* Error State */}
            {error.services && (
              <div className="p-4 bg-red-50/90 backdrop-blur-sm rounded-xl border border-red-200">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="text-red-600" size={16} />
                  <span className="text-red-800 font-medium">Error loading services</span>
                </div>
                <p className="text-red-700 text-sm mt-1">{error.services}</p>
              </div>
            )}

            {/* Service Stats */}
            {!loading.services && !error.services && (
              <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-green-50/80 backdrop-blur-sm rounded-xl border border-green-200 text-center shadow-lg">
                <CheckCircle className="text-green-600 mx-auto mb-2" size={20} />
                <p className="text-2xl font-bold text-green-600">
                  {services.filter(s => s.status === 'healthy').length}
                </p>
                <p className="text-sm text-gray-600">Healthy</p>
              </div>
              <div className="p-4 bg-yellow-50/80 backdrop-blur-sm rounded-xl border border-yellow-200 text-center shadow-lg">
                <AlertTriangle className="text-yellow-600 mx-auto mb-2" size={20} />
                <p className="text-2xl font-bold text-yellow-600">
                  {services.filter(s => s.status === 'warning').length}
                </p>
                <p className="text-sm text-gray-600">Warning</p>
              </div>
              <div className="p-4 bg-red-50/80 backdrop-blur-sm rounded-xl border border-red-200 text-center shadow-lg">
                <AlertTriangle className="text-red-600 mx-auto mb-2" size={20} />
                <p className="text-2xl font-bold text-red-600">
                  {services.filter(s => s.status === 'critical').length}
                </p>
                <p className="text-sm text-gray-600">Critical</p>
              </div>
            </div>
            )}

            {/* Service List */}
            {!loading.services && !error.services && (
              <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">Service Status</h2>
              {services.map((service) => (
                <div key={service.id} className="p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Server className="text-gray-600" size={20} />
                      <div>
                        <h3 className="font-semibold text-gray-900">{service.name}</h3>
                        <p className="text-sm text-gray-600">
                          {service.version} • Uptime: {service.uptime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(service.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(service.status)}`}>
                        {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">CPU</span>
                        <span className="font-medium">{service.cpu}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            service.cpu > 80 ? 'bg-red-500' : 
                            service.cpu > 60 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${service.cpu}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Memory</span>
                        <span className="font-medium">{service.memory}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            service.memory > 80 ? 'bg-red-500' : 
                            service.memory > 60 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${service.memory}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <span>Requests: {service.requests.toLocaleString()}</span>
                      <span className={service.errors > 10 ? 'text-red-600' : ''}>
                        Errors: {service.errors}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRestartService(service.id)}
                      className="flex items-center space-x-1 text-yellow-600 hover:text-yellow-700"
                    >
                      <RotateCcw size={14} />
                      <span>Restart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            )}
          </div>
        )}

        {/* Environments Tab */}
        {activeTab === 'environments' && (
          <div className="space-y-4">
            {/* Loading State */}
            {loading.environments && (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="animate-spin text-yellow-600 mr-2" size={20} />
                <span className="text-gray-600">Loading environments...</span>
              </div>
            )}

            {/* Error State */}
            {error.environments && (
              <div className="p-4 bg-red-50/90 backdrop-blur-sm rounded-xl border border-red-200">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="text-red-600" size={16} />
                  <span className="text-red-800 font-medium">Error loading environments</span>
                </div>
                <p className="text-red-700 text-sm mt-1">{error.environments}</p>
              </div>
            )}

            {/* Environment List */}
            {!loading.environments && !error.environments && (
              <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">Deployment Environments</h2>
              {environments.map((env) => (
                <div key={env.id} className="p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Package className="text-gray-600" size={20} />
                      <div>
                        <h3 className="font-semibold text-gray-900">{env.name}</h3>
                        <p className="text-sm text-gray-600">
                          {env.version} • Deployed by {env.deployedBy}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(env.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(env.status)}`}>
                        {env.status.charAt(0).toUpperCase() + env.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <span>Last deployed: {new Date(env.lastDeployed).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <a
                        href={env.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                      >
                        <ExternalLink size={14} />
                        <span>Visit</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            )}
          </div>
        )}

        {/* Monitoring Tab */}
        {activeTab === 'monitoring' && (
          <div className="space-y-4">
            {/* Loading State */}
            {(loading.systemHealth || loading.alerts) && (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="animate-spin text-yellow-600 mr-2" size={20} />
                <span className="text-gray-600">Loading monitoring data...</span>
              </div>
            )}

            {/* Error State */}
            {(error.systemHealth || error.alerts) && (
              <div className="p-4 bg-red-50/90 backdrop-blur-sm rounded-xl border border-red-200">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="text-red-600" size={16} />
                  <span className="text-red-800 font-medium">Error loading monitoring data</span>
                </div>
                <p className="text-red-700 text-sm mt-1">{error.systemHealth || error.alerts}</p>
              </div>
            )}

            {/* System Overview */}
            {!loading.systemHealth && !error.systemHealth && systemHealth && (
              <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <Activity className="text-green-600" size={20} />
                  <h3 className="font-semibold text-gray-900">System Health</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Overall Status</span>
                    <span className={`font-medium ${
                      systemHealth.overallStatus === 'healthy' ? 'text-green-600' :
                      systemHealth.overallStatus === 'warning' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {systemHealth.overallStatus.charAt(0).toUpperCase() + systemHealth.overallStatus.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Uptime</span>
                    <span className="font-medium">{systemHealth.uptime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Response Time</span>
                    <span className="font-medium">{systemHealth.responseTime}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <Zap className="text-yellow-600" size={20} />
                  <h3 className="font-semibold text-gray-900">Performance</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Requests/min</span>
                    <span className="font-medium">{systemHealth.requestsPerMinute.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Error Rate</span>
                    <span className="font-medium">{systemHealth.errorRate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Throughput</span>
                    <span className="font-medium">{systemHealth.throughput}</span>
                  </div>
                </div>
              </div>
            </div>
            )}

            {/* Recent Alerts */}
            {!loading.alerts && !error.alerts && (
              <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">Recent Alerts</h2>
              {alerts.length > 0 ? (
                <div className="space-y-2">
                  {alerts.map((alert) => (
                    <div key={alert.id} className={`p-3 backdrop-blur-sm rounded-lg border ${
                      alert.type === 'critical' ? 'bg-red-50/90 border-red-200' :
                      alert.type === 'warning' ? 'bg-yellow-50/90 border-yellow-200' :
                      'bg-blue-50/90 border-blue-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className={
                            alert.type === 'critical' ? 'text-red-600' :
                            alert.type === 'warning' ? 'text-yellow-600' :
                            'text-blue-600'
                          } size={16} />
                          <span className={`text-sm font-medium ${
                            alert.type === 'critical' ? 'text-red-800' :
                            alert.type === 'warning' ? 'text-yellow-800' :
                            'text-blue-800'
                          }`}>{alert.title}</span>
                        </div>
                        <button
                          onClick={() => handleAcknowledgeAlert(alert.id)}
                          className="text-xs text-gray-600 hover:text-gray-800"
                        >
                          Acknowledge
                        </button>
                      </div>
                      <p className={`text-xs mt-1 ${
                        alert.type === 'critical' ? 'text-red-700' :
                        alert.type === 'warning' ? 'text-yellow-700' :
                        'text-blue-700'
                      }`}>{alert.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(alert.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-green-50/90 backdrop-blur-sm rounded-xl border border-green-200 text-center">
                  <CheckCircle className="text-green-600 mx-auto mb-2" size={24} />
                  <p className="text-green-800 font-medium">No active alerts</p>
                  <p className="text-green-700 text-sm">All systems are running normally</p>
                </div>
              )}
            </div>
            )}

            {/* Quick Actions */}
            {!loading.systemHealth && !error.systemHealth && (
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 bg-blue-50/90 backdrop-blur-sm rounded-xl border border-blue-200 hover:bg-blue-100/90 transition-colors text-left">
                  <div className="flex items-center space-x-2 mb-2">
                    <Terminal className="text-blue-600" size={20} />
                    <span className="font-semibold text-gray-900">View Logs</span>
                  </div>
                  <p className="text-sm text-gray-600">Access application and system logs</p>
                </button>
                <button className="p-4 bg-purple-50/90 backdrop-blur-sm rounded-xl border border-purple-200 hover:bg-purple-100/90 transition-colors text-left">
                  <div className="flex items-center space-x-2 mb-2">
                    <Eye className="text-purple-600" size={20} />
                    <span className="font-semibold text-gray-900">Metrics Dashboard</span>
                  </div>
                  <p className="text-sm text-gray-600">View detailed performance metrics</p>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Deploy Modal */}
        {showDeployModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Deploy Application</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Environment</label>
                  <select
                    value={selectedEnvironment}
                    onChange={(e) => setSelectedEnvironment(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    disabled={isDeploying}
                  >
                    {environmentOptions.map((env) => (
                      <option key={env} value={env}>
                        {env.charAt(0).toUpperCase() + env.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    disabled={isDeploying}
                  >
                    {branches.map((branch) => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
                </div>

                {/* Deploy Message */}
                {deployMessage && (
                  <div className={`p-3 rounded-lg border ${
                    deployMessage.includes('failed') || deployMessage.includes('Error')
                      ? 'bg-red-50 border-red-200 text-red-800'
                      : 'bg-green-50 border-green-200 text-green-800'
                  }`}>
                    <p className="text-sm">{deployMessage}</p>
                  </div>
                )}

                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="text-yellow-600 flex-shrink-0 mt-0.5" size={16} />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Deployment Warning</p>
                      <p className="text-xs text-yellow-700 mt-1">
                        {selectedEnvironment === 'production' 
                          ? 'This will deploy to production. Please ensure all tests pass.'
                          : `This will deploy to ${selectedEnvironment} environment.`
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowDeployModal(false)}
                    disabled={isDeploying}
                    className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeploy}
                    disabled={isDeploying}
                    className="flex-1 py-3 px-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDeploying ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        <span>Deploying...</span>
                      </>
                    ) : (
                      <>
                        <Rocket size={16} />
                        <span>Deploy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeveloperPlatform;