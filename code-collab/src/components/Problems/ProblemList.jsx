// src/components/ProblemList.js
import React, { useState, useEffect } from "react";
import { ChevronDown, Star } from "lucide-react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_ENDPOINT;

const ProblemList = ({ filters, searchQuery }) => {
  const [sortBy, setSortBy] = useState("Most Recent");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const problems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      tags: ["Array", "Hash Table"],
      acceptance: "72%",
      description:
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      isFavorited: false,
      isSolved: false,
    },
    {
      id: 2,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      tags: ["String", "Sliding Window"],
      acceptance: "64%",
      description:
        "Given a string s, find the length of the longest substring without repeating characters.",
      isFavorited: true,
      isSolved: false,
    },
    {
      id: 3,
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      tags: ["Array", "Binary Search"],
      acceptance: "35%",
      description:
        "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
      isFavorited: false,
      isSolved: false,
    },
    {
      id: 4,
      title: "Valid Parentheses",
      difficulty: "Easy",
      tags: ["String", "Stack"],
      acceptance: "68%",
      description:
        "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      isFavorited: false,
      isSolved: true,
    },
    {
      id: 5,
      title: "Merge k Sorted Lists",
      difficulty: "Hard",
      tags: ["Linked List", "Divide and Conquer"],
      acceptance: "45%",
      description:
        "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.",
      isFavorited: false,
      isSolved: false,
    },
  ];

  const [problemData, setProblemData] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await axios.get(`${API_URL}/problem/get-problems`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.status === 200) {
          setProblemData(res.data.problems);
          console.log("Fetched problems::", res.data.problems);
        }
      } catch (err) {
        console.error("Error fetching problems:", err);
      }
    };

    fetchProblems();
  }, []);

  const sortOptions = ["Most Recent", "Difficulty", "Acceptance Rate", "Title"];

  return (
    <div className="flex-1 bg-[#10101f] text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-700">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">All Problems</h1>
          <span className="text-gray-400 text-sm">(125)</span>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg border border-slate-600"
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
                  className="w-full text-left px-4 py-2 text-sm hover:bg-slate-700 first:rounded-t-lg last:rounded-b-lg"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Problem List */}
      <div className="p-6 space-y-4">
        {problems.map((problem) => (
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
                      problem.difficulty === "Easy"
                        ? "bg-green-500"
                        : problem.difficulty === "Medium"
                        ? "bg-yellow-500"
                        : "bg-red-500"
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
                    {problem.acceptance}
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
                        ? "text-yellow-400 fill-current"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center p-6">
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Load More Problems
        </button>
      </div>
    </div>
  );
};

export default ProblemList;
