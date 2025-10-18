// src/pages/Problems.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, ChevronDown, ChevronRight, Star, Filter, X } from "lucide-react";
import FilterSidebar from "../components/Problems/FilterSidebar";
import ActivitySidebar from "../components/Problems/ActivitySidebar";
import ProblemList from "../components/Problems/ProblemList";
import Header from "../components/Header";

import { useAuth } from "../context/userContext";
import { useTheme } from "../context/ThemeContext";
import useDeviceDetection from "../hooks/useDeviceDetection";

const Problems = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const deviceInfo = useDeviceDetection();

  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]); // ✅ Only runs when user changes


  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className={`min-h-screen ${theme.bg.primary}`}>
      <Header />

      {/* Search Bar Section */}
      {/* <div className={`${theme.bg.secondary} border-b ${theme.border.primary} sticky top-16 z-40`}>
        <div className="max-w-7xl mx-auto mobile-padding sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            
            <button
              onClick={toggleFilter}
              className={`lg:hidden p-2 rounded-lg ${theme.bg.tertiary} ${theme.text.secondary} hover:${theme.text.accent.replace('text-', '')} transition-colors`}
              aria-label="Toggle filters"
            >
              <Filter size={20} />
            </button>

           
            <div className="flex-1 max-w-lg mx-auto lg:mx-0">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme.text.tertiary} w-5 h-5`} />
                <input
                  type="text"
                  placeholder="Search problems..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg ${theme.input.base} selectable-text`}
                />
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Mobile Filter Overlay */}
      {isFilterOpen && deviceInfo.isMobile && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setIsFilterOpen(false)} />
      )}

      {/* Mobile Filter Drawer */}
      <div className={`fixed top-0 left-0 h-full w-80 ${theme.bg.secondary} transform transition-transform duration-300 z-50 lg:hidden ${
        isFilterOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h2 className={`text-lg font-semibold ${theme.text.primary}`}>Filters</h2>
          <button
            onClick={() => setIsFilterOpen(false)}
            className={`p-2 rounded-lg ${theme.text.secondary} hover:${theme.text.accent.replace('text-', '')} transition-colors`}
          >
            <X size={20} />
          </button>
        </div>
        <div className="overflow-y-auto h-full pb-20">
          <FilterSidebar onFilterChange={handleFilterChange} theme={theme} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Desktop Filter Sidebar */}
        <div className="hidden  lg:block w-75 flex-shrink-0 sticky top-22 h-[calc(100vh-8rem)] overflow-y-auto">
          <FilterSidebar onFilterChange={handleFilterChange} theme={theme} />
        </div>

        {/* Problem List - Scrollable */}
        <div className="flex-1 min-w-0 min-h-screen">
          <ProblemList filters={filters} searchQuery={searchQuery} theme={theme} />
        </div>

        {/* Activity Sidebar - Desktop Only */}
        {/* <div className="w-80 flex-shrink-0 hidden xl:block sticky top-22 h-[calc(100vh-4rem)] overflow-y-auto">
          <ActivitySidebar theme={theme} />
        </div> */}
      </div>
    </div>
  );
};

export default Problems;
