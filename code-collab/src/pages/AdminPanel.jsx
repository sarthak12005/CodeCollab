import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Code,
  Settings,
  LogOut,
  Shield,
  Search,
  MoreVertical,
  UserCheck,
  UserX,
  Edit,
  Trash2,
  Plus,
  Filter,
  Download,
  X,
} from "lucide-react";
import { useAuth } from "../context/userContext";
import Header from "../components/Header";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_ENDPOINT;

const AdminPanel = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserModal, setShowUserModal] = useState(false);
  const [showProblemModal, setShowProblemModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editingProblem, setEditingProblem] = useState(null);
  const [userFormData, setUserFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "User",
    status: "Active",
  });
  const [problemFormData, setProblemFormData] = useState({
    title: "",
    description: "",
    difficulty: "Easy",
    tags: [],
    companies: [],
    constraints: [],
    examples: [],
    testCases: [],
    hints: [],
    solution: {
      approach: "",
      timeComplexity: "",
      spaceComplexity: "",
      code: {
        python: "",
        javascript: "",
        cpp: "",
        java: ""
      }
    }
  });

  // Dummy user data
  const dummyUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "User", status: "Active", joined: "2024-01-15", problemsSolved: 45 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active", joined: "2024-02-20", problemsSolved: 78 },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "Admin", status: "Active", joined: "2023-12-10", problemsSolved: 120 },
    { id: 4, name: "Sarah Williams", email: "sarah@example.com", role: "User", status: "Inactive", joined: "2024-03-05", problemsSolved: 23 },
    { id: 5, name: "David Brown", email: "david@example.com", role: "User", status: "Active", joined: "2024-01-28", problemsSolved: 67 },
  ];

  // Dummy problem data
  const dummyProblems = [
    { id: 1, title: "Two Sum", difficulty: "Easy", category: "Array", submissions: 1234, acceptanceRate: 89, status: "Published" },
    { id: 2, title: "Add Two Numbers", difficulty: "Medium", category: "Linked List", submissions: 987, acceptanceRate: 76, status: "Published" },
    { id: 3, title: "Longest Substring", difficulty: "Medium", category: "String", submissions: 2341, acceptanceRate: 67, status: "Published" },
    { id: 4, title: "Median of Arrays", difficulty: "Hard", category: "Array", submissions: 456, acceptanceRate: 45, status: "Draft" },
    { id: 5, title: "Regular Expression", difficulty: "Hard", category: "String", submissions: 789, acceptanceRate: 38, status: "Published" },
  ];

  const sidebarItems = [
    { id: "users", icon: Users, label: "User Management" },
    { id: "problems", icon: Code, label: "Problem Management" },
    { id: "tab3", icon: Settings, label: "Tab 3" },
    { id: "tab4", icon: Shield, label: "Tab 4" },
  ];

  // User Management Functions
  const handleAddUser = () => {
    setEditingUser(null);
    setUserFormData({
      name: "",
      username: "",
      email: "",
      password: "",
      role: "User",
      status: "Active",
    });
    setShowUserModal(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUserFormData({
      name: user.name,
      username: user.username,
      email: user.email,
      password: "",
      role: user.role,
      status: user.status,
    });
    setShowUserModal(true);
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    try {
      // Note: Delete user API needs to be created in backend
      toast.error("Delete user API not implemented in backend yet");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem("token");
      
      if (editingUser) {
        // Update user - using editProfile endpoint
        await axios.put(
          `${API_URL}/editProfile`,
          userFormData,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        toast.success("User updated successfully");
      } else {
        // Add new user - using addUser endpoint
        await axios.post(
          `${API_URL}/addUser`,
          {
            username: userFormData.username,
            email: userFormData.email,
            password: userFormData.password,
            name: userFormData.name,
          }
        );
        toast.success("User created successfully");
      }
      
      setShowUserModal(false);
      // Refresh user list here
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save user");
    }
  };

  // Problem Management Functions
  const handleAddProblem = () => {
    setEditingProblem(null);
    setProblemFormData({
      title: "",
      description: "",
      difficulty: "Easy",
      tags: [],
      companies: [],
      constraints: [],
      examples: [],
      testCases: [],
      hints: [],
      solution: {
        approach: "",
        timeComplexity: "",
        spaceComplexity: "",
        code: {
          python: "",
          javascript: "",
          cpp: "",
          java: ""
        }
      }
    });
    setShowProblemModal(true);
  };

  const handleEditProblem = (problem) => {
    setEditingProblem(problem);
    setProblemFormData(problem);
    setShowProblemModal(true);
  };

  const handleDeleteProblem = async (problemId) => {
    if (!window.confirm("Are you sure you want to delete this problem?")) return;
    
    try {
      const token = localStorage.getItem("token");
      await axios.get(
        `${API_URL}/problem/delete-problem/${problemId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      toast.success("Problem deleted successfully");
      // Refresh problem list here
    } catch (error) {
      toast.error("Failed to delete problem");
    }
  };

  const handleProblemSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem("token");
      
      await axios.post(
        `${API_URL}/problem/add-problem`,
        problemFormData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      toast.success(editingProblem ? "Problem updated successfully" : "Problem created successfully");
      setShowProblemModal(false);
      // Refresh problem list here
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save problem");
    }
  };

  const renderUserManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-2">User Management</h1>
          <p className="text-sm text-gray-400">Manage all registered users</p>
        </div>
        <button 
          onClick={handleAddUser}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#111827]/40 border border-gray-800/50 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#111827]/40 border border-gray-800/50 text-gray-400 text-sm rounded-lg hover:border-gray-700/50 transition-colors">
          <Filter className="w-4 h-4" />
          Filters
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#111827]/40 border border-gray-800/50 text-gray-400 text-sm rounded-lg hover:border-gray-700/50 transition-colors">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#111827]/40 border border-gray-800/50 rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-semibold text-white mb-1">1,234</div>
          <div className="text-xs text-gray-500">Total Users</div>
        </div>
        <div className="bg-[#111827]/40 border border-gray-800/50 rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <UserCheck className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-2xl font-semibold text-white mb-1">1,089</div>
          <div className="text-xs text-gray-500">Active Users</div>
        </div>
        <div className="bg-[#111827]/40 border border-gray-800/50 rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <UserX className="w-5 h-5 text-gray-500" />
          </div>
          <div className="text-2xl font-semibold text-white mb-1">145</div>
          <div className="text-xs text-gray-500">Inactive Users</div>
        </div>
        <div className="bg-[#111827]/40 border border-gray-800/50 rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <Shield className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl font-semibold text-white mb-1">12</div>
          <div className="text-xs text-gray-500">Admin Users</div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#111827]/40 border border-gray-800/50 rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-[#0a0a12]/60">
            <tr className="border-b border-gray-800/50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Problems Solved</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {dummyUsers.map((user) => (
              <tr key={user.id} className="hover:bg-[#0a0a12]/40 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-white">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-medium ${
                    user.role === "Admin" 
                      ? "bg-amber-950/60 text-amber-400 border border-amber-900/50"
                      : "bg-blue-950/60 text-blue-400 border border-blue-900/50"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-medium ${
                    user.status === "Active"
                      ? "bg-emerald-950/60 text-emerald-400 border border-emerald-900/50"
                      : "bg-gray-800/60 text-gray-400 border border-gray-700/50"
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">{user.problemsSolved}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{user.joined}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleEditUser(user)}
                      className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-950/30 rounded transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-1.5 text-gray-400 hover:text-rose-400 hover:bg-rose-950/30 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-300 hover:bg-gray-800/50 rounded transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProblemManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-2">Problem Management</h1>
          <p className="text-sm text-gray-400">Manage all coding problems</p>
        </div>
        <button 
          onClick={handleAddProblem}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Problem
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search problems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#111827]/40 border border-gray-800/50 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#111827]/40 border border-gray-800/50 text-gray-400 text-sm rounded-lg hover:border-gray-700/50 transition-colors">
          <Filter className="w-4 h-4" />
          Filters
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#111827]/40 border border-gray-800/50 text-gray-400 text-sm rounded-lg hover:border-gray-700/50 transition-colors">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#111827]/40 border border-gray-800/50 rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <Code className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-semibold text-white mb-1">456</div>
          <div className="text-xs text-gray-500">Total Problems</div>
        </div>
        <div className="bg-[#111827]/40 border border-gray-800/50 rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-5 h-5 rounded-sm bg-emerald-500/20 flex items-center justify-center">
              <div className="w-2 h-2 bg-emerald-500 rounded-sm"></div>
            </div>
          </div>
          <div className="text-2xl font-semibold text-white mb-1">189</div>
          <div className="text-xs text-gray-500">Easy</div>
        </div>
        <div className="bg-[#111827]/40 border border-gray-800/50 rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-5 h-5 rounded-sm bg-amber-500/20 flex items-center justify-center">
              <div className="w-2 h-2 bg-amber-500 rounded-sm"></div>
            </div>
          </div>
          <div className="text-2xl font-semibold text-white mb-1">198</div>
          <div className="text-xs text-gray-500">Medium</div>
        </div>
        <div className="bg-[#111827]/40 border border-gray-800/50 rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-5 h-5 rounded-sm bg-rose-500/20 flex items-center justify-center">
              <div className="w-2 h-2 bg-rose-500 rounded-sm"></div>
            </div>
          </div>
          <div className="text-2xl font-semibold text-white mb-1">69</div>
          <div className="text-xs text-gray-500">Hard</div>
        </div>
      </div>

      {/* Problems Table */}
      <div className="bg-[#111827]/40 border border-gray-800/50 rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-[#0a0a12]/60">
            <tr className="border-b border-gray-800/50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Problem</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Difficulty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submissions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acceptance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {dummyProblems.map((problem) => (
              <tr key={problem.id} className="hover:bg-[#0a0a12]/40 transition-colors">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-white">{problem.title}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-medium ${
                    problem.difficulty === "Easy"
                      ? "bg-emerald-950/60 text-emerald-400 border border-emerald-900/50"
                      : problem.difficulty === "Medium"
                      ? "bg-amber-950/60 text-amber-400 border border-amber-900/50"
                      : "bg-rose-950/60 text-rose-400 border border-rose-900/50"
                  }`}>
                    {problem.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">{problem.category}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{problem.submissions.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{problem.acceptanceRate}%</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-medium ${
                    problem.status === "Published"
                      ? "bg-emerald-950/60 text-emerald-400 border border-emerald-900/50"
                      : "bg-gray-800/60 text-gray-400 border border-gray-700/50"
                  }`}>
                    {problem.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleEditProblem(problem)}
                      className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-950/30 rounded transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteProblem(problem.id)}
                      className="p-1.5 text-gray-400 hover:text-rose-400 hover:bg-rose-950/30 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-300 hover:bg-gray-800/50 rounded transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPlaceholderTab = (tabName) => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white mb-2">{tabName}</h1>
        <p className="text-sm text-gray-400">This section is under development</p>
      </div>
      <div className="bg-[#111827]/40 border border-gray-800/50 rounded-lg p-16 text-center">
        <Shield className="w-16 h-16 text-gray-700 mx-auto mb-4" />
        <p className="text-gray-400 text-sm">Coming soon...</p>
      </div>
    </div>
  );

  // User Modal Component
  const UserModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#111827] border border-gray-800/50 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-800/50">
          <h2 className="text-xl font-semibold text-white">
            {editingUser ? "Edit User" : "Add New User"}
          </h2>
          <button
            onClick={() => setShowUserModal(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleUserSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter first name"
                value={userFormData.name}
                onChange={(e) => setUserFormData({...userFormData, name: e.target.value})}
                className="w-full px-4 py-2.5 bg-[#0a0a12]/60 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter username"
                value={userFormData.username}
                onChange={(e) => setUserFormData({...userFormData, username: e.target.value})}
                className="w-full px-4 py-2.5 bg-[#0a0a12]/60 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="user@email.com"
              value={userFormData.email}
              onChange={(e) => setUserFormData({...userFormData, email: e.target.value})}
              className="w-full px-4 py-2.5 bg-[#0a0a12]/60 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                value={userFormData.role}
                onChange={(e) => setUserFormData({...userFormData, role: e.target.value})}
                className="w-full px-4 py-2.5 bg-[#0a0a12]/60 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                value={userFormData.status}
                onChange={(e) => setUserFormData({...userFormData, status: e.target.value})}
                className="w-full px-4 py-2.5 bg-[#0a0a12]/60 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password {!editingUser && <span className="text-red-500">*</span>}
            </label>
            <input
              type="password"
              placeholder={editingUser ? "Leave blank to keep current password" : "Enter password"}
              value={userFormData.password}
              onChange={(e) => setUserFormData({...userFormData, password: e.target.value})}
              className="w-full px-4 py-2.5 bg-[#0a0a12]/60 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
              required={!editingUser}
            />
            <p className="text-xs text-gray-500 mt-2">
              {editingUser ? "Password will be auto-generated if left blank" : "Password will be auto-generated if left blank"}
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800/50">
            <button
              type="button"
              onClick={() => setShowUserModal(false)}
              className="px-5 py-2.5 bg-[#0a0a12]/60 border border-gray-800 text-gray-300 text-sm rounded-lg hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingUser ? "Update User" : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Problem Modal Component  
  const ProblemModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#111827] border border-gray-800/50 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-800/50">
          <h2 className="text-xl font-semibold text-white">
            {editingProblem ? "Edit Problem" : "Add New Problem"}
          </h2>
          <button
            onClick={() => setShowProblemModal(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleProblemSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Problem Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter problem title"
              value={problemFormData.title}
              onChange={(e) => setProblemFormData({...problemFormData, title: e.target.value})}
              className="w-full px-4 py-2.5 bg-[#0a0a12]/60 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Enter problem description"
              value={problemFormData.description}
              onChange={(e) => setProblemFormData({...problemFormData, description: e.target.value})}
              rows={4}
              className="w-full px-4 py-2.5 bg-[#0a0a12]/60 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Difficulty <span className="text-red-500">*</span>
              </label>
              <select
                value={problemFormData.difficulty}
                onChange={(e) => setProblemFormData({...problemFormData, difficulty: e.target.value})}
                className="w-full px-4 py-2.5 bg-[#0a0a12]/60 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                required
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Array, String"
                value={problemFormData.tags?.join(", ") || ""}
                onChange={(e) => setProblemFormData({...problemFormData, tags: e.target.value.split(",").map(t => t.trim())})}
                className="w-full px-4 py-2.5 bg-[#0a0a12]/60 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Companies
              </label>
              <input
                type="text"
                placeholder="e.g., Google, Amazon"
                value={problemFormData.companies?.join(", ") || ""}
                onChange={(e) => setProblemFormData({...problemFormData, companies: e.target.value.split(",").map(c => c.trim())})}
                className="w-full px-4 py-2.5 bg-[#0a0a12]/60 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Test Cases (JSON format) <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder='[{"input": {...}, "output": {...}}]'
              value={JSON.stringify(problemFormData.testCases, null, 2)}
              onChange={(e) => {
                try {
                  setProblemFormData({...problemFormData, testCases: JSON.parse(e.target.value)});
                } catch (err) {
                  // Handle JSON parse error
                }
              }}
              rows={4}
              className="w-full px-4 py-2.5 bg-[#0a0a12]/60 border border-gray-800 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 resize-none"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800/50">
            <button
              type="button"
              onClick={() => setShowProblemModal(false)}
              className="px-5 py-2.5 bg-[#0a0a12]/60 border border-gray-800 text-gray-300 text-sm rounded-lg hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingProblem ? "Update Problem" : "Create Problem"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      {showUserModal && <UserModal />}
      {showProblemModal && <ProblemModal />}
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a12] to-[#2a2a4a] flex">
        {/* Sidebar */}
        <div className="w-64 bg-[#0a0a12] border-r border-gray-900/50 flex-shrink-0 sticky top-0 h-screen">
          <div className="p-6 border-b border-gray-900/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600/10 border border-blue-600/20 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-sm font-medium text-white">Admin Panel</div>
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
            </div>
          </nav>
          <div className="p-4 border-t border-gray-900/50 space-y-2">
            <button
              onClick={() => navigate('/profile')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-gray-400 hover:text-gray-300 hover:bg-white/5"
            >
              <Settings className="w-4 h-4" />
              <span className="font-medium">Back to Profile</span>
            </button>
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
            {activeTab === "users" && renderUserManagement()}
            {activeTab === "problems" && renderProblemManagement()}
            {activeTab === "tab3" && renderPlaceholderTab("Tab 3")}
            {activeTab === "tab4" && renderPlaceholderTab("Tab 4")}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
