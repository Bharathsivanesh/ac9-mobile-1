import { useState, useEffect, useCallback } from 'react';
import { DevPlatformApi, withErrorHandling } from '../services/devPlatformApi';
import { Pipeline, Service, Environment, SystemHealth, Alert } from '../data/mockDevPlatformData';

interface UseDevPlatformState {
  pipelines: Pipeline[];
  services: Service[];
  environments: Environment[];
  systemHealth: SystemHealth | null;
  alerts: Alert[];
  branches: string[];
  environmentOptions: string[];
  loading: {
    pipelines: boolean;
    services: boolean;
    environments: boolean;
    systemHealth: boolean;
    alerts: boolean;
    branches: boolean;
    environmentOptions: boolean;
  };
  error: {
    pipelines: string | null;
    services: string | null;
    environments: string | null;
    systemHealth: string | null;
    alerts: string | null;
    branches: string | null;
    environmentOptions: string | null;
  };
}

export const useDevPlatform = () => {
  const [state, setState] = useState<UseDevPlatformState>({
    pipelines: [],
    services: [],
    environments: [],
    systemHealth: null,
    alerts: [],
    branches: [],
    environmentOptions: [],
    loading: {
      pipelines: false,
      services: false,
      environments: false,
      systemHealth: false,
      alerts: false,
      branches: false,
      environmentOptions: false,
    },
    error: {
      pipelines: null,
      services: null,
      environments: null,
      systemHealth: null,
      alerts: null,
      branches: null,
      environmentOptions: null,
    },
  });

  const setLoading = (key: keyof UseDevPlatformState['loading'], value: boolean) => {
    setState(prev => ({
      ...prev,
      loading: { ...prev.loading, [key]: value }
    }));
  };

  const setError = (key: keyof UseDevPlatformState['error'], value: string | null) => {
    setState(prev => ({
      ...prev,
      error: { ...prev.error, [key]: value }
    }));
  };

  // Fetch pipelines
  const fetchPipelines = useCallback(async () => {
    setLoading('pipelines', true);
    setError('pipelines', null);
    try {
      const pipelines = await withErrorHandling(
        () => DevPlatformApi.getPipelines(),
        'Failed to fetch pipelines'
      );
      setState(prev => ({ ...prev, pipelines }));
    } catch (error) {
      setError('pipelines', (error as Error).message);
    } finally {
      setLoading('pipelines', false);
    }
  }, []);

  // Fetch services
  const fetchServices = useCallback(async () => {
    setLoading('services', true);
    setError('services', null);
    try {
      const services = await withErrorHandling(
        () => DevPlatformApi.getServices(),
        'Failed to fetch services'
      );
      setState(prev => ({ ...prev, services }));
    } catch (error) {
      setError('services', (error as Error).message);
    } finally {
      setLoading('services', false);
    }
  }, []);

  // Fetch environments
  const fetchEnvironments = useCallback(async () => {
    setLoading('environments', true);
    setError('environments', null);
    try {
      const environments = await withErrorHandling(
        () => DevPlatformApi.getEnvironments(),
        'Failed to fetch environments'
      );
      setState(prev => ({ ...prev, environments }));
    } catch (error) {
      setError('environments', (error as Error).message);
    } finally {
      setLoading('environments', false);
    }
  }, []);

  // Fetch system health
  const fetchSystemHealth = useCallback(async () => {
    setLoading('systemHealth', true);
    setError('systemHealth', null);
    try {
      const systemHealth = await withErrorHandling(
        () => DevPlatformApi.getSystemHealth(),
        'Failed to fetch system health'
      );
      setState(prev => ({ ...prev, systemHealth }));
    } catch (error) {
      setError('systemHealth', (error as Error).message);
    } finally {
      setLoading('systemHealth', false);
    }
  }, []);

  // Fetch alerts
  const fetchAlerts = useCallback(async () => {
    setLoading('alerts', true);
    setError('alerts', null);
    try {
      const alerts = await withErrorHandling(
        () => DevPlatformApi.getAlerts(),
        'Failed to fetch alerts'
      );
      setState(prev => ({ ...prev, alerts }));
    } catch (error) {
      setError('alerts', (error as Error).message);
    } finally {
      setLoading('alerts', false);
    }
  }, []);

  // Fetch branches
  const fetchBranches = useCallback(async () => {
    setLoading('branches', true);
    setError('branches', null);
    try {
      const branches = await withErrorHandling(
        () => DevPlatformApi.getBranches(),
        'Failed to fetch branches'
      );
      setState(prev => ({ ...prev, branches }));
    } catch (error) {
      setError('branches', (error as Error).message);
    } finally {
      setLoading('branches', false);
    }
  }, []);

  // Fetch environment options
  const fetchEnvironmentOptions = useCallback(async () => {
    setLoading('environmentOptions', true);
    setError('environmentOptions', null);
    try {
      const environmentOptions = await withErrorHandling(
        () => DevPlatformApi.getEnvironmentOptions(),
        'Failed to fetch environment options'
      );
      setState(prev => ({ ...prev, environmentOptions }));
    } catch (error) {
      setError('environmentOptions', (error as Error).message);
    } finally {
      setLoading('environmentOptions', false);
    }
  }, []);

  // Action methods
  const retryPipeline = useCallback(async (pipelineId: string) => {
    try {
      const result = await withErrorHandling(
        () => DevPlatformApi.retryPipeline(pipelineId),
        'Failed to retry pipeline'
      );
      
      if (result.success) {
        // Refresh pipelines after retry
        await fetchPipelines();
      }
      
      return result;
    } catch (error) {
      throw error;
    }
  }, [fetchPipelines]);

  const restartService = useCallback(async (serviceId: string) => {
    try {
      const result = await withErrorHandling(
        () => DevPlatformApi.restartService(serviceId),
        'Failed to restart service'
      );
      
      if (result.success) {
        // Refresh services after restart
        await fetchServices();
      }
      
      return result;
    } catch (error) {
      throw error;
    }
  }, [fetchServices]);

  const deployToEnvironment = useCallback(async (environmentId: string, branch: string) => {
    try {
      const result = await withErrorHandling(
        () => DevPlatformApi.deployToEnvironment(environmentId, branch),
        'Failed to deploy to environment'
      );
      
      if (result.success) {
        // Refresh environments and pipelines after deployment
        await Promise.all([fetchEnvironments(), fetchPipelines()]);
      }
      
      return result;
    } catch (error) {
      throw error;
    }
  }, [fetchEnvironments, fetchPipelines]);

  const triggerPipeline = useCallback(async (branch: string, environment: string) => {
    try {
      const result = await withErrorHandling(
        () => DevPlatformApi.triggerPipeline(branch, environment),
        'Failed to trigger pipeline'
      );
      
      if (result.success) {
        // Refresh pipelines after triggering
        await fetchPipelines();
      }
      
      return result;
    } catch (error) {
      throw error;
    }
  }, [fetchPipelines]);

  const acknowledgeAlert = useCallback(async (alertId: string) => {
    try {
      const result = await withErrorHandling(
        () => DevPlatformApi.acknowledgeAlert(alertId),
        'Failed to acknowledge alert'
      );
      
      if (result.success) {
        // Remove acknowledged alert from state
        setState(prev => ({
          ...prev,
          alerts: prev.alerts.filter(alert => alert.id !== alertId)
        }));
      }
      
      return result;
    } catch (error) {
      throw error;
    }
  }, []);

  // Refresh all data
  const refreshAll = useCallback(async () => {
    await Promise.all([
      fetchPipelines(),
      fetchServices(),
      fetchEnvironments(),
      fetchSystemHealth(),
      fetchAlerts(),
    ]);
  }, [fetchPipelines, fetchServices, fetchEnvironments, fetchSystemHealth, fetchAlerts]);

  // Initial data fetch
  useEffect(() => {
    refreshAll();
    fetchBranches();
    fetchEnvironmentOptions();
  }, [refreshAll, fetchBranches, fetchEnvironmentOptions]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(refreshAll, 30000);
    return () => clearInterval(interval);
  }, [refreshAll]);

  return {
    ...state,
    actions: {
      retryPipeline,
      restartService,
      deployToEnvironment,
      triggerPipeline,
      acknowledgeAlert,
      refreshAll,
      fetchPipelines,
      fetchServices,
      fetchEnvironments,
      fetchSystemHealth,
      fetchAlerts,
    },
  };
};