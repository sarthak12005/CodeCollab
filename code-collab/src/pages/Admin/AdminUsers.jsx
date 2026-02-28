import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import { LoadingSpinner } from "../../components/Admin/Common/LoadingSpinner";
import { Pagination } from "../../components/Admin/Common/Pagination";
import { ConfirmationModal } from "../../components/Admin/Common/ConfirmationModal";
import axios from "axios";
import { formatDate } from "../../utils/helper";
import toast from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_ENDPOINT;

const AdminUsers = () => {
  const {theme} = useTheme();
  const [users, setUsers] = useState({
    data: [],
    pagination: {
      total: 0,
      totalPages: 1,
      page: 1,
      limit: 5,
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  // ── 4 separate filter states ──────────────────────────────────────────────
  const [searchUsername, setSearchUsername] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  // ─────────────────────────────────────────────────────────────────────────

  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const itemsPerPage = 5;

  // Re-fetch whenever any filter or page changes
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchUsers();
    }, 500); // ⏱ debounce delay (300–500ms ideal)

    return () => clearTimeout(debounceTimer);
  }, [currentPage, searchUsername, searchEmail, filterRole, filterStatus]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);

      const result = await axios.get(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          page: currentPage,
          limit: itemsPerPage,
          username: searchUsername || undefined,
          email: searchEmail || undefined,
          status: filterStatus || undefined,
        },
      });

      console.log(result.data.data);

      setUsers(result.data);
    } catch (error) {
      console.error("Fetch users error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset to page 1 when any filter changes
  const handleUsernameChange = (val) => {
    setSearchUsername(val);
    setCurrentPage(1);
  };
  const handleEmailChange = (val) => {
    setSearchEmail(val);
    setCurrentPage(1);
  };
  const handleStatusChange = (val) => {
    setFilterStatus(val);
    setCurrentPage(1);
  };

  const handleAddUser = () => {
    setFormData({ username: "", email: "" });
    setShowAddForm(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFormData(user);
    setShowAddForm(true);
  };

  const handleSaveUser = async () => {
    try {
      // ---------------------------
      // ADD NEW USER (REGISTER)
      // ---------------------------
      if (!formData.username || !formData.email) {
        alert("All fields are required");
        return;
      }

      await axios.post(
        `${API_URL}/register`,
        {
          username: formData.username,
          email: formData.email,
          isAdminCreated: true,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      // ✅ Refresh users from backend
      await fetchUsers();

      // ✅ Reset UI
      setShowAddForm(false);
      setFormData({
        username: "",
        email: "",
        role: "user",
      });
    } catch (error) {
      console.error("Add user error:", error);
      alert(error.response?.data?.message || "Failed to create user");
    } finally {
      setSelectedUser(null);
    }
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser?._id) {
      toast.error("Invalid user selected");
      return;
    }

    try {
      // Call backend API
      await axios.delete(`${API_URL}/users/${selectedUser._id}`);

      // Update UI after successful delete
      setUsers((prev) => ({
        ...prev,
        data: prev.data.filter((u) => u._id !== selectedUser._id),
      }));

      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Delete user error:", error);
      toast.error(error.response?.data?.message || "Failed to delete user");
    } finally {
      setShowModal(false);
      setSelectedUser(null);
    }
  };
  if (isLoading) {
    return (
      <AdminLayout>
        <LoadingSpinner size="lg" text="Loading Users..." />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">User Management</h1>
            <p className="text-gray-300 mt-1">
              Manage system users and their roles
            </p>
          </div>
          <button
            onClick={() => navigate('/admin/users/add')}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
          >
            + Add New User
          </button>
        </div>

        {/* ── 4-Filter Row ─────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-3">
          {/* Search by Username */}
          <div className="relative flex-1 min-w-[160px]">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search by username..."
              value={searchUsername}
              onChange={(e) => handleUsernameChange(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg border text-white border-gray-300 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Search by Email */}
          <div className="relative flex-1 min-w-[160px]">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search by email..."
              value={searchEmail}
              onChange={(e) => handleEmailChange(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 placeholder-gray-400 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Role Dropdown
          <select
            value={filterRole}
            onChange={(e) => handleRoleChange(e.target.value)}
            className="px-3 py-2 rounded-lg border placeholder-gray-400 text-white border-gray-300 text-sm  focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[130px]"
          >
            <option className="bg-black" value="">All Roles</option>
            <option className="bg-black" value="Admin">Admin</option>
            <option className="bg-black" value="User">User</option>
          </select> */}

          {/* Status Dropdown */}
          <select
            value={filterStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 placeholder-gray-400 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[130px]"
          >
            <option className="bg-black" value="">
              All Status
            </option>
            <option className="bg-black" value="ACTIVE">
              Active
            </option>
            <option className="bg-black" value="INACTIVE">
              Inactive
            </option>
          </select>
        </div>
        {/* ─────────────────────────────────────────────────────────────────── */}

        {/* Users Table */}
        <div
          className={`${theme.bg.secondary} rounded-xl border ${theme.border.primary} shadow-sm overflow-hidden`}
        >
          <table className="w-full border-collapse">
            {/* TABLE HEADER */}
            <thead
              className={`text-xs uppercase tracking-wide ${theme.text.muted} bg-opacity-60 ${theme.bg.primary}`}
            >
              <tr>
                <th className="px-6 py-4 text-left text-white font-semibold">User</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Email</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Role</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Joined</th>
                <th className="px-6 py-4 text-right text-white font-semibold">Actions</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {users?.data.map((user, index) => (
                <tr
                  key={user._id}
                  className={`
            border-t ${theme.border.primary}
            transition-all duration-150
            hover:${theme.bg.primary}
          `}
                >
                  {/* USER */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm ${theme.button.primary}`}
                      >
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className={`${theme.text.primary} font-medium`}>
                          {user.username}
                        </p>
                        <p className="text-xs text-gray-400">
                          ID: {user._id.slice(-6)}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* EMAIL */}
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {user.email}
                  </td>

                  {/* ROLE */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                ${
                  user.role === "Admin"
                    ? "bg-red-500/10 text-red-400 border border-red-500/20"
                    : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                ${
                  user.status === "ACTIVE"
                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                    : "bg-gray-500/10 text-gray-400 border border-gray-500/20"
                }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  {/* JOINED */}
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {formatDate(user.createdAt)}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="px-3 py-1.5 rounded-md text-xs font-medium
                  bg-blue-500/10 text-blue-400
                  hover:bg-blue-500/20 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="px-3 py-1.5 rounded-md text-xs font-medium
                  bg-red-500/10 text-red-400
                  hover:bg-red-500/20 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={users.pagination.totalPages || 0}
          totalItems={users.pagination.total || 0}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />

        {/* Add/Edit Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                {selectedUser ? "Edit User" : "Add New User"}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email"
                  />
                </div>
              </div>
              <div className="flex gap-3 justify-end mt-6">
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setSelectedUser(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveUser}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Save User
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          isOpen={showModal}
          title="Delete User"
          message={`Are you sure you want to delete ${selectedUser?.username}? This action cannot be undone.`}
          onConfirm={confirmDelete}
          onCancel={() => setShowModal(false)}
          isDanger={true}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
