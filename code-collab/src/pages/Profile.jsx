import React, { useEffect, useState, useRef } from "react";
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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_ENDPOINT;

const Profile = () => {
  const { logout, user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  console.log(user);

  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
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
    solveProblems: user?.solveProblems
  });

  const [profileImage, setProfileImage] = useState(
    user?.userImage ||
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  );
  const fileInputRef = useRef(null);

  // Mock stats data - replace with real data from API


  const handleImageClick = () => {
    fileInputRef.current.click();
  };




  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
        updateProfilePicture(profileImage);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateProfilePicture = async (image) => {
    try {
      if (!image) {
        console.log("image is not provided");
      }

      const res = await axios.put(`${API_URL}/change-picture/${user._id}`, image);

      const message = res.data.message;

      alert(message);

    } catch (err) {
      console.error("the error in the uploading image is", err);
    }
  }

  const removeImage = () => {
    setProfileImage(""); // or set to a default avatar
    // Here you would typically call your backend to remove the image
    // removeProfileImage();
  };

  const [recentProblemSolve, setRecentProblemSolve] = useState([]);

  useEffect(() => {
    try {
      if (user && user.solveProblems.length !== 0) {
        const solveProblems = userInfo.solveProblems.slice().reverse().slice(0, 3);
        setRecentProblemSolve(solveProblems);
      }
    } catch (err) {
    }
  }, [user]);



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
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      alert("Account deletion process initiated. You will be logged out.");
      logout();
    }
  };

  const renderProfileTab = () => (
    <div className="space-y-8 w-full">
      {/* Header */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <div
            className="group relative cursor-pointer"
            onClick={handleImageClick}
          >
            <img
              src={profileImage || "/default-avatar.png"}
              alt={userInfo.name}
              className="w-20 h-20 rounded-full border-4 border-blue-500 group-hover:opacity-80 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-xs font-medium bg-black bg-opacity-50 px-2 py-1 rounded">
                Change
              </span>
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
            <Code className="w-3 h-3 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">{userInfo.name}</h1>
          <p className="text-blue-400">@{userInfo.username}</p>
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
          {profileImage && (
            <button
              onClick={removeImage}
              className="mt-2 text-xs text-red-400 hover:text-red-300 cursor-pointer"
            >
              Remove profile image
            </button>
          )}
        </div>
      </div>

      {/* Statistics */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-4">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{user?.solveProblems.length}</div>
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
        <h2 className="text-xl font-semibold text-white mb-4">
          30-Day Activity
        </h2>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex justify-between items-end space-x-4 mb-4">
            {activityData.map((day, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className="flex flex-col space-y-1">
                  {day.problems.map((level, pIndex) => (
                    <div
                      key={pIndex}
                      className={`w-4 h-4 rounded ${level === 1
                        ? "bg-green-400"
                        : level === 2
                          ? "bg-green-500"
                          : "bg-green-600"
                        }`}
                    />
                  ))}
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">
            Recent Solved Problems
          </h2>
          <button
            onClick={() => navigate("/problems")}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
          >
            Solve Problems
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-x-auto">
          {recentProblemSolve.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gradient-to-r from-blue-600 to-cyan-600">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Problem
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Difficulty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {recentProblemSolve.map((problem) => (
                  <tr key={problem.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                      {problem._id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white font-medium">
                      {problem.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${problem.difficulty === "EASY"
                          ? "bg-green-900 text-green-300"
                          : problem.difficulty === "MEDIUM"
                            ? "bg-orange-900 text-orange-300"
                            : "bg-red-900 text-red-300"
                          }`}
                      >
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                      {problem.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                      {problem.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-400 mb-4">No problems solved yet</p>
              <button
                onClick={() => navigate("/problems")}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
              >
                Start Solving Problems
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-8 w-full">
      <h1 className="text-3xl font-bold text-white">Settings</h1>

      {/* Profile Information */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">
          Profile Information
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={userInfo.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                value={userInfo.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={userInfo.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
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
        <h2 className="text-xl font-semibold text-white mb-4">
          Change Password
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={userInfo.currentPassword}
                onChange={(e) =>
                  handleInputChange("currentPassword", e.target.value)
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
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
            <label className="block text-sm font-medium text-gray-300 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={userInfo.newPassword}
              onChange={(e) => handleInputChange("newPassword", e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={userInfo.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
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
            Once you delete your account, there is no going back. Please be
            certain.
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

  return (
    <>
      <Header />
      <div className="min-h-[91.1vh] bg-gradient-to-b from-[#0a0a12] to-[#2a2a4a] flex">
        {/* Sidebar - Fixed to left edge */}
        <div className="w-64 bg-[#0a0a12] border-r border-gray-700 flex-shrink-0 sticky top-0 h-screen z-10">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold">CODE COLLAB</div>
              </div>
            </div>
          </div>
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === item.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
          <div className="p-4 border-t border-gray-700">
            <button
              onClick={logout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#6e44ff] to-[#1cb8ff] text-white rounded-lg hover:shadow-[0_0_15px_rgba(110,68,255,0.5)] transition duration-300"
            >
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content - Takes remaining space */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === "profile" ? (
            renderProfileTab()
          ) : activeTab === "settings" ? (
            renderSettingsTab()
          ) : (
            <div className="space-y-8 w-full">
              <h1 className="text-3xl font-bold text-white">
                {sidebarItems.find((item) => item.id === activeTab)?.label}
              </h1>
              <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
                <p className="text-gray-400 text-lg">
                  This section is under development
                </p>
                <p className="text-gray-500 mt-2">
                  Content will be available soon
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
