import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { MockApi, User, Leave, Complaint, Notification } from '../services/mockApi';

interface AppState {
  user: User;
  leaves: Leave[];
  complaints: Complaint[];
  notifications: Notification[];
  integrations: {
    slack: boolean;
    github: boolean;
    googleCalendar: boolean;
  };
}

type AppAction =
  | { type: 'CHECK_IN'; method: 'location' | 'wifi' }
  | { type: 'CHECK_OUT' }
  | { type: 'ADD_LEAVE'; leave: Omit<Leave, 'id' | 'appliedDate' | 'status'> }
  | { type: 'ADD_COMPLAINT'; complaint: Omit<Complaint, 'id' | 'submittedDate' | 'status'> }
  | { type: 'TOGGLE_INTEGRATION'; service: keyof AppState['integrations'] }
  | { type: 'UPDATE_PROFILE'; updates: Partial<User> }
  | { type: 'SET_USER'; user: User }
  | { type: 'SET_LEAVES'; leaves: Leave[] }
  | { type: 'SET_COMPLAINTS'; complaints: Complaint[] }
  | { type: 'SET_NOTIFICATIONS'; notifications: Notification[] }
  | { type: 'SET_INTEGRATIONS'; integrations: AppState['integrations'] };

const initialState: AppState = {
  user: {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    department: 'Engineering',
    role: 'Senior Frontend Developer',
    profilePicture: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400',
    isCheckedIn: false,
  },
  leaves: [],
  complaints: [],
  notifications: [],
  integrations: {
    slack: true,
    github: false,
    googleCalendar: true,
  },
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'CHECK_IN':
      return {
        ...state,
        user: {
          ...state.user,
          isCheckedIn: true,
          lastCheckIn: new Date().toISOString(),
          checkInMethod: action.method,
        },
      };
    case 'CHECK_OUT':
      return {
        ...state,
        user: {
          ...state.user,
          isCheckedIn: false,
        },
      };
    case 'ADD_LEAVE':
      return {
        ...state,
        leaves: [
          ...state.leaves,
          {
            ...action.leave,
            id: Date.now().toString(),
            appliedDate: new Date().toISOString(),
            status: 'pending',
          },
        ],
      };
    case 'ADD_COMPLAINT':
      return {
        ...state,
        complaints: [
          ...state.complaints,
          {
            ...action.complaint,
            id: Date.now().toString(),
            submittedDate: new Date().toISOString(),
            status: 'submitted',
          },
        ],
      };
    case 'TOGGLE_INTEGRATION':
      return {
        ...state,
        integrations: {
          ...state.integrations,
          [action.service]: !state.integrations[action.service],
        },
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.updates,
        },
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    case 'SET_LEAVES':
      return {
        ...state,
        leaves: action.leaves,
      };
    case 'SET_COMPLAINTS':
      return {
        ...state,
        complaints: action.complaints,
      };
    case 'SET_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.notifications,
      };
    case 'SET_INTEGRATIONS':
      return {
        ...state,
        integrations: action.integrations,
      };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  loadData: () => Promise<void>;
} | null>(null);

export function AppProvider({ children, initialUser }: { children: ReactNode; initialUser?: User }) {
  const [state, dispatch] = useReducer(appReducer, {
    ...initialState,
    user: initialUser || initialState.user
  });

  const loadData = async () => {
    try {
      // Load all initial data from mock API
      const [leaves, complaints, notifications, integrations] = await Promise.all([
        MockApi.getLeaves(state.user.id),
        MockApi.getComplaints(state.user.id),
        MockApi.getNotifications(state.user.id),
        MockApi.getIntegrations(state.user.id),
      ]);

      dispatch({ type: 'SET_LEAVES', leaves });
      dispatch({ type: 'SET_COMPLAINTS', complaints });
      dispatch({ type: 'SET_NOTIFICATIONS', notifications });
      dispatch({ type: 'SET_INTEGRATIONS', integrations });
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch, loadData }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}