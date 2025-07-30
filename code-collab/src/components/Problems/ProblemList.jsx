import React, { useState, useEffect } from 'react';
import { ChevronDown, Star, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/userContext';
import { useTheme } from '../../context/ThemeContext';
import PageSkeleton from './PageSkeleton';

const API_URL = import.meta.env.VITE_API_ENDPOINT;

const ProblemList = ({ filters, searchQuery }) => {
  const [sortBy, setSortBy] = useState('Most Recent');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [problemData, setProblemData] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/problem/get-problems`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.status === 200) {
          setProblemData(response.data.problems);
        }
      } catch (err) {
        console.error("Error fetching problems:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  useEffect(() => {
    const applyFilters = (problems = []) => {
      return problems.filter((problem) => {
        const difficultyPass = filters.difficulty
          ? Object.entries(filters.difficulty)
            .filter(([_, val]) => val)
            .map(([key]) => key)
            .includes(problem.difficulty)
          : true;

        const statusFilter = filters.status || {};
        const statusPass =
          statusFilter.All ||
          (statusFilter.Solved && problem.isSolved) ||
          (statusFilter.Unsolved && !problem.isSolved) ||
          (statusFilter.Favorited && problem.isFavorited);

        const companies = filters.companies
          ? Object.entries(filters.companies)
            .filter(([_, val]) => val)
            .map(([key]) => key)
          : [];

        const companyPass =
          companies.length === 0 ||
          (problem.companies &&
            problem.companies.some((company) => companies.includes(company)));

        const selectedTags = filters.tags || [];
        const tagPass =
          selectedTags.length === 0 ||
          (problem.tags &&
            problem.tags.some((tag) => selectedTags.includes(tag)));

        const queryPass =
          !searchQuery ||
          problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          problem.description.toLowerCase().includes(searchQuery.toLowerCase());

        return (
          difficultyPass &&
          statusPass &&
          companyPass &&
          tagPass &&
          queryPass
        );
      });
    };

    const filtered = applyFilters(problemData || []);
    setFilteredProblems(filtered);
  }, [problemData, filters, searchQuery, sortBy]);


  const handleProblemClick = (problemId) => {
    navigate(`/problems/singleProblem/${problemId}`);
  };

  const handleToogleFavorite = async (problemId) => {
    console.log("setting Favorites: ", problemId);
    try {
      setLoading(true);
      const res = await axios.post(
        `${API_URL}/favorite/${problemId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (res.status === 200) {
        alert(res.data.message);
      }

    } catch (err) {
      console.error("the error in making favorite is: ", err);
    } finally {
      setLoading(false);
    }
  }

  const sortOptions = ['Most Recent', 'Difficulty', 'Acceptance Rate', 'Title'];

  if (loading) return <PageSkeleton />;

  return (
    <div className={`p-6 space-y-6 ${theme.bg.primary} min-h-screen`}>
      {/* Header and Sort */}
      <div className="flex justify-between items-center">
        <h2 className={`text-xl font-semibold ${theme.text.primary}`}>Problems</h2>
        <div className="relative">
          <button
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className={`flex items-center space-x-2 ${theme.bg.secondary} ${theme.bg.hover} px-4 py-2 rounded-lg border ${theme.border.primary} ${theme.text.primary}`}
          >
            <span className="text-sm">Sort by: {sortBy}</span>
            <ChevronDown size={16} />
          </button>

          {showSortDropdown && (
            <div className={`absolute right-0 top-full mt-1 ${theme.bg.secondary} border ${theme.border.primary} rounded-lg ${theme.shadow.lg} z-10 min-w-[140px]`}>
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSortBy(option);
                    setShowSortDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm ${theme.text.primary} ${theme.bg.hover} first:rounded-t-lg last:rounded-b-lg`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Problem List */}
      <div className="space-y-4">
        {filteredProblems.length > 0 ? (
          filteredProblems.map((problem) => (
            <div
              key={problem._id}
              className={`${theme.bg.card} ${theme.card.hover} border ${theme.border.primary} rounded-lg p-4 cursor-pointer transition-all duration-200 group`}
              onClick={() => handleProblemClick(problem._id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className={`text-lg font-medium ${theme.text.primary} group-hover:${theme.text.accent.replace('text-', '')} transition-colors`}>
                      {problem.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {problem.isSolved && (
                        <div className="flex items-center gap-1 bg-green-600 px-2 py-1 rounded text-xs font-medium text-white">
                          <CheckCircle size={12} />
                          Solved
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mb-3">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${problem.difficulty === 'Easy'
                        ? 'bg-green-500'
                        : problem.difficulty === 'Medium'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                        } text-white`}
                    >
                      {problem.difficulty}
                    </span>

                    <div className="flex items-center space-x-2">
                      {problem.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs text-gray-400 bg-slate-700 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="text-sm text-gray-400">
                      {problem.acceptanceRate}
                    </span>
                  </div>

                  <p className="text-sm text-gray-300 leading-relaxed">
                    {problem.description}
                  </p>
                </div>

                <div className="ml-4 flex items-start space-x-2">
                  <button className="p-2 hover:bg-slate-700 rounded transition-colors">
                    <Star
                      className={`w-4 h-4 ${user.userFavorites.includes(problem._id)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-400'
                        }`}

                      onClick={(e) => {
                        e.stopPropagation()
                        handleToogleFavorite(problem._id)
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4  w-[836px] mx-auto">
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-700/50 animate-spin-slow" style={{ animationDuration: '8s' }}></div>
              </div>
            </div>

            <h3 className="text-xl font-medium text-gray-300 mb-2">No problems found</h3>
            <p className="text-gray-500 max-w-md text-center mb-6">
              We couldn't find any problems matching your current filters. Try adjusting your search criteria.
            </p>

            <div className="flex space-x-3">
              <button
                onClick={() => {

                }}
                className="px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
              >
                Clear all filters
              </button>
              <button
                onClick={() => {
                  // Add your reset logic here
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
              >
                Browse all problems
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-800 w-full max-w-xs">
              <p className="text-xs text-gray-600">
                Need help? <span className="text-blue-400 cursor-pointer hover:underline">Contact support</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Load More Button */}
      {filteredProblems.length > 0 && (
        <div className="flex justify-center p-6">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Load More Problems
          </button>
        </div>
      )}
    </div>
  );
};

export default ProblemList;