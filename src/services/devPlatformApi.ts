import { 
  Pipeline, 
  Service, 
  Environment, 
  SystemHealth, 
  Alert,
} from './mockApi';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// In a real application, replace these URLs with your actual API endpoints
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

// Mock data moved from separate file
const mockPipelines: Pipeline[] = [
  {
    id: '1',
    name: 'company-hub-frontend',
    status: 'success',
    branch: 'main',
    commit: 'a1b2c3d',
    author: 'Sarah Johnson',
    duration: '3m 24s',
    timestamp: '2025-01-13T10:30:00Z',
    environment: 'production'
  },
  {
    id: '2',
    name: 'company-hub-api',
    status: 'running',
    branch: 'feature/auth-improvements',
    commit: 'e4f5g6h',
    author: 'Mike Chen',
    duration: '1m 45s',
    timestamp: '2025-01-13T11:15:00Z',
    environment: 'staging'
  },
  {
    id: '3',
    name: 'company-hub-mobile',
    status: 'failed',
    branch: 'develop',
    commit: 'i7j8k9l',
    author: 'Emma Davis',
    duration: '2m 12s',
    timestamp: '2025-01-13T09:45:00Z',
    environment: 'development'
  },
  {
    id: '4',
    name: 'company-hub-backend',
    status: 'pending',
    branch: 'hotfix/security-patch',
    commit: 'm0n1o2p',
    author: 'Alex Rodriguez',
    duration: '-',
    timestamp: '2025-01-13T11:30:00Z',
    environment: 'staging'
  }
];

const mockServices: Service[] = [
  {
    id: '1',
    name: 'Frontend App',
    status: 'healthy',
    uptime: '99.9%',
    version: 'v1.2.3',
    cpu: 45,
    memory: 62,
    requests: 1247,
    errors: 2
  },
  {
    id: '2',
    name: 'API Gateway',
    status: 'healthy',
    uptime: '99.8%',
    version: 'v2.1.0',
    cpu: 38,
    memory: 71,
    requests: 3456,
    errors: 8
  },
  {
    id: '3',
    name: 'Auth Service',
    status: 'warning',
    uptime: '98.5%',
    version: 'v1.5.2',
    cpu: 72,
    memory: 85,
    requests: 892,
    errors: 23
  },
  {
    id: '4',
    name: 'Database',
    status: 'healthy',
    uptime: '99.9%',
    version: 'v14.2',
    cpu: 28,
    memory: 54,
    requests: 2134,
    errors: 1
  },
  {
    id: '5',
    name: 'File Storage',
    status: 'critical',
    uptime: '95.2%',
    version: 'v3.0.1',
    cpu: 89,
    memory: 94,
    requests: 567,
    errors: 45
  }
];

const mockEnvironments: Environment[] = [
  {
    id: '1',
    name: 'Production',
    status: 'active',
    url: 'https://company-hub.com',
    version: 'v1.2.3',
    lastDeployed: '2025-01-13T10:30:00Z',
    deployedBy: 'Sarah Johnson'
  },
  {
    id: '2',
    name: 'Staging',
    status: 'deploying',
    url: 'https://staging.company-hub.com',
    version: 'v1.2.4-rc.1',
    lastDeployed: '2025-01-13T11:15:00Z',
    deployedBy: 'Mike Chen'
  },
  {
    id: '3',
    name: 'Development',
    status: 'active',
    url: 'https://dev.company-hub.com',
    version: 'v1.3.0-dev',
    lastDeployed: '2025-01-13T09:20:00Z',
    deployedBy: 'Emma Davis'
  }
];

const mockSystemHealth: SystemHealth = {
  overallStatus: 'healthy',
  uptime: '99.2%',
  responseTime: '245ms',
  requestsPerMinute: 1247,
  errorRate: '0.02%',
  throughput: '2.4 MB/s'
};

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'warning',
    title: 'High CPU usage on Auth Service',
    description: 'CPU usage at 72% for the last 10 minutes',
    timestamp: '2025-01-13T11:20:00Z'
  },
  {
    id: '2',
    type: 'critical',
    title: 'File Storage service critical',
    description: 'Memory usage at 94%, immediate attention required',
    timestamp: '2025-01-13T11:25:00Z'
  }
];

const mockBranches = [
  'main',
  'develop',
  'feature/auth-improvements',
  'hotfix/security-patch',
  'feature/new-dashboard',
  'bugfix/login-issue'
];

const mockEnvironmentOptions = [
  'development',
  'staging',
  'production'
];

export class DevPlatformApi {
  // Pipelines API
  static async getPipelines(): Promise<Pipeline[]> {
    await delay(500); // Simulate network delay
    
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/pipelines`);
    // if (!response.ok) throw new Error('Failed to fetch pipelines');
    // return response.json();
    
    return mockPipelines;
  }

  static async retryPipeline(pipelineId: string): Promise<{ success: boolean; message: string }> {
    await delay(1000);
    
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/pipelines/${pipelineId}/retry`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' }
    // });
    // if (!response.ok) throw new Error('Failed to retry pipeline');
    // return response.json();
    
    return { success: true, message: `Pipeline ${pipelineId} retry initiated` };
  }

