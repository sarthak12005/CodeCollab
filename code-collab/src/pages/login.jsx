import React, { useState } from 'react';
import { Eye, EyeOff, Github } from 'lucide-react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('you@example.com');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    // const [isFullscreen, setIsFullscreen] = useState(true);

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Login attempt:', { email, password });
        // Add your login logic here
    };

    const handleGithubLogin = () => {
        console.log('GitHub login clicked');
        // Add GitHub OAuth logic here
    };

    const handleGoogleLogin = () => {
        console.log('Google login clicked');
        // Add Google OAuth logic here
    };

    // const exitFullscreen = () => {
    //     setIsFullscreen(false);
    // };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden">
            {/* Fullscreen Exit Button */}
            {/* {isFullscreen && (
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gray-800 bg-opacity-90 px-4 py-2 rounded-lg border border-gray-700 text-gray-300 text-sm">
                        To exit full screen, press and hold{' '}
                        <kbd className="bg-gray-700 px-2 py-1 rounded text-xs border border-gray-600 ml-1">
                            Esc
                        </kbd>
                    </div>
                </div>
            )} */}

            <div className="absolute top-4 left-4 w-12 h-12 rounded-full cursor-pointer bg-gradient-to-r from-[#6e44ff] to-[#1cb8ff] flex items-center justify-center text-white z-10 "
                onClick={() => navigate('/')}
            >
                <FaArrowLeftLong size={20}  />
            </div>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600 bg-opacity-20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-600 bg-opacity-20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-10 w-64 h-64 bg-cyan-600 bg-opacity-15 rounded-full blur-2xl animate-pulse delay-500"></div>
            </div>

            <div className="flex w-full max-w-6xl mx-auto px-8 relative z-10">
                {/* Left Side - Welcome Section */}
                <div className="flex-1 flex flex-col justify-center items-start pr-16">
                    {/* Improved Code Animation */}
                    <div className="mb-8 relative">
                        <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-2xl">
                            <div className="flex space-x-2 mb-4">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                            <div className="space-y-2 text-sm font-mono">
                                <div className="text-blue-400">
                                    <span className="text-purple-400">function</span>{' '}
                                    <span className="text-yellow-400">collaborate</span>() {'{'}
                                </div>
                                <div className="text-cyan-400 pl-4">
                                    <span className="text-purple-400">const</span> team =
                                    <span className="text-green-400"> 'worldwide'</span>;
                                </div>
                                <div className="text-pink-400 pl-4">
                                    <span className="text-purple-400">return</span> coding + fun;
                                </div>
                                <div className="text-blue-400">{'}'}</div>
                            </div>

                            {/* Animated cursor */}
                            <div className="inline-block w-2 h-5 bg-white animate-pulse ml-1"></div>
                        </div>

                        {/* Floating particles */}
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-500 rounded-full animate-bounce"></div>
                        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-cyan-500 rounded-full animate-bounce delay-300"></div>
                        <div className="absolute top-1/2 -right-4 w-2 h-2 bg-pink-500 rounded-full animate-ping"></div>
                    </div>

                    <div className="text-left">
                        <h1 className="text-5xl font-bold mb-4">
                            <span className="text-purple-400">Welcome</span>{' '}
                            <span className="text-blue-400">Back to</span>
                            <br />
                            <span className="text-white">CodeCollab</span>
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Continue your coding journey with collaborators
                            <br />
                            worldwide
                        </p>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-96">
                    <div className="bg-gray-800 bg-opacity-90 backdrop-blur-sm rounded-xl p-8 border border-gray-700 shadow-2xl">
                        <h2 className="text-2xl font-bold text-white mb-8 text-center">
                            Login to Your Account
                        </h2>

                        <div className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                        placeholder="you@example.com"
                                    />
                                    <div className="absolute left-3 top-3 text-gray-400">
                                        &lt;/&gt;
                                    </div>
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                        placeholder="••••••••"
                                    />
                                    <div className="absolute left-3 top-3 text-gray-400">
                                        🔒
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                <div className="text-right mt-2">
                                    <a href="#" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                                        Forgot Password?
                                    </a>
                                </div>
                            </div>

                            {/* Login Button */}
                            <button
                                onClick={handleLogin}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                            >
                                Login →
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
                                    <div className='text-[14px]'>Google</div>
                                </button>
                            </div>
                        </div>

                        {/* Sign Up Link */}
                        <div className="text-center mt-8 text-gray-400">
                            New here?{' '}
                            <a href="/signup" className="text-blue-400 hover:text-blue-300 transition-colors">
                                Create Account →
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Help Button */}
            {/* <div className="fixed bottom-6 right-6 z-20">
                <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-colors">
                    <span className="text-sm font-medium">? Help</span>
                </button>
            </div> */}
        </div>
    );
};

export default Login;