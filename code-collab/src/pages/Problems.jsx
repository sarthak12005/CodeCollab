// src/pages/Problems.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, Filter, X
} from "lucide-react";

import FilterSidebar from "../components/Problems/FilterSidebar";
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
  const { user } = useAuth();
  const deviceInfo = useDeviceDetection();

  // Protect Route
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleFilterChange = (newFilters) => setFilters(newFilters);
  const toggleFilter = () => setIsFilterOpen(prev => !prev);

  return (
    <div className={`min-h-screen ${theme.bg.primary}`}>
      <Header />


      {isFilterOpen && deviceInfo.isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      <div
        className={`
          fixed top-0 left-0 h-full w-80 
          ${theme.bg.secondary}
          transform transition-transform duration-300 z-50
          ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className={`text-lg font-semibold ${theme.text.primary}`}>
            Filters
          </h2>

          <button
            onClick={() => setIsFilterOpen(false)}
            className={`p-2 rounded-lg ${theme.text.secondary}`}
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto h-full pb-10">
          <FilterSidebar
            onFilterChange={handleFilterChange}
            theme={theme}
          />
        </div>
      </div>

      {/* MAIN */}
      <div className="flex">
        
        {/* 🖥 Desktop Sidebar */}
        <aside className="hidden lg:block w-72 sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto">
          <FilterSidebar onFilterChange={handleFilterChange} theme={theme} />
        </aside>

        {/* 🧩 Problems */}
        <main className="flex-1 min-h-screen">
          <ProblemList filters={filters} searchQuery={searchQuery} theme={theme} />
        </main>

      </div>
    </div>
  );
};

export default Problems;
