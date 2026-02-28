import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";
import useDeviceDetection from "../hooks/useDeviceDetection";
import { FaArrowLeftLong } from "react-icons/fa6";

const API_URL = import.meta.env.VITE_API_ENDPOINT;

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const deviceInfo = useDeviceDetection();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      return toast.error("All fields are required");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (!token) {
      return toast.error("Invalid or missing reset token");
    }

    try {
      setLoading(true);

      await axios.post(`${API_URL}/reset-password`, {
        token,
        newPassword: password
      });

      toast.success("Password reset successful! Please login.");
      navigate("/login", { replace: true });

    } catch (err) {
      toast.error(err.response?.data?.message || "Reset password failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen ${theme.bg.primary} flex items-center justify-center relative overflow-hidden mobile-padding`}
    >
      {/* Back Button */}
      <div
        className={`absolute top-4 left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full cursor-pointer ${theme.button.primary} flex items-center justify-center text-white z-10`}
        onClick={() => navigate("/login")}
      >
        <FaArrowLeftLong size={deviceInfo.isMobile ? 18 : 20} />
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600 bg-opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-600 bg-opacity-20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Card */}
      <div className="w-full max-w-md mx-auto px-4 relative z-10">
        <div
          className={`${theme.bg.secondary} bg-opacity-90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border ${theme.border.primary} ${theme.shadow.lg}`}
        >
          <h2
            className={`text-xl sm:text-2xl font-bold ${theme.text.primary} mb-6 text-center`}
          >
            Reset Your Password
          </h2>

          <p className="text-gray-400 text-sm text-center mb-6">
            Enter your new password below
          </p>

          <div className="space-y-5">
            {/* New Password */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="••••••••"
                />
                <div className="absolute left-3 top-3 text-gray-400">🔒</div>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleResetPassword}
              disabled={loading}
              className={`w-full ${
                !loading
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105"
                  : "bg-gradient-to-r from-blue-900 to-purple-800"
              } text-white font-medium py-3 px-4 rounded-lg shadow-lg transition-all duration-200`}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                </div>
              ) : (
                "Reset Password →"
              )}
            </button>
          </div>

          <div className="text-center mt-6 text-gray-400 text-sm">
            Remembered your password?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-400 hover:text-blue-300 cursor-pointer"
            >
              Login →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;