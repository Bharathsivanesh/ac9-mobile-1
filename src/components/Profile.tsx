import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, Bell, Shield, MessageSquare, BarChart3, Link2, ChevronRight, Edit3, Trophy, Code } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Profile = () => {
  const { state, dispatch } = useAppContext();
  const { user } = state;
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editData, setEditData] = useState({
    name: user.name,
    department: user.department,
    role: user.role
  });

  const menuItems = [
    { 
      icon: User, 
      label: 'Personal Info', 
      action: () => setShowEditProfile(true),
      type: 'action'
    },
    { 
      icon: Trophy, 
      label: 'Challenges', 
      path: '/trivia',
      type: 'link'
    },
    { 
      icon: Code, 
      label: 'Developer Platform', 
      path: '/devplatform',
      type: 'link'
    },
    { 
      icon: MessageSquare, 
      label: 'Complaints', 
      path: '/complaints',
      type: 'link'
    },
    { 
      icon: BarChart3, 
      label: 'Statistics', 
      path: '/statistics',
      type: 'link'
    },
    { 
      icon: Link2, 
      label: 'Integrations', 
      path: '/integrations',
      type: 'link'
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      path: '/settings',
      type: 'link'
    },
  ];

  const handleSaveProfile = () => {
    dispatch({ 
      type: 'UPDATE_PROFILE', 
      updates: editData 
    });
    setShowEditProfile(false);
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
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-1">Manage your account</p>
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-r from-yellow-600 to-amber-700 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover border-3 border-white/20"
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-yellow-100 text-sm">{user.role}</p>
            <p className="text-yellow-200 text-sm">{user.department}</p>
          </div>
          <button
            onClick={() => setShowEditProfile(true)}
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
          >
            <Edit3 size={18} />
          </button>
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="flex justify-between items-center text-sm">
            <span className="text-yellow-100">Employee ID</span>
            <span className="font-medium">{user.id}</span>
          </div>
          <div className="flex justify-between items-center text-sm mt-2">
            <span className="text-yellow-100">Email</span>
            <span className="font-medium">{user.email}</span>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Edit Profile</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <input
                  type="text"
                  value={editData.department}
                  onChange={(e) => setEditData({ ...editData, department: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <input
                  type="text"
                  value={editData.role}
                  onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowEditProfile(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 py-3 px-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menu Items */}
      <div className="space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          
          const content = (
            <div className="flex items-center space-x-4 p-4 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 hover:bg-gray-50/90 transition-colors shadow-lg">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Icon size={20} className="text-gray-600" />
              </div>
              <span className="flex-1 font-medium text-gray-900">{item.label}</span>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          );

          if (item.type === 'link') {
            return (
              <Link key={index} to={item.path!}>
                {content}
              </Link>
            );
          } else {
            return (
              <button key={index} onClick={item.action} className="w-full">
                {content}
              </button>
            );
          }
        })}
      </div>

      {/* Logout */}
      <div className="pt-4">
        <button className="w-full p-4 bg-red-50/90 backdrop-blur-sm text-red-600 rounded-lg border border-red-200 hover:bg-red-100/90 transition-colors font-medium shadow-lg">
          Sign Out
        </button>
      </div>
      </div>
    </div>
  );
};

export default Profile;