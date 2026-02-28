import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/userContext";
import { useTheme } from "../context/ThemeContext";
import Header from "../components/Header";
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
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_ENDPOINT;

const Profile = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();


  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
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
    user?.userImage ||
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  );
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!user) return;

    setUserInfo({
      name: user.name || "",
      username: user.username || "",
      email: user.email || "",
      bio: user.bio || "Passionate developer and problem solver",
      location: user.location || "",
      website: user.website || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      solveProblems: user.solveProblems || [],
    });

    setProfileImage(
      user.userImage ||
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    );
  }, [user]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target.result;
        setProfileImage(base64);
        updateProfilePicture(base64);
      };

      reader.readAsDataURL(file);
    }
  };

  const updateProfilePicture = async (image) => {
    try {
      if (!image) {
        // image not provided
      }

      const res = await axios.put(
        `${API_URL}/change-picture/${user._id}`,
        {image},
      );

      const message = res.data.message;

      toast.success(message);
    } catch (err) {
      console.error("the error in the uploading image is", err);
    }
  };

  const removeImage = () => {
    setProfileImage(""); // or set to a default avatar
    // Here you would typically call your backend to remove the image
    // removeProfileImage();
  };

  const [recentProblemSolve, setRecentProblemSolve] = useState([]);

  useEffect(() => {
    if (!userInfo.solveProblems?.length) {
      setRecentProblemSolve([]);
      return;
    }

    const recent = [...userInfo.solveProblems].reverse().slice(0, 3);

    setRecentProblemSolve(recent);
  }, [userInfo.solveProblems]);

  const activityData = [
    { day: "Sun", problems: [1, 1, 1] },
    { day: "Mon", problems: [2, 1] },
    { day: "Tue", problems: [3, 2, 1] },
    { day: "Wed", problems: [2, 1] },
    { day: "Thu", problems: [3, 2, 1] },
    { day: "Fri", problems: [2, 1] },
    { day: "Sat", problems: [1] },
  ];

  const sidebarItems = [
    { id: "profile", icon: User, label: "Profile" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  const handleInputChange = (field, value) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    alert("Profile information saved successfully!");
  };

  const handleChangePassword = () => {
    if (userInfo.newPassword !== userInfo.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    alert("Password changed successfully!");
    setUserInfo((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    ) {
      alert("Account deletion process initiated. You will be logged out.");
      logout();
    }
  };

  const renderProfileTab = () => (
    <div className="space-y-10 w-full max-w-6xl">
      {/* Header */}
      <div className="bg-[#111827]/40 border border-gray-800/50 rounded-xl p-8">
        <div className="flex items-start gap-6">
          <div className="relative">
            <div
              className="group relative cursor-pointer"
              onClick={handleImageClick}
            >
              <img
                src={profileImage || "/default-avatar.png"}
                alt={userInfo.name}
                className="w-24 h-24 rounded-full border-2 border-gray-700/50 group-hover:border-gray-600 transition-all"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-full">
                <span className="text-white text-xs font-medium">Edit</span>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-white mb-1">{userInfo.name}</h1>
            <p className="text-gray-400 text-sm mb-4">@{userInfo.username}</p>
            
            <div className="flex items-center gap-6 mb-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span>Member since Jan 2023</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                <span>Level 5</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-gray-500" />
                <span>Pro</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Progress to Level 6</span>
                <span className="text-gray-400">65%</span>
              </div>
              <div className="w-full bg-gray-800/60 rounded-full h-1.5">
                <div
                  className="bg-blue-600 h-1.5 rounded-full transition-all"
                  style={{ width: "65%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div>
        <h2 className="text-base font-medium text-white mb-6">Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#111827]/40 border border-gray-800/50 rounded-lg p-6 hover:border-gray-700/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <Code className="w-5 h-5 text-gray-500" />
            </div>
            <div className="text-3xl font-semibold text-white mb-1">
              {user?.solveProblems.length}
            </div>
            <div className="text-gray-500 text-sm">Problems Solved</div>
          </div>
          <div className="bg-[#111827]/40 border border-gray-800/50 rounded-lg p-6 hover:border-gray-700/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-5 h-5 text-gray-500" />
            </div>
            <div className="text-3xl font-semibold text-white mb-1">80%</div>
            <div className="text-gray-500 text-sm">Acceptance Rate</div>
          </div>
          <div className="bg-[#111827]/40 border border-gray-800/50 rounded-lg p-6 hover:border-gray-700/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-5 h-5 text-gray-500" />
            </div>
            <div className="text-3xl font-semibold text-white mb-1">156h</div>
            <div className="text-gray-500 text-sm">Coding Time</div>
          </div>
          <div className="bg-[#111827]/40 border border-gray-800/50 rounded-lg p-6 hover:border-gray-700/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-5 h-5 text-gray-500" />
            </div>
            <div className="text-3xl font-semibold text-white mb-1">92</div>
            <div className="text-gray-500 text-sm">Collaboration Score</div>
          </div>
        </div>
      </div>

      {/* 30-Day Activity */}
      <div>
        <h2 className="text-base font-medium text-white mb-6">
          Activity
        </h2>
        <div className="bg-[#111827]/40 border border-gray-800/50 rounded-lg p-6">
          <div className="flex justify-between items-end gap-3 mb-6">
            {activityData.map((day, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div className="flex flex-col gap-1">
                  {day.problems.map((level, pIndex) => (
                    <div
                      key={pIndex}
                      className={`w-3 h-3 rounded-sm ${
                        level === 1
                          ? "bg-emerald-900/60"
                          : level === 2
                          ? "bg-emerald-700/80"
                          : "bg-emerald-500"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">{day.day}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-6 text-xs text-gray-500 pt-4 border-t border-gray-800/50">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-emerald-900/60 rounded-sm"></div>
              <span>Light</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-emerald-700/80 rounded-sm"></div>
              <span>Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-sm"></div>
              <span>High</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Solved Problems */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-medium text-white">
            Recent Activity
          </h2>
          <button
            onClick={() => navigate("/problems")}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Problems
          </button>
        </div>

        <div className="bg-[#111827]/40 border border-gray-800/50 rounded-lg overflow-hidden">
          {recentProblemSolve.length > 0 ? (
            <table className="min-w-full">
              <thead className="bg-[#0a0a12]/60">
                <tr className="border-b border-gray-800/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Problem
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Difficulty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {recentProblemSolve.map((problem) => (
                  <tr key={problem.id} className="hover:bg-[#0a0a12]/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-white">{problem.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{problem.date}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-md text-xs font-medium ${
                          problem.difficulty === "EASY"
                            ? "bg-emerald-950/60 text-emerald-400 border border-emerald-900/50"
                            : problem.difficulty === "MEDIUM"
                            ? "bg-amber-950/60 text-amber-400 border border-amber-900/50"
                            : "bg-rose-950/60 text-rose-400 border border-rose-900/50"
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-400">{problem.time}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-16 text-center">
              <Code className="w-12 h-12 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-400 text-sm mb-6">Start your coding journey</p>
              <button
                onClick={() => navigate("/problems")}
                className="px-6 py-2.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Problems
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-8 w-full max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold text-white mb-2">Settings</h1>
        <p className="text-sm text-gray-500">Manage your account settings and preferences</p>
      </div>

      {/* Profile Information */}
      <div className="bg-[#111827]/40 border border-gray-800/50 rounded-lg p-6">
        <h2 className="text-base font-medium text-white mb-6">
          Profile Information
        </h2>
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={userInfo.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full px-4 py-2.5 bg-[#0a0a12]/60 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Username
              </label>
              <input
                type="text"
                value={userInfo.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className="w-full px-4 py-2.5 bg-[#0a0a12]/60 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Email
            </label>
            <input
              type="email"
              value={userInfo.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full px-4 py-2.5 bg-[#0a0a12]/60 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all"
            />
          </div>
          <div className="pt-2">
            <button
              onClick={handleSaveProfile}
              className="px-5 py-2.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-[#111827]/40 border border-gray-800/50 rounded-lg p-6">
        <h2 className="text-base font-medium text-white mb-6">
          Change Password
        </h2>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={userInfo.currentPassword}
                onChange={(e) =>
                  handleInputChange("currentPassword", e.target.value)
                }
                className="w-full px-4 py-2.5 bg-[#0a0a12]/60 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-400 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={userInfo.newPassword}
              onChange={(e) => handleInputChange("newPassword", e.target.value)}
              className="w-full px-4 py-2.5 bg-[#0a0a12]/60 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={userInfo.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              className="w-full px-4 py-2.5 bg-[#0a0a12]/60 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all"
            />
          </div>
          <div className="pt-2">
            <button
              onClick={handleChangePassword}
              className="px-5 py-2.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              Update Password
            </button>
          </div>
        </div>
      </div>

      {/* Delete Account */}
      <div className="bg-[#111827]/40 border border-rose-900/30 rounded-lg p-6">
        <h2 className="text-base font-medium text-rose-400 mb-2">Delete Account</h2>
        <p className="text-sm text-gray-400 mb-6">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        <button
          onClick={handleDeleteAccount}
          className="px-5 py-2.5 bg-rose-600/20 border border-rose-900/50 text-rose-400 text-sm rounded-lg hover:bg-rose-600/30 transition-colors"
        >
          Delete Account
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a12] to-[#2a2a4a] flex">
        {/* Sidebar */}
        <div className="w-64 bg-[#0a0a12] border-r border-gray-900/50 flex-shrink-0 sticky top-0 h-screen">
          <div className="p-6 border-b border-gray-900/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600/10 border border-blue-600/20 rounded-lg flex items-center justify-center">
                <Code className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-sm font-medium text-white">CODE COLLAB</div>
            </div>
          </div>
          <nav className="flex-1 p-4">
            <div className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                      activeTab === item.id
                        ? "bg-blue-600/10 text-blue-400 border border-blue-600/20"
                        : "text-gray-400 hover:text-gray-300 hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
              {user?.role === 'Admin' && (
                <button
                  onClick={() => navigate('/admin')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-gray-400 hover:text-gray-300 hover:bg-white/5"
                >
                  <Shield className="w-4 h-4" />
                  <span className="font-medium">Admin Panel</span>
                </button>
              )}
            </div>
          </nav>
          <div className="p-4 border-t border-gray-900/50">
            <button
              onClick={logout}
              className="w-full px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-gray-800 text-gray-300 text-sm rounded-lg transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-8 lg:p-12">
            {activeTab === "profile" ? (
              renderProfileTab()
            ) : activeTab === "settings" ? (
              renderSettingsTab()
            ) : (
              <div className="space-y-8 w-full">
                <h1 className="text-2xl font-semibold text-white">
                  {sidebarItems.find((item) => item.id === activeTab)?.label}
                </h1>
                <div className="bg-[#111827]/40 border border-gray-800/50 rounded-lg p-12 text-center">
                  <p className="text-gray-400 text-sm">
                    This section is under development
                  </p>
                  <p className="text-gray-600 text-xs mt-2">
                    Content will be available soon
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
