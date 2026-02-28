import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import AdminLayout from "../../components/Admin/AdminLayout";
import { useParams } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_ENDPOINT;

const Field = ({ label, required, hint, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-slate-400 tracking-wider uppercase flex items-center gap-1">
      {label}
      {required && <span className="text-violet-400">*</span>}
    </label>
    {children}
    {hint && <p className="text-xs text-slate-500">{hint}</p>}
  </div>
);

const inputCls = `
  w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder:text-slate-500
  bg-slate-800/70 border border-slate-700/70
  focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/60
  hover:border-slate-600
  transition-all duration-200
`;

const selectCls = `
  w-full appearance-none px-4 py-2.5 rounded-xl text-sm text-white
  bg-slate-800/70 border border-slate-700/70
  focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/60
  hover:border-slate-600
  transition-all duration-200
`;

const GRADIENTS = [
  "from-violet-500 to-indigo-600",
  "from-cyan-500 to-blue-600",
  "from-emerald-500 to-teal-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-600",
];

/* ─── main component ─────────────────────────────────────────────── */

export default function AddEditUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [userId, setUserId] = useState(id);
  const [user, setUser] = useState({})
  const [formData, setFormData] = useState({
    username: user.username || "",
    email: user.email || "",
    userImage:  "",
    role: user.role || "User",
    status: user.status || "ACTIVE",
    premium: user.premium || false,
    Verified: user.Verified || false,
    isAdminCreated: true,
  });

  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  useEffect(() => {
     if (isEdit) {
         fetchUser()
     }
  }, []);

  const fetchUser = async () => {
        try {
          const response = await axios.get(`${API_URL}/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setFormData({
            username: response.data.user.username,
            email: response.data.user.email,
            role: response.data.user.role,
            status: response.data.user.status,
            premium: response.data.user.premium,
            Verified: response.data.user.Verified
          })
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
  

  /* ── handlers ──────────────────────────────────────────────────── */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  /* File upload with toast.promise */
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // validation
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5 MB.");
      return;
    }

    setImageUploading(true);

    const reader = new FileReader();

    reader.onloadend = async () => {
      try {
        const res = await axios.post(
          `${API_URL}/upload-image`,
          {
            image: reader.result, // ✅ base64
            folder: "user-profile", // optional
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        setFormData((p) => ({
          ...p,
          userImage: res.data.url,
        }));

        toast.success("Image uploaded successfully!");
      } catch (err) {
        toast.error(err?.response?.data?.message || "Image upload failed");
      } finally {
        setImageUploading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  /* Form submit */
  const handleSubmit = async () => {
    if (!formData.username.trim()) {
      toast.error("Username is required.");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required.");
      return;
    }

    setLoading(true);

    const endpoint = isEdit
      ? `${import.meta.env.VITE_API_ENDPOINT}/users/${id}`
      : `${import.meta.env.VITE_API_ENDPOINT}/register`;


    await toast.promise(
      isEdit ? axios.patch(endpoint, formData) : axios.post(endpoint, formData),
      {
        loading: isEdit ? "Updating user…" : "Creating user…",
        success: () => {
          setLoading(false);
          setTimeout(() => navigate("/admin/users"), 800);
          return isEdit
            ? "User updated successfully!"
            : "User created successfully!";
        },
        error: (err) => {
          setLoading(false);
          return (
            err?.response?.data?.message ||
            "Something went wrong. Please try again."
          );
        },
      },
    );
  };

  /* ── render ─────────────────────────────────────────────────────── */

  return (
    <AdminLayout>
      <div className="relative min-h-screen">
        {/* ambient glows */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-violet-700/8 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 rounded-full bg-blue-700/8 blur-[80px]" />

        <div className="relative max-w-6xl mx-auto space-y-6">
          {/* ── PAGE HEADER ─────────────────────────────────────────── */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-violet-500 to-blue-500" />
                <h1 className="text-xl font-bold text-white tracking-tight">
                  {isEdit ? "Edit User" : "Add New User"}
                </h1>
              </div>
              <p className="text-sm text-slate-500 pl-3.5">
                {isEdit
                  ? "Update the user's profile and account settings"
                  : "Fill in the details below to create a new user account"}
              </p>
            </div>

            <button
              onClick={() => navigate("/admin/users")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                text-slate-400 border border-slate-700/80 bg-slate-800/50
                hover:bg-slate-700/50 hover:border-slate-600 hover:text-slate-200
                transition-all duration-200"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>
          </div>

          {/* ── MAIN CARD ────────────────────────────────────────────── */}
          <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl shadow-xl backdrop-blur-sm overflow-hidden w-full">
            {/* top gradient stripe */}
            <div className="h-[2px] w-full bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400" />

            <div className="p-7 space-y-8">
              {/* ── SECTION: Profile ────────────────────────────────── */}
              <section>
                <SectionHeader title="Profile Information" />

                {/* Row 1 – Username / Email */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
                  <Field label="Username" required>
                    <input
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="e.g. john_doe"
                      className={inputCls}
                      autoComplete="off"
                    />
                  </Field>

                  <Field label="Email Address" required>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isEdit}
                      placeholder="user@example.com"
                      className={inputCls}
                      autoComplete="off"
                    />
                  </Field>

                  <Field label="UserImage">
                    <input
                      type="file"
                      name="profileImage"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className={inputCls}
                    />
                  </Field>
                </div>

                {/* Row 2 – Role / Status */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <Field label="Role" required>
                    <SelectWrapper>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className={selectCls}
                      >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                        <option value="Operator">Operator</option>
                      </select>
                    </SelectWrapper>
                  </Field>

                  <Field label="Account Status">
                    <SelectWrapper>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className={selectCls}
                      >
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                      </select>
                    </SelectWrapper>
                  </Field>
                </div>
              </section>

              {/* Divider */}
              <div className="border-t border-slate-700/50" />

              {/* ── SECTION: Account Flags ──────────────────────────── */}
              <section>
                <SectionHeader title="Account Flags" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ToggleCard
                    active={formData.premium}
                    onToggle={() =>
                      setFormData((p) => ({ ...p, premium: !p.premium }))
                    }
                    icon={formData.premium ? "⭐" : "☆"}
                    title="Premium"
                    description={
                      formData.premium
                        ? "Premium account active"
                        : "Standard account"
                    }
                    activeColor="amber"
                  />

                  <ToggleCard
                    active={formData.Verified}
                    onToggle={() =>
                      setFormData((p) => ({ ...p, Verified: !p.Verified }))
                    }
                    icon={formData.Verified ? "✓" : "○"}
                    title="Verified"
                    description={
                      formData.Verified
                        ? "Identity verified"
                        : "Not yet verified"
                    }
                    activeColor="emerald"
                  />
                </div>
              </section>
            </div>
          </div>

          {/* ── FOOTER ACTIONS ──────────────────────────────────────── */}
          <div className="flex items-center justify-between pb-8">
            <p className="text-xs text-slate-600">
              Fields marked <span className="text-violet-400">*</span> are
              required
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate("/admin/users")}
                className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-400
                  border border-slate-700/80 bg-slate-800/50
                  hover:bg-slate-700/50 hover:border-slate-600 hover:text-slate-200
                  transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || imageUploading}
                className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white
                  bg-gradient-to-r from-violet-600 to-blue-600
                  hover:from-violet-500 hover:to-blue-500
                  shadow-lg shadow-violet-500/20
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    {isEdit ? "Updating…" : "Creating…"}
                  </>
                ) : (
                  <>
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
                        d={isEdit ? "M5 13l4 4L19 7" : "M12 4v16m8-8H4"}
                      />
                    </svg>
                    {isEdit ? "Save Changes" : "Create User"}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

/* ─── sub-components ─────────────────────────────────────────────── */

function SectionHeader({ title }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-0.5 h-4 rounded-full bg-gradient-to-b from-violet-500 to-blue-500 flex-shrink-0" />
      <h2 className="text-xs font-bold text-slate-400 tracking-[0.12em] uppercase">
        {title}
      </h2>
    </div>
  );
}

function SelectWrapper({ children }) {
  return (
    <div className="relative">
      {children}
      <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500">
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
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </span>
    </div>
  );
}

const colorMap = {
  amber: {
    active: "border-amber-500/40 bg-amber-500/8 text-amber-300",
    inactive:
      "border-slate-700/70 bg-slate-800/30 text-slate-500 hover:border-slate-600",
    toggle: "bg-amber-500",
  },
  emerald: {
    active: "border-emerald-500/40 bg-emerald-500/8 text-emerald-300",
    inactive:
      "border-slate-700/70 bg-slate-800/30 text-slate-500 hover:border-slate-600",
    toggle: "bg-emerald-500",
  },
};

function ToggleCard({
  active,
  onToggle,
  icon,
  title,
  description,
  activeColor,
}) {
  const c = colorMap[activeColor];
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex items-center justify-between px-5 py-4 rounded-xl border transition-all duration-200 text-left w-full
        ${active ? c.active : c.inactive}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg leading-none">{icon}</span>
        <div>
          <p className="text-sm font-semibold leading-tight">{title}</p>
          <p className="text-xs opacity-60 mt-0.5">{description}</p>
        </div>
      </div>

      {/* pill toggle */}
      <div
        className={`w-9 h-5 rounded-full transition-colors duration-200 relative flex-shrink-0 ml-4
        ${active ? c.toggle : "bg-slate-700"}`}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200
          ${active ? "left-[18px]" : "left-0.5"}`}
        />
      </div>
    </button>
  );
}
