import React, { useState } from 'react';
import { Trophy, Clock, Target, Users, Crown, Medal, Award, Zap, Heart, Coffee, Camera, MessageSquare, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import { MockApi } from '../services/mockApi';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState<'trivia' | 'photo' | 'attendance' | 'social'>('trivia');
  const [viewMode, setViewMode] = useState<'leaderboard' | 'status'>('leaderboard');
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const loadLeaderboardData = async () => {
      try {
        const leaderboardData = await MockApi.getLeaderboardData(activeTab);
        setUsers(leaderboardData);
      } catch (error) {
        console.error('Failed to load leaderboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboardData();
  }, [activeTab]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="text-yellow-500" size={20} />;
      case 2: return <Medal className="text-gray-400" size={20} />;
      case 3: return <Award className="text-amber-600" size={20} />;
      default: return <span className="text-gray-600 font-bold">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3: return 'bg-gradient-to-r from-amber-400 to-amber-600';
      default: return 'bg-gradient-to-r from-gray-100 to-gray-200';
    }
  };

  const getStatValue = (user: any, tab: string) => {
    switch (tab) {
      case 'trivia': return user.stats.triviaStreak;
      case 'photo': return user.stats.photoLikes;
      case 'attendance': return user.stats.attendanceRate;
      case 'social': return user.stats.helpfulVotes;
      default: return 0;
    }
  };

  const getStatLabel = (tab: string) => {
    switch (tab) {
      case 'trivia': return 'Day Streak';
      case 'photo': return 'Total Likes';
      case 'attendance': return 'Attendance %';
      case 'social': return 'Helpful Votes';
      default: return '';
    }
  };

  const getStatIcon = (tab: string) => {
    switch (tab) {
      case 'trivia': return Trophy;
      case 'photo': return Camera;
      case 'attendance': return Clock;
      case 'social': return Heart;
      default: return Trophy;
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    const aValue = getStatValue(a, activeTab);
    const bValue = getStatValue(b, activeTab);
    return bValue - aValue;
  });

  const checkedInUsers = users.filter(user => user.isCheckedIn);
  const checkedOutUsers = users.filter(user => !user.isCheckedIn);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold text-gray-900">Team Leaderboard</h1>
          <p className="text-gray-600 mt-1">See how everyone's doing</p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex bg-gray-100/80 backdrop-blur-sm rounded-lg p-1 shadow-lg">
          <button
            onClick={() => setViewMode('leaderboard')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
              viewMode === 'leaderboard' 
                ? 'bg-white text-yellow-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Trophy size={18} />
            <span>Leaderboard</span>
          </button>
          <button
            onClick={() => setViewMode('status')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
              viewMode === 'status' 
                ? 'bg-white text-yellow-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Clock size={18} />
            <span>Check-in Status</span>
          </button>
        </div>

        {/* Leaderboard View */}
        {viewMode === 'leaderboard' && (
          <>
            {/* Category Tabs */}
            <div className="flex bg-gray-100/80 backdrop-blur-sm rounded-lg p-1 shadow-lg overflow-x-auto">
              <button
                onClick={() => setActiveTab('trivia')}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'trivia' 
                    ? 'bg-white text-yellow-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Trophy size={16} />
                <span>Trivia</span>
              </button>
              <button
                onClick={() => setActiveTab('photo')}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'photo' 
                    ? 'bg-white text-yellow-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Camera size={16} />
                <span>Photo</span>
              </button>
              <button
                onClick={() => setActiveTab('attendance')}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'attendance' 
                    ? 'bg-white text-yellow-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Clock size={16} />
                <span>Attendance</span>
              </button>
              <button
                onClick={() => setActiveTab('social')}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'social' 
                    ? 'bg-white text-yellow-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Heart size={16} />
                <span>Social</span>
              </button>
            </div>

            {/* Leaderboard List */}
            <div className="space-y-3">
              {sortedUsers.map((user, index) => {
                const StatIcon = getStatIcon(activeTab);
                const statValue = getStatValue(user, activeTab);
                const statLabel = getStatLabel(activeTab);
                
                return (
                  <div key={user.id} className={`p-4 rounded-xl border-2 shadow-lg transition-all hover:scale-102 ${
                    index === 0 ? getRankColor(1) + ' text-white' : 'bg-white/90 backdrop-blur-sm border-gray-200'
                  }`}>
                    <div className="flex items-center space-x-4">
                      {/* Rank */}
                      <div className="flex-shrink-0">
                        {index === 0 ? (
                          <Crown className="text-white" size={24} />
                        ) : (
                          <span className={`text-lg font-bold ${index === 0 ? 'text-white' : 'text-gray-600'}`}>
                            #{index + 1}
                          </span>
                        )}
                      </div>

                      {/* Avatar */}
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                      />

                      {/* User Info */}
                      <div className="flex-1">
                        <h3 className={`font-semibold ${index === 0 ? 'text-white' : 'text-gray-900'}`}>
                          {user.name}
                        </h3>
                        <p className={`text-sm ${index === 0 ? 'text-white/80' : 'text-gray-600'}`}>
                          {user.department}
                        </p>
                      </div>

                      {/* Stat */}
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <StatIcon size={16} className={index === 0 ? 'text-white' : 'text-gray-600'} />
                          <span className={`text-lg font-bold ${index === 0 ? 'text-white' : 'text-gray-900'}`}>
                            {activeTab === 'attendance' ? `${statValue}%` : statValue}
                          </span>
                        </div>
                        <p className={`text-xs ${index === 0 ? 'text-white/80' : 'text-gray-600'}`}>
                          {statLabel}
                        </p>
                      </div>

                      {/* Check-in Status */}
                      <div className="flex-shrink-0">
                        {user.isCheckedIn ? (
                          <CheckCircle className={`${index === 0 ? 'text-white' : 'text-green-600'}`} size={16} />
                        ) : (
                          <XCircle className={`${index === 0 ? 'text-white/60' : 'text-gray-400'}`} size={16} />
                        )}
                      </div>
                    </div>

                    {/* Badges */}
                    {user.badges.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {user.badges.slice(0, 2).map((badge, badgeIndex) => (
                          <span
                            key={badgeIndex}
                            className={`px-2 py-1 text-xs rounded-full ${
                              index === 0 
                                ? 'bg-white/20 text-white' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {badge}
                          </span>
                        ))}
                        {user.badges.length > 2 && (
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            index === 0 
                              ? 'bg-white/20 text-white' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            +{user.badges.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Check-in Status View */}
        {viewMode === 'status' && (
          <div className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-green-50/80 backdrop-blur-sm rounded-xl border border-green-200 text-center shadow-lg">
                <CheckCircle className="text-green-600 mx-auto mb-2" size={24} />
                <p className="text-2xl font-bold text-green-600">{checkedInUsers.length}</p>
                <p className="text-sm text-gray-600">Checked In</p>
              </div>
              <div className="p-4 bg-red-50/80 backdrop-blur-sm rounded-xl border border-red-200 text-center shadow-lg">
                <XCircle className="text-red-600 mx-auto mb-2" size={24} />
                <p className="text-2xl font-bold text-red-600">{checkedOutUsers.length}</p>
                <p className="text-sm text-gray-600">Checked Out</p>
              </div>
              <div className="p-4 bg-blue-50/80 backdrop-blur-sm rounded-xl border border-blue-200 text-center shadow-lg">
                <Users className="text-blue-600 mx-auto mb-2" size={24} />
                <p className="text-2xl font-bold text-blue-600">{users.length}</p>
                <p className="text-sm text-gray-600">Total Team</p>
              </div>
            </div>

            {/* Checked In Users */}
            {checkedInUsers.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <CheckCircle className="text-green-600" size={20} />
                  <span>Currently Checked In ({checkedInUsers.length})</span>
                </h2>
                <div className="space-y-2">
                  {checkedInUsers.map((user) => (
                    <div key={user.id} className="p-4 bg-green-50/90 backdrop-blur-sm rounded-xl border border-green-200 shadow-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{user.name}</h3>
                          <p className="text-sm text-gray-600">{user.role}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-600">{user.checkInTime}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(user.lastCheckIn!).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-green-600">Active</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Checked Out Users */}
            {checkedOutUsers.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <XCircle className="text-gray-600" size={20} />
                  <span>Currently Checked Out ({checkedOutUsers.length})</span>
                </h2>
                <div className="space-y-2">
                  {checkedOutUsers.map((user) => (
                    <div key={user.id} className="p-4 bg-gray-50/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover grayscale"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{user.name}</h3>
                          <p className="text-sm text-gray-600">{user.role}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            Last: {user.lastCheckIn ? new Date(user.lastCheckIn).toLocaleDateString() : 'Never'}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          <span className="text-xs text-gray-500">Offline</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;