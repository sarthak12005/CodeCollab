import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/userContext";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import {
  Camera,
  Edit3,
  Save,
  X,
  LogOut,
  Mail,
  Calendar,
  Award,
  Target,
  Activity,
  User,
  Settings,
  BarChart3,
  Trophy,
  Clock,
  Code,
  TrendingUp
} from "lucide-react";

const ProfileNew = () => {
  const { logout, user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiStats, setApiStats] = useState(null);
  const [profileImage, setProfileImage] = useState(
    user?.userImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  );
  const [userInfo, setUserInfo] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    bio: user?.bio || "Passionate developer and problem solver",
    location: user?.location || "",
    website: user?.website || "",
  });

  const fileInputRef = useRef(null);

  // Fetch user statistics from API
  const fetchUserStats = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/user/stats`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setApiStats(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update userInfo when user data changes
  useEffect(() => {
    if (user) {
      setUserInfo({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        bio: user.bio || "Passionate developer and problem solver",
        location: user.location || "",
        website: user.website || "",
      });
      setProfileImage(user.userImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face");
      fetchUserStats();
    }
  }, [user]);

  // Use API stats if available, otherwise calculate from user data
  const stats = apiStats || {
    problemsSolved: user?.solveProblems?.length || 0,
    totalSubmissions: 0,
    acceptanceRate: 0,
    currentStreak: 0,
    maxStreak: 0,
    ranking: 0,
    contestsParticipated: 0,
    badges: 0,
    easyProblems: 0,
    mediumProblems: 0,
    hardProblems: 0
  };

  // Get recent activity from API stats or user data
  const recentActivity = apiStats?.recentActivity || (user?.solveProblems || [])
    .slice(-4)
    .reverse()
    .map((problem, index) => ({
      id: problem._id || index,
      problem: problem.title || problem.name || `Problem ${index + 1}`,
      difficulty: problem.difficulty || 'Easy',
      status: 'Solved',
      time: problem.solvedAt ? new Date(problem.solvedAt).toLocaleDateString() : 'Recently'
    })) || [
      { id: 1, problem: "No problems solved yet", difficulty: "Easy", status: "Start solving!", time: "Get started" }
    ];

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add API call to save profile
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`${theme.bg.card} p-6 rounded-xl ${theme.shadow.md}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme.text.secondary}`}>Problems Solved</p>
              <p className={`text-3xl font-bold ${theme.text.primary}`}>{stats.problemsSolved}</p>
            </div>
            <Code className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className={`${theme.bg.card} p-6 rounded-xl ${theme.shadow.md}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme.text.secondary}`}>Acceptance Rate</p>
              <p className={`text-3xl font-bold ${theme.text.primary}`}>{stats.acceptanceRate}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className={`${theme.bg.card} p-6 rounded-xl ${theme.shadow.md}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme.text.secondary}`}>Current Streak</p>
              <p className={`text-3xl font-bold ${theme.text.primary}`}>{stats.currentStreak}</p>
            </div>
            <Target className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        
        <div className={`${theme.bg.card} p-6 rounded-xl ${theme.shadow.md}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme.text.secondary}`}>Global Rank</p>
              <p className={`text-3xl font-bold ${theme.text.primary}`}>#{stats.ranking}</p>
            </div>
            <Trophy className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Problem Distribution */}
      <div className={`${theme.bg.card} p-6 rounded-xl ${theme.shadow.md}`}>
        <h3 className={`text-xl font-semibold ${theme.text.primary} mb-4`}>Problem Distribution</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.easyProblems}</div>
            <div className="text-sm text-green-600">Easy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.mediumProblems}</div>
            <div className="text-sm text-yellow-600">Medium</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{stats.hardProblems}</div>
            <div className="text-sm text-red-600">Hard</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActivity = () => (
    <div className={`${theme.bg.card} p-6 rounded-xl ${theme.shadow.md}`}>
      <h3 className={`text-xl font-semibold ${theme.text.primary} mb-4`}>Recent Activity</h3>
      <div className="space-y-4">
        {recentActivity.map((activity) => (
          <div key={activity.id} className={`flex items-center justify-between p-4 ${theme.bg.tertiary} rounded-lg`}>
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(activity.difficulty)}`}>
                {activity.difficulty}
              </div>
              <div>
                <p className={`font-medium ${theme.text.primary}`}>{activity.problem}</p>
                <p className={`text-sm ${theme.text.secondary}`}>{activity.time}</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              activity.status === 'Solved' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
            }`}>
              {activity.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className={`${theme.bg.card} p-6 rounded-xl ${theme.shadow.md}`}>
        <h3 className={`text-xl font-semibold ${theme.text.primary} mb-4`}>Profile Information</h3>
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium ${theme.text.secondary} mb-2`}>Name</label>
            <input
              type="text"
              value={userInfo.name}
              onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
              disabled={!isEditing}
              className={`w-full px-3 py-2 rounded-lg ${theme.input.base} ${!isEditing ? 'opacity-60' : ''}`}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${theme.text.secondary} mb-2`}>Email</label>
            <input
              type="email"
              value={userInfo.email}
              onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
              disabled={!isEditing}
              className={`w-full px-3 py-2 rounded-lg ${theme.input.base} ${!isEditing ? 'opacity-60' : ''}`}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${theme.text.secondary} mb-2`}>Bio</label>
            <textarea
              value={userInfo.bio}
              onChange={(e) => setUserInfo({...userInfo, bio: e.target.value})}
              disabled={!isEditing}
              rows={3}
              className={`w-full px-3 py-2 rounded-lg ${theme.input.base} ${!isEditing ? 'opacity-60' : ''}`}
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className={`${theme.button.secondary} px-4 py-2 rounded-lg flex items-center space-x-2`}
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className={`${theme.button.primary} px-4 py-2 rounded-lg flex items-center space-x-2`}
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className={`${theme.button.secondary} px-4 py-2 rounded-lg flex items-center space-x-2`}
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className={`min-h-screen ${theme.bg.primary} flex items-center justify-center`}>
        <Header />
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className={theme.text.secondary}>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme.bg.primary}`}>
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className={`${theme.bg.card} rounded-xl ${theme.shadow.lg} p-8 mb-8`}>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Image */}
            <div className="relative">
              <img
                src={profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 cursor-pointer"
                onClick={handleImageClick}
              />
              <button
                onClick={handleImageClick}
                className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className={`text-3xl font-bold ${theme.text.primary} mb-2`}>
                    {userInfo.name}
                  </h1>
                  <p className={`${theme.text.secondary} text-lg mb-2`}>
                    @{user?.username || "username"}
                  </p>
                  <p className={`${theme.text.tertiary} mb-4`}>
                    {userInfo.bio}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className={`${theme.button.danger} px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors`}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className={`${theme.bg.card} rounded-xl ${theme.shadow.lg} mb-8`}>
          <div className={`flex border-b ${theme.border.primary}`}>
            {[
              { id: "overview", label: "Overview", icon: User },
              { id: "stats", label: "Statistics", icon: BarChart3 },
              { id: "activity", label: "Recent Activity", icon: Activity },
              { id: "settings", label: "Settings", icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? `${theme.text.accent} border-b-2 border-blue-500`
                      : `${theme.text.secondary} hover:${theme.text.primary.replace('text-', '')}`
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "overview" && renderOverview()}
          {activeTab === "stats" && renderOverview()}
          {activeTab === "activity" && renderActivity()}
          {activeTab === "settings" && renderSettings()}
        </div>
      </div>
    </div>
  );
};

export default ProfileNew;
