// src/components/Problems/FilterSidebar.jsx
import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const FilterSidebar = ({ onFilterChange }) => {
  const { theme } = useTheme();

  const [expandedSections, setExpandedSections] = useState({
    difficulty: true,
    tags: true,
    status: true,
    companies: true,
  });

  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState({
    difficulty: { Easy: true, Medium: true, Hard: true },
    status: { All: true, Solved: false, Unsolved: false, Favorited: false },
    companies: {
      Google: false,
      Amazon: false,
      Microsoft: false,
      Facebook: false,
    },
  });

  const [selectedTags, setSelectedTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const tags = [
    "Array",
    "Trees",
    "Dynamic Programming",
    "Hash Table",
    "Two Pointers",
    "Strings",
    "Linked List",
    "Greedy",
    "Graphs",
    "Recursion",
    "Binary Search",
  ];

  useEffect(() => {
    onFilterChange({
      difficulty: selectedFilters.difficulty,
      status: selectedFilters.status,
      companies: selectedFilters.companies,
      tags: selectedTags,
    });
  }, [selectedFilters, selectedTags]);

  const toggleSection = (section) =>
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));

  const handleDifficultyChange = (level) =>
    setSelectedFilters((prev) => ({
      ...prev,
      difficulty: { ...prev.difficulty, [level]: !prev.difficulty[level] },
    }));

  const handleStatusSelect = (status) => {
    if (status === "All") {
      setSelectedFilters((prev) => ({
        ...prev,
        status: { All: true, Solved: false, Unsolved: false, Favorited: false },
      }));
    } else {
      setSelectedFilters((prev) => ({
        ...prev,
        status: {
          All: false,
          Solved: false,
          Unsolved: false,
          Favorited: false,
          [status]: true,
        },
      }));
    }
    setStatusDropdownOpen(false);
  };

  const handleCompanyChange = (company) =>
    setSelectedFilters((prev) => ({
      ...prev,
      companies: {
        ...prev.companies,
        [company]: !prev.companies[company],
      },
    }));

  const addTag = (tag) => {
    if (!selectedTags.includes(tag)) setSelectedTags([...selectedTags, tag]);
    setTagInput("");
  };

  const removeTag = (tag) =>
    setSelectedTags(selectedTags.filter((t) => t !== tag));

  const filteredTags = tags.filter(
    (tag) =>
      tag.toLowerCase().includes(tagInput.toLowerCase()) &&
      !selectedTags.includes(tag)
  );

  return (
    <div
      className={`
    w-full
    ${theme.bg.primary}
    ${theme.text.primary}
    border-r ${theme.border.primary}
    px-4 py-5
    sticky top-20
    h-[calc(100vh-5rem)]
    overflow-y-auto
    scroll-smooth
  `}
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <style>
        {`
        div::-webkit-scrollbar {
          display: none;
        }
        `}
      </style>

      {/* Difficulty */}
      <Section
        title="Difficulty"
        expanded={expandedSections.difficulty}
        toggle={() => toggleSection("difficulty")}
        theme={theme}
      >
        <div className="space-y-2">
          {["Easy", "Medium", "Hard"].map((level) => (
            <label
              key={level}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={!!selectedFilters.difficulty[level]}
                onChange={() => handleDifficultyChange(level)}
                className="accent-blue-500 w-4 h-4"
              />
              <span
                className={`text-sm ${
                  level === "Easy"
                    ? "text-green-400"
                    : level === "Medium"
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {level}
              </span>
            </label>
          ))}
        </div>
      </Section>

      {/* Tags */}
      <Section
        title="Tags"
        expanded={expandedSections.tags}
        toggle={() => toggleSection("tags")}
        theme={theme}
      >
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="bg-purple-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
            >
              {tag}
              <X
                size={12}
                className="cursor-pointer hover:text-gray-200"
                onClick={() => removeTag(tag)}
              />
            </span>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Filter tags..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className={`w-full px-3 py-2 rounded text-sm ${theme.input.base}`}
          />

          {tagInput && filteredTags.length > 0 && (
            <div
              className={`
                absolute top-full left-0 right-0 mt-1 rounded-lg
                border ${theme.border.primary}
                ${theme.bg.secondary}
                max-h-32 overflow-y-auto
                shadow-xl
                z-20
              `}
            >
              {filteredTags.map((tag) => (
                <div
                  key={tag}
                  onClick={() => addTag(tag)}
                  className={`px-3 py-2 text-sm cursor-pointer ${theme.card.hover}`}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* Status Dropdown */}
      <Section
        title="Status"
        expanded={expandedSections.status}
        toggle={() => toggleSection("status")}
        theme={theme}
      >
        <div className="relative">
          <button
            className={`
    w-full px-3 py-2 rounded-lg text-sm
    ${theme.bg.tertiary}
    border ${theme.border.primary}
    hover:opacity-90 transition
    flex justify-between items-center
  `}
            onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
          >
            <span>
              {selectedFilters.status.Favorited
                ? "Favorited"
                : selectedFilters.status.Solved
                ? "Solved"
                : selectedFilters.status.Unsolved
                ? "Unsolved"
                : "All"}
            </span>

            <ChevronDown size={14} />
          </button>

          {statusDropdownOpen && (
            <div
              className={`
    absolute mt-2 w-full rounded-lg
    ${theme.bg.tertiary}
    border ${theme.border.primary}
    shadow-xl z-20
  `}
            >
              {["All", "Solved", "Unsolved", "Favorited"].map((status) => (
                <div
                  key={status}
                  onClick={() => handleStatusSelect(status)}
                  className={`
                    px-3 py-2 text-sm cursor-pointer
                    hover:bg-white/10
                    ${
                      selectedFilters.status[status]
                        ? "text-blue-400"
                        : "text-gray-300"
                    }
                  `}
                >
                  {status}
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* Companies */}
      <Section
        title="Companies"
        expanded={expandedSections.companies}
        toggle={() => toggleSection("companies")}
        theme={theme}
      >
        <div className="space-y-2">
          {["Google", "Amazon", "Microsoft", "Facebook"].map((company) => (
            <label
              key={company}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedFilters.companies[company]}
                onChange={() => handleCompanyChange(company)}
                className="accent-blue-500 w-4 h-4"
              />
              <span className={`${theme.text.secondary} text-sm`}>
                {company}
              </span>
            </label>
          ))}
        </div>

        <button className="text-blue-400 text-sm mt-2 hover:text-blue-300">
          Show More
        </button>
      </Section>

      {/* Reset */}
      <button
        className="
          mt-4 w-full py-2 rounded-lg font-medium text-sm
          bg-gradient-to-r from-slate-700 to-slate-800
          hover:opacity-90 transition
        "
        onClick={() => {
          setSelectedFilters({
            difficulty: { Easy: true, Medium: true, Hard: true },
            status: {
              All: true,
              Solved: false,
              Unsolved: false,
              Favorited: false,
            },
            companies: {
              Google: false,
              Amazon: false,
              Microsoft: false,
              Facebook: false,
            },
          });
          setSelectedTags([]);
        }}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSidebar;

/* === Section Component === */
const Section = ({ title, children, expanded, toggle, theme }) => (
  <div
    className={`
      mb-4 rounded-xl
      border ${theme.border.primary}
      ${theme.bg.card}
      hover:shadow-[0_0_20px_rgba(120,120,255,0.12)]
      transition-all duration-300
    `}
  >
    <div
      onClick={toggle}
      className="
        flex items-center justify-between
        cursor-pointer select-none
        px-4 py-3
      "
    >
      <h3 className="uppercase text-[11px] tracking-[1px] font-semibold opacity-80">
        {title}
      </h3>

      <div className="p-1 rounded-lg bg-black/5 dark:bg-white/5 border border-white/10">
        {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </div>
    </div>

    {expanded && <div className="px-4 pb-4 animate-fadeIn">{children}</div>}
  </div>
);

