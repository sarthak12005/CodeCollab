import { useEffect, useState } from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_ENDPOINT;

/* ── avatar helpers ─────────────────────────────────────────────────────── */
const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");
const avatarGradients = [
  "from-violet-500 to-indigo-600",
  "from-blue-500 to-cyan-600",
  "from-emerald-500 to-teal-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-600",
];
const pickGradient = (name) =>
  avatarGradients[(name?.charCodeAt(0) ?? 0) % avatarGradients.length];

/* ── shared input class ─────────────────────────────────────────────────── */
const inputCls =
  "w-full bg-slate-800/60 border border-slate-700 text-slate-100 placeholder-slate-500 " +
  "rounded-lg px-4 py-2.5 text-sm outline-none transition-all duration-200 " +
  "focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 hover:border-slate-600";

const selectCls = inputCls + " cursor-pointer appearance-none";

/* ── field label wrapper ────────────────────────────────────────────────── */
const Field = ({ label, required, children, className = "" }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    <label className="text-xs font-semibold tracking-widest uppercase text-slate-400">
      {label}
      {required && <span className="text-violet-400 ml-1">*</span>}
    </label>
    {children}
  </div>
);

/* ══════════════════════════════════════════════════════════════════════════ */

const AddEditUser = () => {
  const navigate   = useNavigate();
  const { userId } = useParams();
  const isEdit     = Boolean(userId);

  const [loading, setLoading]   = useState(false);
  const [formData, setFormData] = useState({
    username:  "",
    email:     "",
    userImage: "",
    role:      "User",
    premium:   false,
    verified:  false,
    status:    "ACTIVE",
  });

  useEffect(() => {
    if (isEdit) fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${API_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const d = res.data.data;
      setFormData({
        username:  d.username  ?? "",
        email:     d.email     ?? "",
        userImage: d.userImage ?? "",
        role:      d.role      ?? "User",
        premium:   d.premium   ?? false,
        verified:  d.verified  ?? false,
        status:    d.status    ?? "ACTIVE",
      });
    } catch {
      toast.error("Failed to fetch user");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.username.trim()) return toast.error("Username is required");
    if (!formData.email.trim())    return toast.error("Email is required");

    try {
      setLoading(true);
      const url    = isEdit ? `${API_URL}/users/${userId}` : `${API_URL}/users`;
      const method = isEdit ? "patch" : "post";

      await axios({
        method, url, data: formData,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      toast.success(`User ${isEdit ? "updated" : "created"} successfully`);
      navigate("/admin/users");
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  /* derived */
  const hasImage = formData.userImage.trim().length > 0;
  const gradient = pickGradient(formData.username);
  const initial  = getInitial(formData.username);

  return (
    <AdminLayout>
      <div className="relative min-h-screen">

        {/* ambient glows */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-100 h-100 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="relative max-w-8xl mx-auto space-y-6">

          {/* ── PAGE HEADER — title left, Back button right ─────────────── */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                {isEdit ? "Edit User" : "Add User"}
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                {isEdit
                  ? "Update the user's information below"
                  : "Enter user details to create a new account"}
              </p>
            </div>

            {/* Back button — top right (matches screenshot) */}
            <button
              onClick={() => navigate("/admin/users")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                text-slate-300 border border-slate-700 bg-slate-800/60
                hover:bg-slate-700/60 hover:border-slate-500 hover:text-white
                transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to User Management
            </button>
          </div>

          {/* ── MAIN CARD ───────────────────────────────────────────────── */}
          <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl shadow-2xl backdrop-blur-sm overflow-hidden">

            {/* top accent stripe */}
            <div className="h-1 w-full bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-500" />

            <div className="p-8 space-y-10">

              {/* ── SECTION 1: Personal Information ─────────────────────── */}
              <div>
                {/* section label with left bar — matches the card section style in screenshot */}
                <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-700/60">
                  <div className="w-1 h-5 rounded-full bg-gradient-to-b from-violet-500 to-blue-500 flex-shrink-0" />
                  <h2 className="text-sm font-semibold text-slate-200 tracking-widest uppercase">
                    Personal Information
                  </h2>
                  {/* live avatar preview — tucked right in section header */}
                  <div className="ml-auto">
                    {hasImage ? (
                      <img
                        src={formData.userImage} alt="preview"
                        className="w-10 h-10 rounded-full object-cover border-2 border-violet-500/50 shadow shadow-violet-500/20"
                      />
                    ) : (
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient}
                        flex items-center justify-center text-sm font-bold text-white
                        border-2 border-violet-500/30`}>
                        {initial}
                      </div>
                    )}
                  </div>
                </div>

                {/* Row 1: Username · Email · Profile Image URL (3 cols) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
                  <Field label="Username" required>
                    <input
                      name="username" value={formData.username}
                      onChange={handleChange} placeholder="e.g. john_doe"
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Email ID" required>
                    <input
                      name="email" type="email" value={formData.email}
                      onChange={handleChange} placeholder="user@example.com"
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Profile Image URL">
                    <input
                      name="userImage" value={formData.userImage}
                      onChange={handleChange}
                      placeholder="https://example.com/avatar.jpg"
                      className={inputCls}
                    />
                  </Field>
                </div>

                {/* Row 2: Role · Status (2 cols — mirrors "Entity Name / User Type" row) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="User Type / Role" required>
                    <div className="relative">
                      <select
                        name="role" value={formData.role}
                        onChange={handleChange} className={selectCls}
                      >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                        <option value="Operator">Operator</option>
                      </select>
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </div>
                  </Field>

                  <Field label="Status">
                    <div className="relative">
                      <select
                        name="status" value={formData.status}
                        onChange={handleChange} className={selectCls}
                      >
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                      </select>
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </div>
                  </Field>
                </div>
              </div>

              {/* ── SECTION 2: Account Settings ──────────────────────────── */}
              <div>
                <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-700/60">
                  <div className="w-1 h-5 rounded-full bg-gradient-to-b from-violet-500 to-blue-500 flex-shrink-0" />
                  <h2 className="text-sm font-semibold text-slate-200 tracking-widest uppercase">
                    Account Settings
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  {/* Premium toggle */}
                  <button
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, premium: !p.premium }))}
                    className={`flex items-center justify-between px-5 py-4 rounded-xl border transition-all duration-200 text-left
                      ${formData.premium
                        ? "border-amber-500/50 bg-amber-500/10 text-amber-300"
                        : "border-slate-700 bg-slate-800/40 text-slate-400 hover:border-slate-600"}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{formData.premium ? "⭐" : "☆"}</span>
                      <div>
                        <p className="text-sm font-semibold">Premium</p>
                        <p className="text-xs opacity-70">
                          {formData.premium ? "Premium account" : "Standard account"}
                        </p>
                      </div>
                    </div>
                    <div className={`w-10 h-5 rounded-full transition-colors duration-200 relative flex-shrink-0
                      ${formData.premium ? "bg-amber-500" : "bg-slate-600"}`}>
                      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200
                        ${formData.premium ? "left-5" : "left-0.5"}`} />
                    </div>
                  </button>

                  {/* Verified toggle */}
                  <button
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, verified: !p.verified }))}
                    className={`flex items-center justify-between px-5 py-4 rounded-xl border transition-all duration-200 text-left
                      ${formData.verified
                        ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                        : "border-slate-700 bg-slate-800/40 text-slate-400 hover:border-slate-600"}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{formData.verified ? "✓" : "○"}</span>
                      <div>
                        <p className="text-sm font-semibold">Verified</p>
                        <p className="text-xs opacity-70">
                          {formData.verified ? "Identity verified" : "Not verified"}
                        </p>
                      </div>
                    </div>
                    <div className={`w-10 h-5 rounded-full transition-colors duration-200 relative flex-shrink-0
                      ${formData.verified ? "bg-emerald-500" : "bg-slate-600"}`}>
                      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200
                        ${formData.verified ? "left-5" : "left-0.5"}`} />
                    </div>
                  </button>

                </div>
              </div>

            </div>{/* /card body */}
          </div>{/* /card */}

          {/* ── ACTION BUTTONS — bottom right (matches screenshot) ───────── */}
          <div className="flex justify-end gap-3 pb-8">
            <button
              onClick={() => navigate("/admin/users")}
              className="px-6 py-2.5 rounded-lg text-sm font-medium text-slate-300
                border border-slate-700 bg-slate-800/60
                hover:bg-slate-700/60 hover:border-slate-500 hover:text-white
                transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-7 py-2.5 rounded-lg text-sm font-semibold text-white
                bg-gradient-to-r from-violet-600 to-blue-600
                hover:from-violet-500 hover:to-blue-500
                shadow-lg shadow-violet-500/25
                disabled:opacity-60 disabled:cursor-not-allowed
                transition-all duration-200 flex items-center gap-2"
            >
              {loading && (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10"
                    stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              )}
              {loading ? "Saving..." : isEdit ? "Update User" : "Add"}
            </button>
          </div>

        </div>{/* /max-w wrapper */}
      </div>
    </AdminLayout>
  );
};

export default AddEditUser;