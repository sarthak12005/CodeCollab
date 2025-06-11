import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_ENDPOINT;

const Signup = () => {
    const [email, setEmail] = useState('you@example.com');
    const [username, setUsername] = useState('codehero');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('Too weak');

    const navigate = useNavigate();

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        console.log('Signup attempt:', { email, username, password });
        // Add your signup logic here

        try {
            const res = await axios.post(`${API_URL}/register`, {
                username, 
                email,
                password
            });
            console.log('Signup successful:', res.data);
            alert('Signup successful! Redirecting to login...');
            navigate('/login');
        } catch (err) {
            console.error('Signup error:', err);
            alert('An error occurred during signup. Please try again.');
            return;
        }

    };

    const handlePasswordChange = (value) => {
        setPassword(value);
        // Simple password strength calculation
        if (value.length < 6) {
            setPasswordStrength('Too weak');
        } else if (value.length < 10) {
            setPasswordStrength('Fair');
        } else {
            setPasswordStrength('Strong');
        }
    };

    const getPasswordStrengthColor = () => {
        switch (passwordStrength) {
            case 'Too weak':
                return 'text-red-400';
            case 'Fair':
                return 'text-yellow-400';
            case 'Strong':
                return 'text-green-400';
            default:
                return 'text-gray-400';
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600 bg-opacity-20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-600 bg-opacity-20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-10 w-64 h-64 bg-cyan-600 bg-opacity-15 rounded-full blur-2xl animate-pulse delay-500"></div>
            </div>

            <div className="absolute top-4 left-4 w-12 h-12 rounded-full cursor-pointer bg-gradient-to-r from-[#6e44ff] to-[#1cb8ff] flex items-center justify-center text-white z-10 "
                onClick={() => navigate('/')}
            >
                <FaArrowLeftLong size={20} />
            </div>

            <div className="flex w-full max-w-6xl mx-auto px-8 relative z-10">
                {/* Left Side - Terminal Animation */}
                <div className="flex-1 flex flex-col justify-center items-start pr-16">
                    {/* Terminal Window */}
                    <div className="mb-8 w-full max-w-lg">
                        <div className="bg-gray-800 bg-opacity-90 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 shadow-2xl">
                            {/* Terminal Header */}
                            <div className="bg-gray-700 px-4 py-2 flex items-center space-x-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-gray-300 text-sm ml-4">Terminal</span>
                            </div>

                            {/* Terminal Content */}
                            <div className="p-4 space-y-2 text-sm font-mono">
                                <div className="text-green-400">
                                    $ npm create-codecollab-account
                                </div>
                                <div className="text-blue-400">
                                    Creating new developer account...
                                </div>
                                <div className="text-green-400">
                                    ✓ Initializing workspace
                                </div>
                                <div className="text-yellow-400">
                                    → Configuring developer environment
                                </div>
                                <div className="inline-block w-2 h-4 bg-white animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* Multi-screen Setup Animation */}
                    <div className="relative w-full max-w-lg h-80 mb-8">
                        {/* Main Monitor */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-40 bg-gray-800 rounded-lg border-2 border-gray-600 shadow-xl">
                            <div className="w-full h-full bg-gradient-to-br from-purple-900 to-blue-900 rounded-md p-3">
                                <div className="space-y-1 text-xs font-mono text-purple-300">
                                    <div>const team = {`{`}</div>
                                    <div className="pl-2">members: [],</div>
                                    <div className="pl-2">projects: [],</div>
                                    <div className="pl-2">fun: true</div>
                                    <div>{`};`}</div>
                                </div>
                            </div>
                            <div className="w-8 h-6 bg-gray-700 mx-auto -mt-1 rounded-b"></div>
                        </div>

                        {/* Left Monitor */}
                        <div className="absolute bottom-0 left-4 w-48 h-32 bg-gray-800 rounded-lg border-2 border-gray-600 shadow-xl transform -rotate-12">
                            <div className="w-full h-full bg-gradient-to-br from-cyan-900 to-purple-900 rounded-md p-2">
                                <div className="space-y-1 text-xs font-mono text-cyan-300">
                                    <div>function collaborate() {`{`}</div>
                                    <div className="pl-2">return awesome;</div>
                                    <div>{`}`}</div>
                                </div>
                            </div>
                            <div className="w-6 h-4 bg-gray-700 mx-auto -mt-1 rounded-b"></div>
                        </div>

                        {/* Right Monitor */}
                        <div className="absolute bottom-0 right-4 w-48 h-32 bg-gray-800 rounded-lg border-2 border-gray-600 shadow-xl transform rotate-12">
                            <div className="w-full h-full bg-gradient-to-br from-pink-900 to-purple-900 rounded-md p-2">
                                <div className="space-y-1 text-xs font-mono text-pink-300">
                                    <div>git commit -m</div>
                                    <div className="pl-2">"Building the future"</div>
                                </div>
                            </div>
                            <div className="w-6 h-4 bg-gray-700 mx-auto -mt-1 rounded-b"></div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Signup Form */}
                <div className="w-120">
                    <div className="bg-gray-800 bg-opacity-90 backdrop-blur-sm rounded-xl p-8 border border-gray-700 shadow-2xl">
                        <h2 className="text-2xl font-bold text-white mb-8 text-center">
                            Create Your Account
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
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                        placeholder="you@example.com"
                                    />
                                    <div className="absolute left-3 top-3 text-gray-400">
                                        ✉
                                    </div>
                                </div>
                            </div>

                            {/* Username Field */}
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Username
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                        placeholder="codehero"
                                    />
                                    <div className="absolute left-3 top-3 text-gray-400">
                                        @
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
                                        onChange={(e) => handlePasswordChange(e.target.value)}
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
                                <div className="mt-1">
                                    <span className={`text-sm ${getPasswordStrengthColor()}`}>
                                        Password strength: {passwordStrength}
                                    </span>
                                </div>
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                        placeholder="••••••••"
                                    />
                                    <div className="absolute left-3 top-3 text-gray-400">
                                        🔑
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Signup Button */}
                            <button
                                onClick={handleSignup}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                            >
                                <span>Start Collaborating</span>
                                <span>&lt;/&gt;</span>
                            </button>
                        </div>

                        {/* Terms and Privacy */}
                        <div className="mt-6 text-center text-sm text-gray-400">
                            By signing up, you agree to our{' '}
                            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                                Privacy Policy
                            </a>
                        </div>

                        {/* Login Link */}
                        <div className="text-center mt-8 text-gray-400">
                            Already have an account?{' '}
                            <a href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
                                Login →
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;