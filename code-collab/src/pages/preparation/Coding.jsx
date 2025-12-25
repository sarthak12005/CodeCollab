import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Filter, Code, Clock, Trophy, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/Header';

const Coding = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [problems, setProblems] = useState([]);
    const [filteredProblems, setFilteredProblems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);

    // Sample coding problems
    const sampleProblems = [
        {
            id: 1,
            title: 'Two Sum',
            description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
            difficulty: 'Easy',
            category: 'Array',
            tags: ['array', 'hash-table'],
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(n)',
            acceptanceRate: 85,
            companies: ['Amazon', 'Google', 'Microsoft'],
            sampleInput: 'nums = [2,7,11,15], target = 9',
            sampleOutput: '[0,1]',
            explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
        },
        {
            id: 2,
            title: 'Reverse Linked List',
            description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
            difficulty: 'Easy',
            category: 'Linked List',
            tags: ['linked-list', 'recursion'],
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            acceptanceRate: 78,
            companies: ['Facebook', 'Apple', 'Netflix'],
            sampleInput: 'head = [1,2,3,4,5]',
            sampleOutput: '[5,4,3,2,1]',
            explanation: 'Reverse the linked list by changing the direction of pointers.'
        },
        {
            id: 3,
            title: 'Binary Tree Level Order Traversal',
            description: 'Given the root of a binary tree, return the level order traversal of its nodes\' values.',
            difficulty: 'Medium',
            category: 'Tree',
            tags: ['tree', 'breadth-first-search', 'binary-tree'],
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(n)',
            acceptanceRate: 65,
            companies: ['Amazon', 'Microsoft', 'Google'],
            sampleInput: 'root = [3,9,20,null,null,15,7]',
            sampleOutput: '[[3],[9,20],[15,7]]',
            explanation: 'Use BFS to traverse level by level.'
        },
        {
            id: 4,
            title: 'Merge k Sorted Lists',
            description: 'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.',
            difficulty: 'Hard',
            category: 'Linked List',
            tags: ['linked-list', 'divide-and-conquer', 'heap', 'merge-sort'],
            timeComplexity: 'O(n log k)',
            spaceComplexity: 'O(1)',
            acceptanceRate: 45,
            companies: ['Google', 'Amazon', 'Facebook'],
            sampleInput: 'lists = [[1,4,5],[1,3,4],[2,6]]',
            sampleOutput: '[1,1,2,3,4,4,5,6]',
            explanation: 'Use divide and conquer or priority queue approach.'
        },
        {
            id: 5,
            title: 'Valid Parentheses',
            description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
            difficulty: 'Easy',
            category: 'Stack',
            tags: ['string', 'stack'],
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(n)',
            acceptanceRate: 92,
            companies: ['Amazon', 'Microsoft', 'Google'],
            sampleInput: 's = "()[]{}"',
            sampleOutput: 'true',
            explanation: 'Use stack to match opening and closing brackets.'
        }
    ];

    const difficulties = ['all', 'Easy', 'Medium', 'Hard'];
    const categories = ['all', 'Array', 'Linked List', 'Tree', 'Stack', 'String', 'Dynamic Programming'];

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setProblems(sampleProblems);
            setFilteredProblems(sampleProblems);
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        let filtered = problems;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(p => 
                p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Filter by difficulty
        if (selectedDifficulty !== 'all') {
            filtered = filtered.filter(p => p.difficulty === selectedDifficulty);
        }

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        setFilteredProblems(filtered);
    }, [searchTerm, selectedDifficulty, selectedCategory, problems]);

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
            case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getAcceptanceColor = (rate) => {
        if (rate >= 80) return 'text-green-600';
        if (rate >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    if (loading) {
        return (
            <div className={`min-h-screen ${theme.bg.primary} flex items-center justify-center`}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className={theme.text.secondary}>Loading Technical Questions...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${theme.bg.primary}`}>
            <Header />

            {/* Header */}
            <div className={`${theme.bg.secondary} ${theme.shadow.sm}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => navigate('/preparation')}
                                className={`flex items-center space-x-2 ${theme.text.secondary} hover:${theme.text.primary.replace('text-', '')} transition-colors`}
                            >
                                <ArrowLeft className="w-5 h-5" />
                                <span>Back to Preparation</span>
                            </button>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h1 className={`text-3xl font-bold ${theme.text.primary}`}>Coding Practice</h1>
                        <p className={`${theme.text.secondary} mt-2`}>Solve coding problems from basic to advanced level</p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow-sm p-4 text-center">
                        <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mx-auto mb-2">
                            <Target className="w-5 h-5 text-green-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">{problems.filter(p => p.difficulty === 'Easy').length}</h3>
                        <p className="text-gray-600 text-sm">Easy Problems</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-4 text-center">
                        <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg mx-auto mb-2">
                            <Clock className="w-5 h-5 text-yellow-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">{problems.filter(p => p.difficulty === 'Medium').length}</h3>
                        <p className="text-gray-600 text-sm">Medium Problems</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-4 text-center">
                        <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-lg mx-auto mb-2">
                            <Trophy className="w-5 h-5 text-red-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">{problems.filter(p => p.difficulty === 'Hard').length}</h3>
                        <p className="text-gray-600 text-sm">Hard Problems</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-4 text-center">
                        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mx-auto mb-2">
                            <Code className="w-5 h-5 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">{problems.length}</h3>
                        <p className="text-gray-600 text-sm">Total Problems</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search problems..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Difficulty Filter */}
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                                value={selectedDifficulty}
                                onChange={(e) => setSelectedDifficulty(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                            >
                                {difficulties.map(difficulty => (
                                    <option key={difficulty} value={difficulty}>
                                        {difficulty === 'all' ? 'All Difficulties' : difficulty}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Category Filter */}
                        <div className="relative">
                            <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category === 'all' ? 'All Categories' : category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        Showing {filteredProblems.length} of {problems.length} problems
                    </p>
                </div>

                {/* Problems List */}
                <div className="space-y-4">
                    {filteredProblems.map((problem) => (
                        <div key={problem.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                                            {problem.title}
                                        </h3>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                                            {problem.difficulty}
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                            {problem.category}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mb-4 leading-relaxed">
                                        {problem.description}
                                    </p>
                                </div>
                                <div className="text-right ml-4">
                                    <div className={`text-lg font-bold ${getAcceptanceColor(problem.acceptanceRate)}`}>
                                        {problem.acceptanceRate}%
                                    </div>
                                    <div className="text-gray-500 text-sm">Acceptance</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-1">Sample Input:</h4>
                                    <code className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm">
                                        {problem.sampleInput}
                                    </code>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-1">Sample Output:</h4>
                                    <code className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm">
                                        {problem.sampleOutput}
                                    </code>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <span>Time: {problem.timeComplexity}</span>
                                    <span>Space: {problem.spaceComplexity}</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {problem.tags.map((tag, index) => (
                                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-wrap gap-2">
                                        {problem.companies.map((company, index) => (
                                            <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                                                {company}
                                            </span>
                                        ))}
                                    </div>
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                        Solve Problem
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProblems.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <Search className="w-12 h-12 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No problems found</h3>
                        <p className="text-gray-600">Try adjusting your search criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Coding;
