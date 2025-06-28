import React, { useState, useEffect } from 'react';
import { ChevronDown, Star } from 'lucide-react';
import axios from 'axios';
import ProblemSkeletonCard from './ProblemSkeletonCard';
import PageSkeleton from './PageSkeleton';

const API_URL = import.meta.env.VITE_API_ENDPOINT;

const ProblemList = ({ filters, searchQuery }) => {
  const [sortBy, setSortBy] = useState('Most Recent');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [problemData, setProblemData] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const sortOptions = ['Most Recent', 'Difficulty', 'Acceptance Rate', 'Title'];

  if (loading) return <PageSkeleton />;

  return (
    <div className="p-6 space-y-6">
      {/* Sort Dropdown */}
      <div className="flex justify-end">
        <div className="relative">
          <button
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg border border-slate-600 text-white"
          >
            <span className="text-sm">{sortBy}</span>
            <ChevronDown size={16} />
          </button>

          {showSortDropdown && (
            <div className="absolute right-0 top-full mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-lg z-10 min-w-[140px]">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSortBy(option);
                    setShowSortDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-slate-700 first:rounded-t-lg last:rounded-b-lg"
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
        {problemData.map((problem) => (
          <div
            key={problem.id}
            className="bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg p-4 cursor-pointer transition-all duration-200 group"
            onClick={() => console.log(`Navigating to problem ${problem.id}`)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors">
                    {problem.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    {problem.isSolved && (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                    {problem.isFavorited && (
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-3">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                      problem.difficulty === 'Easy'
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
                    className={`w-4 h-4 ${
                      problem.isFavorited
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center p-6">
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Load More Problems
        </button>
      </div>
    </div>
  );
};

export default ProblemList;
