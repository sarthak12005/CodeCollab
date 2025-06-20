import React, { useState } from 'react';
import { Home, FileText, Users, BarChart3, User, Settings, Code, Trophy, Clock, Calendar, Eye, EyeOff } from 'lucide-react';
import Header from '../components/Header';

const CodeCollaborationHub = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Alex Morgan',
    username: 'alexmorgan',
    email: 'alex.morgan@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const sidebarItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'problems', icon: FileText, label: 'Problem Sets' },
    { id: 'collaborations', icon: Users, label: 'Live Collaborations' },
    { id: 'past', icon: Clock, label: 'Past Collaborations' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  const recentProblems = [
    { id: 1, name: 'Two Sum', difficulty: 'EASY', time: '12m 34s', date: 'Oct 15, 2023' },
    { id: 2, name: 'Valid Parentheses', difficulty: 'EASY', time: '8m 22s', date: 'Oct 14, 2023' },
    { id: 3, name: 'Longest Substring Without Repeating Characters', difficulty: 'MEDIUM', time: '24m 15s', date: 'Oct 13, 2023' }
  ];

  const activityData = [
    { day: 'Sun', problems: [1, 1, 1] },
    { day: 'Mon', problems: [2, 1] },
    { day: 'Tue', problems: [3, 2, 1] },
    { day: 'Wed', problems: [2, 1] },
    { day: 'Thu', problems: [3, 2, 1] },
    { day: 'Fri', problems: [2, 1] },
    { day: 'Sat', problems: [1] }
  ];

  const handleInputChange = (field, value) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    alert('Profile information saved successfully!');
  };

  const handleChangePassword = () => {
    if (userInfo.newPassword !== userInfo.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    alert('Password changed successfully!');
    setUserInfo(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deletion process initiated. You will receive a confirmation email.');
    }
  };

  const renderProfile = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
            alt="Alex Morgan" 
            className="w-20 h-20 rounded-full border-4 border-blue-500"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
            <Code className="w-3 h-3 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Alex Morgan</h1>
          <p className="text-blue-400">@alexmorgan</p>
          <p className="text-gray-400 text-sm">Member since Jan 2023</p>
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-300">7-day streak</span>
            </div>
            <div className="flex items-center space-x-1">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-gray-300">Pro</span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-4">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">127</div>
            <div className="text-gray-400 text-sm">Problems Solved</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-lg mb-4">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">80%</div>
            <div className="text-gray-400 text-sm">Acceptance Rate</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-600 rounded-lg mb-4">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">156h</div>
            <div className="text-gray-400 text-sm">Coding Time</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-center w-12 h-12 bg-cyan-600 rounded-lg mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">92</div>
            <div className="text-gray-400 text-sm">Collaboration Score</div>
          </div>
        </div>
      </div>

      {/* 30-Day Activity */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">30-Day Activity</h2>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex justify-between items-end space-x-4 mb-4">
            {activityData.map((day, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className="flex flex-col space-y-1">
                  {day.problems.map((level, pIndex) => (
                    <div
                      key={pIndex}
                      className={`w-4 h-4 rounded ${
                        level === 1 ? 'bg-green-400' :
                        level === 2 ? 'bg-green-500' :
                        'bg-green-600'
                      }`}
                    />
                  ))}
                  {index === 2 && (
                    <div className="w-4 h-4 rounded border-2 border-blue-500"></div>
                  )}
                </div>
                <span className="text-xs text-gray-400">{day.day}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end space-x-4 text-xs text-gray-400">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-400 rounded"></div>
              <span>1 problem</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>2 problems</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-600 rounded"></div>
              <span>3+ problems</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Solved Problems */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Recent Solved Problems</h2>
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4">
            <div className="grid grid-cols-4 gap-4 text-white font-semibold">
              <div>#</div>
              <div>Problem</div>
              <div>Difficulty</div>
              <div>Time</div>
              <div>Date</div>
            </div>
          </div>
          <div className="divide-y divide-gray-700">
            {recentProblems.map((problem) => (
              <div key={problem.id} className="p-4 grid grid-cols-4 gap-4 items-center">
                <div className="text-gray-400">{problem.id}</div>
                <div className="text-white font-medium">{problem.name}</div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    problem.difficulty === 'EASY' ? 'bg-green-900 text-green-300' :
                    problem.difficulty === 'MEDIUM' ? 'bg-orange-900 text-orange-300' :
                    'bg-red-900 text-red-300'
                  }`}>
                    {problem.difficulty}
                  </span>
                </div>
                <div className="text-gray-400">{problem.time}</div>
                <div className="text-gray-400">{problem.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Settings</h1>
      
      {/* Profile Information */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Profile Information</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                value={userInfo.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
              <input
                type="text"
                value={userInfo.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={userInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleSaveProfile}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Profile
          </button>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Change Password</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={userInfo.currentPassword}
                onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
            <input
              type="password"
              value={userInfo.newPassword}
              onChange={(e) => handleInputChange('newPassword', e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
            <input
              type="password"
              value={userInfo.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleChangePassword}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Delete Account */}
      <div className="bg-gray-800 rounded-lg p-6 border border-red-700">
        <h2 className="text-xl font-semibold text-red-400 mb-4">Danger Zone</h2>
        <div className="space-y-4">
          <p className="text-gray-300">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button
            onClick={handleDeleteAccount}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );

  const renderPlaceholder = (title) => (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
        <p className="text-gray-400 text-lg">This section is under development</p>
        <p className="text-gray-500 mt-2">Content will be available soon</p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfile();
      case 'settings':
        return renderSettings();
      case 'home':
        return renderPlaceholder('Home');
      case 'problems':
        return renderPlaceholder('Problem Sets');
      case 'collaborations':
        return renderPlaceholder('Live Collaborations');
      case 'past':
        return renderPlaceholder('Past Collaborations');
      default:
        return renderProfile();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-semibold">Code Collaboration</div>
              <div className="text-gray-400 text-sm">Hub</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
              alt="Alex Morgan" 
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-medium truncate">Alex Morgan</div>
              <div className="text-gray-400 text-xs truncate">@alexmorgan</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default CodeCollaborationHub;