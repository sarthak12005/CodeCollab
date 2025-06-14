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
          <div className="flex-1 flex justify-center">
            <div className="relative">
              {/* Infinity symbol made with two circles */}
              <div className="flex items-center">
                <div className="w-32 h-32 rounded-full border-4 border-gray-600 relative">
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 border-r-purple-500 border-l-purple-500 animate-[spin_2s_linear_infinite]"></div>
                </div>
                <div className="w-32 h-32 rounded-full border-4 border-gray-600 relative -ml-8">
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-b-blue-400 border-l-blue-400 border-t-blue-400 animate-[spin_2s_linear_infinite_reverse]"></div>
                </div>
              </div>
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

