// src/components/FilterSidebar.js
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const FilterSidebar = ({ onFilterChange }) => {
    const { theme } = useTheme();
    const [expandedSections, setExpandedSections] = useState({
        difficulty: true,
        tags: true,
        status: true,
        companies: true
    });

    const [selectedFilters, setSelectedFilters] = useState({
        difficulty: { Easy: true, Medium: true, Hard: true },
        status: { All: true, Solved: false, Unsolved: false, Favorited: false },
        companies: { Google: false, Amazon: false, Microsoft: false, Facebook: false }
    });

    const [selectedTags, setSelectedTags] = useState([]);
    const [tagInput, setTagInput] = useState('');

    const tags = [
        'Array', 'Trees', 'Dynamic Programming', 'Hash Table', 'Two Pointers',
        'Strings', 'Linked List', 'Greedy', 'Graphs', 'Recursion', 'Binary Search'
    ];

    useEffect(() => {
        onFilterChange({
            difficulty: selectedFilters.difficulty,
            status: selectedFilters.status,
            companies: selectedFilters.companies,
            tags: selectedTags
        });
    }, [selectedFilters, selectedTags]);  // when these change, notify parent

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };



    const handleDifficultyChange = (level) => {
        setSelectedFilters(prev => ({
            ...prev,
            difficulty: {
                ...prev.difficulty,
                [level]: !prev.difficulty[level]
            }
        }));
    };

    const handleStatusChange = (status) => {
        if (status === 'All') {
            setSelectedFilters(prev => ({
                ...prev,
                status: { All: true, Solved: false, Unsolved: false, Favorited: false }
            }));
        } else {
            setSelectedFilters(prev => ({
                ...prev,
                status: {
                    ...prev.status,
                    All: false,
                    [status]: !prev.status[status]
                }
            }));
        }
    };

    const handleCompanyChange = (company) => {
        setSelectedFilters(prev => ({
            ...prev,
            companies: {
                ...prev.companies,
                [company]: !prev.companies[company]
            }
        }));
    };

    const addTag = (tag) => {
        if (!selectedTags.includes(tag)) {
            setSelectedTags([...selectedTags, tag]);
        }
        setTagInput('');
    };

    const removeTag = (tag) => {
        setSelectedTags(selectedTags.filter(t => t !== tag));
    };

    const filteredTags = tags.filter(tag =>
        tag.toLowerCase().includes(tagInput.toLowerCase()) &&
        !selectedTags.includes(tag)
    );

    return (
        <div className={`w-75 ${theme.bg.secondary} ${theme.text.primary} p-4 border-r ${theme.border.primary}`}>
            {/* Difficulty Section */}
            <div className="mb-4">
                <div className="flex items-center justify-between cursor-pointer mb-3" onClick={() => toggleSection('difficulty')}>
                    <h3 className={`text-sm font-medium ${theme.text.secondary} uppercase tracking-wide`}>DIFFICULTY</h3>
                    {expandedSections.difficulty ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </div>
                {expandedSections.difficulty && (
                    <div className="space-y-2">
                        {['Easy', 'Medium', 'Hard'].map((level) => (
                            <label key={level} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedFilters.difficulty[level]}
                                    onChange={() => handleDifficultyChange(level)}
                                    className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded"
                                />
                                <span className={`text-sm ${level === 'Easy' ? 'text-green-400' : level === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>
                                    {level}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Tags Section */}
            <div className="mb-4">
                <div className="flex items-center justify-between cursor-pointer mb-3" onClick={() => toggleSection('tags')}>
                    <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide">TAGS</h3>
                    {expandedSections.tags ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </div>
                {expandedSections.tags && (
                    <div>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {selectedTags.map((tag) => (
                                <span key={tag} className="bg-purple-600 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                                    <span>{tag}</span>
                                    <X size={12} className="cursor-pointer hover:text-gray-300" onClick={() => removeTag(tag)} />
                                </span>
                            ))}
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Filter tags..."
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-white"
                            />
                            {tagInput && filteredTags.length > 0 && (
                                <div className="absolute top-full left-0 right-0 bg-slate-700 border border-slate-600 rounded-b max-h-32 overflow-y-auto z-10">
                                    {filteredTags.map((tag) => (
                                        <div key={tag} className="px-3 py-2 text-sm cursor-pointer hover:bg-slate-600" onClick={() => addTag(tag)}>
                                            {tag}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Status Section */}
            <div className="mb-4">
                <div className="flex items-center justify-between cursor-pointer mb-3" onClick={() => toggleSection('status')}>
                    <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide">STATUS</h3>
                    {expandedSections.status ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </div>
                {expandedSections.status && (
                    <div className="grid grid-cols-2 gap-2">
                        {['All', 'Solved', 'Unsolved', 'Favorited'].map((status) => (
                            <button
                                key={status}
                                onClick={() => handleStatusChange(status)}
                                className={`px-3 py-2 rounded text-sm font-medium transition-colors ${selectedFilters.status[status]
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Companies Section */}
            <div className="mb-2">
                <div className="flex items-center justify-between cursor-pointer mb-3" onClick={() => toggleSection('companies')}>
                    <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide">COMPANIES</h3>
                    {expandedSections.companies ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </div>
                {expandedSections.companies && (
                    <div className="space-y-2">
                        {['Google', 'Amazon', 'Microsoft', 'Facebook'].map((company) => (
                            <label key={company} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedFilters.companies[company]}
                                    onChange={() => handleCompanyChange(company)}
                                    className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded"
                                />
                                <span className="text-sm text-gray-300">{company}</span>
                            </label>
                        ))}
                    </div>
                )}
                <button className="text-blue-400 text-sm mt-2 hover:text-blue-300">Show more</button>
            </div>

            {/* Reset Filters */}
            <button
                className="w-full bg-slate-700 hover:bg-slate-600 text-gray-300 px-3 py-1 rounded text-sm font-medium"
                onClick={() => {
                    setSelectedFilters({
                        difficulty: { Easy: true, Medium: true, Hard: true },
                        status: { All: true, Solved: false, Unsolved: false, Favorited: false },
                        companies: { Google: false, Amazon: false, Microsoft: false, Facebook: false }
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
