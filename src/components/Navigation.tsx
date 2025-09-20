import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, Clock, BarChart3, Menu, Trophy, Users, Code } from 'lucide-react';

interface NavigationProps {
  onLogout: () => void;
}

const Navigation = ({ onLogout }: NavigationProps) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/attendance', icon: Clock, label: 'Time & Leave' },
    { path: '/devplatform', icon: Code, label: 'DevOps' },
    { path: '/leaderboard', icon: Users, label: 'Leaderboard' },
    { path: '/profile', icon: Menu, label: 'More' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 transition-colors duration-200 ${
                isActive
                  ? 'text-yellow-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;