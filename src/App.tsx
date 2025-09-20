import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import AttendanceLeaves from './components/AttendanceLeaves';
import Profile from './components/Profile';
import Statistics from './components/Statistics';
import Integrations from './components/Integrations';
import Complaints from './components/Complaints';
import Settings from './components/Settings';
import Trivia from './components/Trivia';
import Leaderboard from './components/Leaderboard';
import DeveloperPlatform from './components/DeveloperPlatform';
import FloatingActionButton from './components/FloatingActionButton';
import { AppProvider, useAppContext } from './context/AppContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (userData: any) => {
    setCurrentUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <AppProvider initialUser={currentUser}>
      <Router>
        <div className="min-h-screen bg-gray-50 relative">
          <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg relative z-10">
            <AppDataLoader />
            <main className="pb-24">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/attendance" element={<AttendanceLeaves />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/integrations" element={<Integrations />} />
                <Route path="/complaints" element={<Complaints />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/trivia" element={<Trivia />} />
                <Route path="/devplatform" element={<DeveloperPlatform />} />
              </Routes>
            </main>
            <FloatingActionButton />
            <Navigation onLogout={handleLogout} />
          </div>
        </div>
      </Router>
    </AppProvider>
  );
}

// Component to load initial data
function AppDataLoader() {
  const { loadData } = useAppContext();

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  return null;
}

export default App;