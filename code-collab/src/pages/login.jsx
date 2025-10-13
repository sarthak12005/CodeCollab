import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Github } from "lucide-react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/userContext';
import { useTheme } from '../context/ThemeContext';
import useDeviceDetection from '../hooks/useDeviceDetection';
import axios from 'axios';
import toast from 'react-hot-toast';
const API_URL = import.meta.env.VITE_API_ENDPOINT;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const navigate = useNavigate();
  const { user, updateUser, loginWithGoogle, loginWithgithub } = useAuth();
  const { theme } = useTheme();
  const deviceInfo = useDeviceDetection();

  useEffect(() => {
    if (user) {
      navigate(-1);
    }
  }, [user, navigate])



  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      return toast.error("Credentials Required!");
    }

    try {
      setLoginLoading(true);
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password
      });

      const data = response.data


      updateUser(data.user, data.token);
      navigate('/');
      toast.success("Login Successfully! Welcome Back");

    } catch (err) {
      console.error('error in login ', err);
      toast.error("Login error! please try again");
    } finally {
      setLoginLoading(false)
    }

  };

  const handleGithubLogin = () => {

    try {
      loginWithgithub();
    } catch (err) {
      console.error("Error logging in with GitHub:", err);
      alert("Failed to login with GitHub. Please try again.");
    }

  };

  const handleGoogleLogin = () => {
    try {
      loginWithGoogle();
    } catch (err) {
      console.error("Error logging in with Google:", err);
      alert("Failed to login with Google. Please try again.");
    }

  };

  return (
    <div className={`min-h-screen ${theme.bg.primary} flex items-center justify-center relative overflow-hidden mobile-padding`}>
      <div
        className={`absolute top-4 left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full cursor-pointer ${theme.button.primary} flex items-center justify-center text-white z-10 `}
        onClick={() => navigate("/")}
      >
        <FaArrowLeftLong size={deviceInfo.isMobile ? 18 : 20} />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-48 h-48 sm:w-96 sm:h-96 bg-purple-600 bg-opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-40 h-40 sm:w-80 sm:h-80 bg-blue-600 bg-opacity-20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-5 sm:left-10 w-32 h-32 sm:w-64 sm:h-64 bg-cyan-600 bg-opacity-15 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto px-4 sm:px-8 relative z-10 gap-8 lg:gap-0">
        {/* Left Side - Welcome Section */}
        <div className="flex-1 flex flex-col justify-center items-start lg:pr-16 order-2 lg:order-1">
          {/* Improved Code Animation - Hidden on mobile */}
          <div className="mb-6 sm:mb-8 relative hidden lg:block">
            <div className={`${theme.bg.secondary} bg-opacity-80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border ${theme.border.primary} ${theme.shadow.lg}`}>
              <div className="flex space-x-2 mb-4">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="space-y-2 text-xs sm:text-sm font-mono">
                <div className="text-blue-400">
                  <span className="text-purple-400">function</span>{" "}
                  <span className="text-yellow-400">collaborate</span>() {"{"}
                </div>
                <div className="text-cyan-400 pl-4">
                  <span className="text-purple-400">const</span> team =
                  <span className="text-green-400"> 'worldwide'</span>;
                </div>
                <div className="text-pink-400 pl-4">
                  <span className="text-purple-400">return</span> coding + fun;
                </div>
                <div className="text-blue-400">{"}"}</div>
              </div>

              {/* Animated cursor */}
              <div className="inline-block w-1.5 h-4 sm:w-2 sm:h-5 bg-white animate-pulse ml-1"></div>
            </div>

            {/* Floating particles */}
            <div className="absolute -top-2 -right-2 w-3 h-3 sm:w-4 sm:h-4 bg-purple-500 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-2 -left-2 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-cyan-500 rounded-full animate-bounce delay-300"></div>
            <div className="absolute top-1/2 -right-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-500 rounded-full animate-ping"></div>
          </div>

          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 selectable-text">
              <span className="text-purple-400">Welcome</span>{" "}
              <span className="text-blue-400">Back to</span>
              <br />
              <span className={theme.text.primary}>CodeCollab</span>
            </h1>
            <p className={`${theme.text.secondary} text-base sm:text-lg selectable-text`}>
              Continue your coding journey with collaborators
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>worldwide
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto lg:w-96 lg:mx-0 order-1 lg:order-2">
          <div className={`${theme.bg.secondary} bg-opacity-90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border ${theme.border.primary} ${theme.shadow.lg}`}>
            <h2 className={`text-xl sm:text-2xl font-bold ${theme.text.primary} mb-6 sm:mb-8 text-center`}>
              Login to Your Account
            </h2>

            <div className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder={"ex., john123"}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="••••••••"
                    required
                  />
                  <div className="absolute left-3 top-3 text-gray-400">🔒</div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="text-right mt-2">
                  <a
                    href="#"
                    className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                className={`w-full ${username && password ? (

                  " bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105 transition-all duration-200 transform"

                ) : (
                  "bg-gradient-to-r from-blue-900 to-purple-800"
                )
                  } text-white font-medium py-3 px-4 rounded-lg   shadow-lg`}
              >
                {loginLoading ? (
                  <>
                    <div className="flex justify-center items-center">
                      <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                    </div>
                  </>
                ) : (
                  "Login →"
                )}

              </button>
            </div>

            {/* Social Login */}
            <div className="mt-6">
              <div className="text-center text-gray-400 text-sm mb-4">
                or continue with
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleGithubLogin}
                  className="flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition-colors border border-gray-600"
                >
                  <Github size={20} />
                  <span>GitHub</span>
                </button>
                <button
                  onClick={handleGoogleLogin}
                  className="flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition-colors border border-gray-600"
                >
                  <div className="text-[14px]">G</div>
                  <div className="text-[14px]">Google</div>
                </button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-8 text-gray-400">
              New here?{" "}
              <a
                href="/signup"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Create Account →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
