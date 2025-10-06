import React from 'react';
import { Home, Search, ChevronDown, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-2">

          <span className=" font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#6e44ff] to-[#1cb8ff] ">CodeCollab</span>
        </div>


      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between w-full">
          {/* Left side - Infinity Symbol */}
          <div className="flex min-h-screen items-center justify-center ">
            <div className="relative w-80 h-40">
              <svg
                viewBox="0 0 200 100"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background infinity path */}
                <path
                  d="M 30 50 C 30 30, 45 20, 60 20 C 75 20, 85 30, 100 50 C 115 70, 125 80, 140 80 C 155 80, 170 70, 170 50 C 170 30, 155 20, 140 20 C 125 20, 115 30, 100 50 C 85 70, 75 80, 60 80 C 45 80, 30 70, 30 50 Z"
                  fill="none"
                  stroke="#4b5563"
                  strokeWidth="4"
                />

                {/* Animated gradient infinity path - left loop */}
                <path
                  d="M 30 50 C 30 30, 45 20, 60 20 C 75 20, 85 30, 100 50 C 85 70, 75 80, 60 80 C 45 80, 30 70, 30 50 Z"
                  fill="none"
                  stroke="url(#gradient-purple)"
                  strokeWidth="4"
                  strokeDasharray="150"
                  strokeDashoffset="0"
                  className="animate-[dash_3s_linear_infinite]"
                />

                {/* Animated gradient infinity path - right loop */}
                <path
                  d="M 100 50 C 115 70, 125 80, 140 80 C 155 80, 170 70, 170 50 C 170 30, 155 20, 140 20 C 125 20, 115 30, 100 50 Z"
                  fill="none"
                  stroke="url(#gradient-blue)"
                  strokeWidth="4"
                  strokeDasharray="150"
                  strokeDashoffset="0"
                  className="animate-[dash_3s_linear_infinite_reverse]"
                />

                {/* Gradients */}
                <defs>
                  <linearGradient id="gradient-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                  <linearGradient id="gradient-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>

              <style jsx>{`
          @keyframes dash {
            to {
              stroke-dashoffset: -300;
            }
          }
        `}</style>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex-1 pl-16">
            <h1 className="text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                404: Page Not Found
              </span>
            </h1>

            <p className="text-gray-400 text-lg mb-8 max-w-md">
              The code you're seeking has either been deleted or never existed. It seems to have vanished into the void.
            </p>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-8">
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-6 py-3 rounded-lg flex items-center space-x-2 font-medium transition-all duration-200" onClick={() => navigate('/')}>
                <Home size={20} />
                <span>Return Home</span>
              </button>

              <button className="bg-gray-800 hover:bg-gray-700 border border-gray-600 px-6 py-3 rounded-lg flex items-center space-x-2 font-medium transition-all duration-200">
                <Search size={20} />
                <span>Search Problems</span>
              </button>
            </div>

            {/* Technical Details Dropdown */}
            <div className="border border-gray-700 rounded-lg">
              <button className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-800 transition-colors duration-200">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">{'</>'}</span>
                  <span className="text-gray-300">Technical Details</span>
                </div>
                <ChevronDown size={20} className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-6 flex items-center justify-between text-sm text-gray-500">
        <div>
          © 2023 CodeCollab. All rights reserved.
        </div>

        <div className="flex items-center space-x-6">
          <a href="#" className="hover:text-gray-300 transition-colors duration-200">Help Center</a>
          <a href="#" className="hover:text-gray-300 transition-colors duration-200">Contact Support</a>
          <a href="#" className="hover:text-gray-300 transition-colors duration-200">Terms</a>
          <button className="bg-blue-500 hover:bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200">
            <HelpCircle size={16} />
          </button>
        </div>
      </footer>
    </div>
  );
}

