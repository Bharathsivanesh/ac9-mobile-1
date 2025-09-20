import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Clock, TrendingUp, Users, Award, Target, Heart, Coffee, Droplets, MessageSquare, Camera, Trophy, Mail, FileText, Cake, Settings } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { MockApi } from '../services/mockApi';

const Statistics = () => {
  const { state } = useAppContext();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [enabledStats, setEnabledStats] = useState({
    peopleInteraction: true,
    wellness: true,
    funParticipation: true,
    companyWide: true,
    seasonal: true
  });
  const [statsData, setStatsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const loadStatsData = async () => {
      try {
        const data = await MockApi.getUserStats(state.user.id);
        setStatsData(data);
      } catch (error) {
        console.error('Failed to load statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStatsData();
  }, [state.user.id]);
  // Mock data for charts
  const attendanceData = [
    { name: 'Mon', hours: 8.5, target: 8 },
    { name: 'Tue', hours: 8.2, target: 8 },
    { name: 'Wed', hours: 7.8, target: 8 },
    { name: 'Thu', hours: 8.3, target: 8 },
    { name: 'Fri', hours: 8.1, target: 8 },
  ];

  const monthlyData = [
    { month: 'Jan', attendance: 95, leaves: 2, overtime: 12 },
    { month: 'Feb', attendance: 92, leaves: 3, overtime: 8 },
    { month: 'Mar', attendance: 98, leaves: 1, overtime: 15 },
    { month: 'Apr', attendance: 94, leaves: 2, overtime: 10 },
    { month: 'May', attendance: 96, leaves: 1, overtime: 18 },
    { month: 'Jun', attendance: 93, leaves: 4, overtime: 6 },
  ];

  const leaveDistribution = [
    { name: 'Annual Leave', value: 8, color: '#f59e0b' },
    { name: 'Sick Leave', value: 3, color: '#ef4444' },
    { name: 'Personal Leave', value: 2, color: '#8b5cf6' },
    { name: 'Available', value: 12, color: '#10b981' },
  ];

  const performanceMetrics = statsData ? [
    { title: 'Attendance Rate', value: `${statsData.attendanceStats.attendanceRate}%`, change: '+2.1%', trend: 'up', icon: Clock, color: 'text-green-600' },
    { title: 'Leave Balance', value: '12 days', change: '+2 days', trend: 'up', icon: Calendar, color: 'text-blue-600' },
  ] : [];

  // People & Interaction Stats
  const peopleStats = [
    { title: 'Most Helpful Colleague', value: 'Alex Chen', subtitle: '47 kudos received', icon: Heart, color: 'text-pink-600' },
    { title: 'Top Collaborator', value: 'Sarah Kim', subtitle: '12 cross-team projects', icon: Users, color: 'text-blue-600' },
    { title: 'Most Replied-to Posts', value: 'Mike Johnson', subtitle: '156 forum replies', icon: MessageSquare, color: 'text-green-600' },
    { title: 'Coffee Buddy Count', value: '23', subtitle: 'break companions', icon: Coffee, color: 'text-amber-600' },
  ];

  // Wellness & Lifestyle Stats
  const wellnessStats = [
    { title: 'Company Steps This Month', value: '2.4M', subtitle: 'Goal: 3M steps', progress: 80, icon: Target, color: 'text-green-600' },
    { title: 'Most Hydrated Dept', value: 'Engineering', subtitle: '8.2L avg daily', icon: Droplets, color: 'text-blue-600' },
    { title: 'Break Time Champion', value: 'Design Team', subtitle: '15min avg breaks', icon: Coffee, color: 'text-yellow-600' },
    { title: 'Meditation Minutes', value: '1,247', subtitle: 'collective zen time', icon: Target, color: 'text-purple-600' },
  ];

  // Fun Participation Stats
  const funStats = statsData ? [
    { title: 'Your Trivia Accuracy', value: `${statsData.triviaStats.accuracy}%`, subtitle: `${statsData.triviaStats.questionsAnswered} questions answered`, icon: Trophy, color: 'text-yellow-600' },
    { title: 'Photo Submissions', value: statsData.photoStats.submissions, subtitle: `${statsData.photoStats.likes} likes received`, icon: Camera, color: 'text-pink-600' },
    { title: 'Current Streak', value: `${statsData.triviaStats.currentStreak} days`, subtitle: 'trivia streak', icon: Award, color: 'text-green-600' },
    { title: 'Attendance Streak', value: `${statsData.attendanceStats.currentStreak} days`, subtitle: 'perfect attendance', icon: TrendingUp, color: 'text-blue-600' },
  ] : [];

  // Company-Wide Stats
  const companyStats = [
    { title: 'Combined Experience', value: '847 years', subtitle: 'across all employees', icon: Award, color: 'text-purple-600' },
    { title: 'PRs Merged', value: '247', subtitle: 'this month', icon: Target, color: 'text-green-600' },
    { title: 'Most Used Emoji', value: '🎉', subtitle: '1,234 times used', icon: Heart, color: 'text-yellow-600' },
    { title: 'Files Uploaded', value: '2,847', subtitle: "That's a lot of docs!", icon: FileText, color: 'text-blue-600' },
  ];

  // Seasonal Stats
  const seasonalStats = [
    { title: 'Birthday Month Leader', value: 'March', subtitle: '12 celebrants 🎂', icon: Cake, color: 'text-pink-600' },
    { title: 'Longest Email Chain', value: '47 replies', subtitle: '"Project Alpha Discussion"', icon: Mail, color: 'text-amber-600' },
    { title: 'Popular Lunch Choice', value: 'Chicken Bowl', subtitle: 'ordered 89 times', icon: Heart, color: 'text-green-600' },
  ];

  const [showAddSeasonal, setShowAddSeasonal] = useState(false);
  const [newSeasonalStat, setNewSeasonalStat] = useState({
    title: '',
    value: '',
    subtitle: ''
  });

  const handleAddSeasonal = () => {
    if (newSeasonalStat.title && newSeasonalStat.value && newSeasonalStat.subtitle) {
      // In a real app, this would be saved to state/backend
      setShowAddSeasonal(false);
      setNewSeasonalStat({ title: '', value: '', subtitle: '' });
    }
  };

  const toggleStatCategory = (category: keyof typeof enabledStats) => {
    setEnabledStats(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const StatCard = ({ stat, showProgress = false }: { stat: any, showProgress?: boolean }) => {
    const Icon = stat.icon;
    return (
      <div className="p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <Icon className={`${stat.color}`} size={20} />
        </div>
        <p className="text-xl font-bold text-gray-900">{stat.value}</p>
        <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
        <p className="text-xs text-gray-500">{stat.subtitle}</p>
        {showProgress && stat.progress && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${stat.progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading statistics...</p>
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Statistics</h1>
          <p className="text-gray-600 mt-1">Your performance & community insights</p>
        </div>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Stats Configuration */}
      <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-gray-200 shadow-lg">
        <div className="flex items-center space-x-2 mb-3">
          <Settings size={18} className="text-gray-600" />
          <h3 className="font-semibold text-gray-900">Configure Stats</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(enabledStats).map(([key, enabled]) => (
            <button
              key={key}
              onClick={() => toggleStatCategory(key as keyof typeof enabledStats)}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                enabled 
                  ? 'bg-yellow-100 text-yellow-800 border-yellow-300' 
                  : 'bg-gray-100 text-gray-600 border-gray-300'
              }`}
            >
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </button>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-3 gap-4">
        {performanceMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`${metric.color}`} size={20} />
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  metric.trend === 'up' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {metric.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              <p className="text-sm text-gray-600">{metric.title}</p>
            </div>
          );
        })}
      </div>

      {/* People & Interaction Stats */}
      {enabledStats.peopleInteraction && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Users className="text-pink-600" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">People & Interaction</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {peopleStats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>
        </div>
      )}

      {/* Wellness & Lifestyle Stats */}
      {enabledStats.wellness && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Heart className="text-green-600" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">Wellness & Lifestyle</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {wellnessStats.map((stat, index) => (
              <StatCard key={index} stat={stat} showProgress={stat.progress !== undefined} />
            ))}
          </div>
        </div>
      )}

      {/* Fun Participation Stats */}
      {enabledStats.funParticipation && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Trophy className="text-yellow-600" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">Fun Participation</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {funStats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>
        </div>
      )}

      {/* Company-Wide Stats */}
      {enabledStats.companyWide && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Target className="text-blue-600" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">Company-Wide Cumulative</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {companyStats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>
        </div>
      )}

      {/* Seasonal Stats */}
      {enabledStats.seasonal && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
            <Cake className="text-pink-600" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">Seasonal & Special</h2>
            </div>
            <button
              onClick={() => setShowAddSeasonal(true)}
              className="px-3 py-1 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Add Custom
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {seasonalStats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>
        </div>
      )}

      {/* Add Seasonal Stat Modal */}
      {showAddSeasonal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add Custom Seasonal Stat</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newSeasonalStat.title}
                  onChange={(e) => setNewSeasonalStat({ ...newSeasonalStat, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="e.g., Holiday Spirit Champion"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
                <input
                  type="text"
                  value={newSeasonalStat.value}
                  onChange={(e) => setNewSeasonalStat({ ...newSeasonalStat, value: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="e.g., Sarah Johnson"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <input
                  type="text"
                  value={newSeasonalStat.subtitle}
                  onChange={(e) => setNewSeasonalStat({ ...newSeasonalStat, subtitle: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="e.g., decorated 5 workspaces 🎄"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowAddSeasonal(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSeasonal}
                  className="flex-1 py-3 px-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Add Stat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Monthly Trends */}
      <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-gray-200 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="attendance" stroke="#f59e0b" strokeWidth={3} />
            <Line type="monotone" dataKey="leaves" stroke="#8b5cf6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Leave Distribution */}
      <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-gray-200 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Leave Distribution</h2>
        <div className="flex items-center space-x-6">
          <ResponsiveContainer width="50%" height={150}>
            <PieChart>
              <Pie
                data={leaveDistribution}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={60}
                paddingAngle={5}
                dataKey="value"
              >
                {leaveDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex-1 space-y-2">
            {leaveDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{item.value} days</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="bg-gradient-to-r from-yellow-50/90 to-amber-50/90 backdrop-blur-sm p-6 rounded-xl border border-yellow-200 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
            <div className="p-2 bg-green-100 rounded-full">
              <Award className="text-green-600" size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Perfect Week</p>
              <p className="text-xs text-gray-600">5 days on time</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
            <div className="p-2 bg-blue-100 rounded-full">
              <Coffee className="text-blue-600" size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Social Butterfly</p>
              <p className="text-xs text-gray-600">10 coffee breaks</p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 text-center shadow-lg">
          <p className="text-2xl font-bold text-gray-900">168</p>
          <p className="text-sm text-gray-600">Total Hours</p>
          <p className="text-xs text-green-600 mt-1">This month</p>
        </div>
        <div className="p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 text-center shadow-lg">
          <p className="text-2xl font-bold text-gray-900">22</p>
          <p className="text-sm text-gray-600">Working Days</p>
          <p className="text-xs text-blue-600 mt-1">This month</p>
        </div>
        <div className="p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 text-center shadow-lg">
          <p className="text-2xl font-bold text-gray-900">7.6</p>
          <p className="text-sm text-gray-600">Avg Hours/Day</p>
          <p className="text-xs text-purple-600 mt-1">This month</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Statistics;