  static async triggerPipeline(branch: string, environment: string): Promise<{ success: boolean; pipelineId: string }> {
    await delay(1500);
    
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/pipelines/trigger`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ branch, environment })
    // });
    // if (!response.ok) throw new Error('Failed to trigger pipeline');
    // return response.json();
    
    return { success: true, pipelineId: `pipeline-${Date.now()}` };
  }

  // Services API
  static async getServices(): Promise<Service[]> {
    await delay(400);
    
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/services`);
    // if (!response.ok) throw new Error('Failed to fetch services');
    // return response.json();
    
    return mockServices;
  }

  static async restartService(serviceId: string): Promise<{ success: boolean; message: string }> {
    await delay(2000);
    
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/services/${serviceId}/restart`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' }
    // });
    // if (!response.ok) throw new Error('Failed to restart service');
    // return response.json();
    
    return { success: true, message: `Service ${serviceId} restart initiated` };
  }

  static async getServiceLogs(serviceId: string, lines: number = 100): Promise<string[]> {
    await delay(800);
    
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/services/${serviceId}/logs?lines=${lines}`);
    // if (!response.ok) throw new Error('Failed to fetch service logs');
    // return response.json();
    
    return [
      `[${new Date().toISOString()}] INFO: Service ${serviceId} is running normally`,
      `[${new Date().toISOString()}] DEBUG: Processing request batch`,
      `[${new Date().toISOString()}] INFO: Health check passed`
    ];
  }

  // Environments API
  static async getEnvironments(): Promise<Environment[]> {
    await delay(300);
    
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/environments`);
    // if (!response.ok) throw new Error('Failed to fetch environments');
    // return response.json();
    
    return mockEnvironments;
  }

  static async deployToEnvironment(environmentId: string, branch: string): Promise<{ success: boolean; deploymentId: string }> {
    await delay(2500);
    
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/environments/${environmentId}/deploy`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ branch })
    // });
    // if (!response.ok) throw new Error('Failed to deploy to environment');
    // return response.json();
    
    return { success: true, deploymentId: `deploy-${Date.now()}` };
  }

  // Monitoring API
  static async getSystemHealth(): Promise<SystemHealth> {
    await delay(200);
    
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/monitoring/health`);
    // if (!response.ok) throw new Error('Failed to fetch system health');
    // return response.json();
    
    return mockSystemHealth;
  }

  static async getAlerts(): Promise<Alert[]> {
    await delay(350);
    
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/monitoring/alerts`);
    // if (!response.ok) throw new Error('Failed to fetch alerts');
    // return response.json();
    
    return mockAlerts;
  }

  static async acknowledgeAlert(alertId: string): Promise<{ success: boolean }> {
    await delay(500);
    
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/monitoring/alerts/${alertId}/acknowledge`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' }
    // });
    // if (!response.ok) throw new Error('Failed to acknowledge alert');
    // return response.json();
    
    return { success: true };
  }

  // Configuration API
  static async getBranches(): Promise<string[]> {
    await delay(200);
    
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/git/branches`);
    // if (!response.ok) throw new Error('Failed to fetch branches');
    // return response.json();
    
    return mockBranches;
  }

  static async getEnvironmentOptions(): Promise<string[]> {
    await delay(100);
    
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/environments/options`);
    // if (!response.ok) throw new Error('Failed to fetch environment options');
    // return response.json();
    
    return mockEnvironmentOptions;
  }

  // Metrics API
  static async getMetrics(serviceId?: string, timeRange: string = '1h'): Promise<any> {
    await delay(600);
    
    // TODO: Replace with actual API call
    // const url = serviceId 
    //   ? `${API_BASE_URL}/metrics/service/${serviceId}?range=${timeRange}`
    //   : `${API_BASE_URL}/metrics/system?range=${timeRange}`;
    // const response = await fetch(url);
    // if (!response.ok) throw new Error('Failed to fetch metrics');
    // return response.json();
    
    return {
      cpu: Array.from({ length: 24 }, (_, i) => ({ time: i, value: Math.random() * 100 })),
      memory: Array.from({ length: 24 }, (_, i) => ({ time: i, value: Math.random() * 100 })),
      requests: Array.from({ length: 24 }, (_, i) => ({ time: i, value: Math.floor(Math.random() * 1000) }))
    };
  }
}

// Error handling wrapper
export const withErrorHandling = async <T>(
  apiCall: () => Promise<T>,
  errorMessage: string = 'API call failed'
): Promise<T> => {
  try {
    return await apiCall();
  } catch (error) {
    console.error(errorMessage, error);
    throw new Error(errorMessage);
  }
};