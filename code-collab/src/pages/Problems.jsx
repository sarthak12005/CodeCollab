// src/pages/Problems.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, ChevronDown, ChevronRight, Star } from "lucide-react";
import FilterSidebar from "../components/Problems/FilterSidebar";
import ActivitySidebar from "../components/Problems/ActivitySidebar";
import ProblemList from "../components/Problems/ProblemList";

import { useAuth } from "../context/userContext";

const Problems = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      console.log('user not found ');
      navigate("/login");
    }
  }, [navigate]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header/Navbar */}
      <header className="bg-[#0f0f24] border-b border-slate-700">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
               <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6e44ff] to-[#1cb8ff] cursor-pointer" onClick={() => navigate('/')}>
                CODE COLLAB
              </h1>
            </div>
          </div>

          {/* Search Bar */}

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search problems..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JS</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Filter Sidebar */}
        <FilterSidebar onFilterChange={handleFilterChange} />

        {/* Problem List */}
        <ProblemList filters={filters} searchQuery={searchQuery} />

        {/* Activity Sidebar */}
        <ActivitySidebar />
      </div>
    </div>
  );
};

export default Problems;
