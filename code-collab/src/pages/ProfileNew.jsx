import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Code,
  BarChart3,
  Clock,
  Users,
  Trophy,
  Eye,
  EyeOff,
  User,
  Settings,
  LogOut,
  Camera,
  Check,
  X,
  TrendingUp,
  Award,
  Target,
  Zap,
  Calendar,
  Star,
  Activity,
  Edit2,
  Save,
  Mail,
  MapPin,
  Globe,
  Shield
} from "lucide-react";
import { useAuth } from "../context/userContext";

const ProfessionalProfile = () => {
 const {user, logout} = useAuth();
 const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    bio: user?.bio || "Passionate developer and problem solver",
    location: user?.location || "",
    website: user?.website || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    solveProblems: user?.solveProblems,
  });

  const [profileImage, setProfileImage] = useState(
    user?.userImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  );
  const fileInputRef = useRef(null);

  // Mock data - replace with real API data
  const stats = {
    problemsSolved: 247,
    acceptanceRate: 85,
    codingTime: "342h",
    collaborationScore: 92,
    currentStreak: 7,
    longestStreak: 21,
    rank: "Top 5%",
    level: 5,
    levelProgress: 65
  };

  const recentProblems = [
    { id: 1, title: "Two Sum", difficulty: "EASY", time: "12m 34s", date: "2 hours ago", status: "solved" },
    { id: 2, title: "Binary Tree Level Order", difficulty: "MEDIUM", time: "24m 12s", date: "5 hours ago", status: "solved" },
    { id: 3, title: "Word Ladder II", difficulty: "HARD", time: "45m 23s", date: "1 day ago", status: "solved" },
  ];

  const activityData = Array.from({ length: 30 }, (_, i) => ({
    day: i,
    problems: Math.floor(Math.random() * 5)
  }));

  const achievements = [
    { icon: Trophy, title: "Problem Solver", desc: "Solved 200+ problems", color: "yellow" },
    { icon: Zap, title: "Speed Demon", desc: "Top 10% solve time", color: "orange" },
    { icon: Target, title: "Consistent Coder", desc: "7-day streak", color: "green" },
    { icon: Award, title: "Contest Winner", desc: "Won 3 contests", color: "purple" }
  ];

  const handleImageClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setProfileImage(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field, value) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Add API call here
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Profile Image */}
          <div className="relative group">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden cursor-pointer" onClick={handleImageClick}>
              <img src={profileImage} alt={userInfo.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
              <Check className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left text-white">
            <h1 className="text-4xl font-bold mb-2">{userInfo.name}</h1>
            <p className="text-xl opacity-90 mb-4">@{userInfo.username}</p>
            <p className="text-lg opacity-80 mb-4 max-w-2xl">{userInfo.bio}</p>
            
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <span className="px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-sm font-semibold flex items-center gap-2">
                <Trophy className="w-4 h-4" /> Pro Member
              </span>
              <span className="px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-sm font-semibold flex items-center gap-2">
                <Zap className="w-4 h-4" /> {stats.currentStreak}-Day Streak 🔥
              </span>
              <span className="px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-sm font-semibold flex items-center gap-2">
                <Award className="w-4 h-4" /> {stats.rank}
              </span>
            </div>

            {/* Level Progress */}
            <div className="mt-6 max-w-md mx-auto md:mx-0">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold">Level {stats.level}</span>
                <span>{stats.levelProgress}% to Level {stats.level + 1}</span>
              </div>
              <div className="w-full bg-white bg-opacity-20 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-white h-full rounded-full transition-all duration-500 shadow-lg"
                  style={{ width: `${stats.levelProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Code, label: "Problems Solved", value: stats.problemsSolved, color: "blue", gradient: "from-blue-500 to-blue-600" },
          { icon: BarChart3, label: "Acceptance Rate", value: `${stats.acceptanceRate}%`, color: "green", gradient: "from-green-500 to-green-600" },
          { icon: Clock, label: "Coding Time", value: stats.codingTime, color: "purple", gradient: "from-purple-500 to-purple-600" },
          { icon: Users, label: "Collaboration", value: stats.collaborationScore, color: "pink", gradient: "from-pink-500 to-pink-600" }
        ].map((stat, index) => (
          <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-xl hover:scale-105 group">
            <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Achievements
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-gray-700 bg-opacity-50 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-all hover:shadow-lg">
              <achievement.icon className={`w-8 h-8 text-${achievement.color}-500 mb-3`} />
              <h3 className="text-white font-semibold mb-1">{achievement.title}</h3>
              <p className="text-gray-400 text-sm">{achievement.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Heatmap */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-blue-500" />
            30-Day Activity
          </h2>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-700 rounded"></div>
              <span>0</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-900 rounded"></div>
              <span>1-2</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-600 rounded"></div>
              <span>3-4</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-400 rounded"></div>
              <span>5+</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-30 gap-1">
          {activityData.map((day, index) => (
            <div
              key={index}
              className={`w-full aspect-square rounded-sm ${
                day.problems === 0 ? 'bg-gray-700' :
                day.problems <= 2 ? 'bg-green-900' :
                day.problems <= 4 ? 'bg-green-600' :
                'bg-green-400'
              } hover:ring-2 ring-white transition-all cursor-pointer`}
              title={`${day.problems} problems`}
            ></div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            Recent Solved Problems
          </h2>
        </div>
        
        {recentProblems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-purple-600">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">#</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Problem</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Difficulty</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Time</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {recentProblems.map((problem, index) => (
                  <tr key={problem.id} className="hover:bg-gray-700 hover:bg-opacity-50 transition-colors">
                    <td className="px-6 py-4 text-gray-400 font-mono">#{problem.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-white font-medium">{problem.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        problem.difficulty === "EASY" ? "bg-green-900 text-green-300 border border-green-700" :
                        problem.difficulty === "MEDIUM" ? "bg-yellow-900 text-yellow-300 border border-yellow-700" :
                        "bg-red-900 text-red-300 border border-red-700"
                      }`}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 font-mono">{problem.time}</td>
                    <td className="px-6 py-4 text-gray-400">{problem.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <Code className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-4 text-lg">No problems solved yet</p>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
              Start Solving
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <User className="w-6 h-6 text-blue-500" />
            Personal Information
          </h2>
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button 
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button 
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name
            </label>
            <input
              type="text"
              value={userInfo.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              <Code className="w-4 h-4" />
              Username
            </label>
            <input
              type="text"
              value={userInfo.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </label>
            <input
              type="email"
              value={userInfo.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location
            </label>
            <input
              type="text"
              value={userInfo.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Website
            </label>
            <input
              type="text"
              value={userInfo.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
            <textarea
              value={userInfo.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              disabled={!isEditing}
              rows={4}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all resize-none"
            />
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Shield className="w-6 h-6 text-green-500" />
          Security
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={userInfo.currentPassword}
                onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                placeholder="Enter current password"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
            <input
              type="password"
              value={userInfo.newPassword}
              onChange={(e) => handleInputChange("newPassword", e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
            <input
              type="password"
              value={userInfo.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm new password"
            />
          </div>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold">
            Update Password
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-gradient-to-br from-red-900 to-red-950 rounded-xl p-6 border-2 border-red-700">
        <h2 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
          <X className="w-6 h-6" />
          Danger Zone
        </h2>
        <p className="text-gray-300 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold">
          Delete Account
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-900 bg-opacity-80 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">CODE COLLAB</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Problems</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Preparation</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">About</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 bg-opacity-50 backdrop-blur-lg border-r border-gray-800 min-h-[calc(100vh-73px)] sticky top-[73px]">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === "profile"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <User className="w-5 h-5" />
              <span className="font-medium">Profile</span>
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === "settings"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </button>
            {user?.role === 'Admin' && (
              <button
                onClick={() => navigate('/admin')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all"
              >
                <Shield className="w-5 h-5" />
                <span className="font-medium">Admin Panel</span>
              </button>
            )}
          </nav>
          <div className="p-4 mt-auto border-t border-gray-800">
            <button onClick={logout} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === "profile" ? renderProfileTab() : renderSettingsTab()}
        </main>
      </div>
    </div>
  );
};

export default ProfessionalProfile;