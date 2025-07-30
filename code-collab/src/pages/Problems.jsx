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
      navigate('/login');
    }
  }, [user, navigate]); // ✅ Only runs when user changes


  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header/Navbar */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <h1
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 cursor-pointer"
                onClick={() => navigate("/")}
              >
                CODE COLLAB
              </h1>
            </div>
          </div>

          {/* Search Bar */}
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

          {/* User Actions */}
          <div className="flex items-center space-x-4">

            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              <div
                className="hidden md:flex items-center space-x-4"
                onClick={() => navigate("/profile")}
              >
                <div className="w-[32px] h-[32px] rounded-full bg-white/80">
                  <img
                    src={user?.userImage || "https://via.placeholder.com/32"}
                    alt="user-profile"
                    className="w-full h-full rounded-full object-center object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex min-h-screen">
        {/* Filter Sidebar */}
        <div className="w-80 flex-shrink-0">
          <FilterSidebar onFilterChange={handleFilterChange} />
        </div>

        {/* Problem List */}
        <div className="flex-1 min-w-0">
          <ProblemList filters={filters} searchQuery={searchQuery} />
        </div>

        {/* Activity Sidebar */}
        <div className="w-80 flex-shrink-0 hidden lg:block">
          <ActivitySidebar />
        </div>
      </div>
    </div>
  );
};

export default Problems;
