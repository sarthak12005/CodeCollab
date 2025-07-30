// src/pages/Problems.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, ChevronDown, ChevronRight, Star } from "lucide-react";
import FilterSidebar from "../components/Problems/FilterSidebar";
import ActivitySidebar from "../components/Problems/ActivitySidebar";
import ProblemList from "../components/Problems/ProblemList";
import Header from "../components/Header";

import { useAuth } from "../context/userContext";
import { useTheme } from "../context/ThemeContext";

const Problems = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const navigate = useNavigate();
  const { theme } = useTheme();

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
    <div className={`min-h-screen ${theme.bg.primary}`}>
      <Header />

      {/* Search Bar Section */}
      <div className={`${theme.bg.secondary} border-b ${theme.border.primary} sticky top-16 z-40`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex-1 max-w-lg mx-auto">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme.text.tertiary} w-5 h-5`} />
              <input
                type="text"
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg ${theme.input.base}`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Filter Sidebar - Fixed */}
        <div className="w-80 flex-shrink-0 sticky top-32 h-[calc(100vh-8rem)] overflow-y-auto">
          <FilterSidebar onFilterChange={handleFilterChange} theme={theme} />
        </div>

        {/* Problem List - Scrollable */}
        <div className="flex-1 min-w-0 min-h-screen">
          <ProblemList filters={filters} searchQuery={searchQuery} theme={theme} />
        </div>

        {/* Activity Sidebar - Fixed */}
        <div className="w-80 flex-shrink-0 hidden lg:block sticky top-32 h-[calc(100vh-8rem)] overflow-y-auto">
          <ActivitySidebar theme={theme} />
        </div>
      </div>
    </div>
  );
};

export default Problems;
