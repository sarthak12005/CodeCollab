import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Filter, Building, Calendar, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/Header';

const Interview = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [questions, setQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCompany, setSelectedCompany] = useState('all');
    const [selectedYear, setSelectedYear] = useState('all');
    const [loading, setLoading] = useState(true);

    // API base URL
    const API_BASE_URL = import.meta.env.VITE_API_ENDPOINT;

    const companies = ['all', 'Google', 'Amazon', 'Microsoft', 'Apple', 'Meta', 'Netflix'];
    const years = ['all', '2024', '2023', '2022'];

    // Fetch questions from API
    const fetchQuestions = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/preparation/interview`);
            const data = await response.json();

            if (data.success) {
                setQuestions(data.data);
                setFilteredQuestions(data.data);
            } else {
                console.error('Failed to fetch questions:', data.message);
                // Fallback to sample data for now
                const sampleQuestions = [
                    {
                        _id: 1,
                        company: 'Google',
                        question: 'Tell me about yourself and why you want to work at Google.',
                        category: 'Behavioral',
                        year: '2024',
                        tags: ['behavioral', 'introduction'],
                        difficulty: 'Easy'
                    },
                    {
                        _id: 2,
                        company: 'Amazon',
                        question: 'Describe a time when you had to work with a difficult team member.',
                        category: 'Behavioral',
                        year: '2024',
                        tags: ['leadership', 'teamwork'],
                        difficulty: 'Medium'
                    },
                    {
                        _id: 3,
                        company: 'Microsoft',
                        question: 'How would you design a system to handle millions of users?',
                        category: 'System Design',
                        year: '2023',
                        tags: ['system-design', 'scalability'],
                        difficulty: 'Hard'
                    }
                ];
                setQuestions(sampleQuestions);
                setFilteredQuestions(sampleQuestions);
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
            // Fallback to sample data
            const sampleQuestions = [
                {
                    _id: 1,
                    company: 'Google',
                    question: 'Tell me about yourself and why you want to work at Google.',
                    category: 'Behavioral',
                    year: '2024',
                    tags: ['behavioral', 'introduction'],
                    difficulty: 'Easy'
                },
                {
                    _id: 2,
                    company: 'Amazon',
                    question: 'Describe a time when you had to work with a difficult team member.',
                    category: 'Behavioral',
                    year: '2024',
                    tags: ['leadership', 'teamwork'],
                    difficulty: 'Medium'
                }
            ];
            setQuestions(sampleQuestions);
            setFilteredQuestions(sampleQuestions);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    useEffect(() => {
        let filtered = questions;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(q => 
                q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                q.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                q.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by company
        if (selectedCompany !== 'all') {
            filtered = filtered.filter(q => q.company === selectedCompany);
        }

        // Filter by year
        if (selectedYear !== 'all') {
            filtered = filtered.filter(q => q.year === selectedYear);
        }

        setFilteredQuestions(filtered);
    }, [searchTerm, selectedCompany, selectedYear, questions]);

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Easy': return 'bg-green-100 text-green-800';
            case 'Medium': return 'bg-yellow-100 text-yellow-800';
            case 'Hard': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Behavioral': return 'bg-blue-100 text-blue-800';
            case 'Technical': return 'bg-purple-100 text-purple-800';
            case 'System Design': return 'bg-indigo-100 text-indigo-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className={`min-h-screen ${theme.bg.primary} flex items-center justify-center`}>
                <Header />
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className={theme.text.secondary}>Loading interview questions...</p>
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
                        <h1 className={`text-3xl font-bold ${theme.text.primary}`}>Interview Questions</h1>
                        <p className={`${theme.text.secondary} mt-2`}>Practice real interview questions from top tech companies</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className={`${theme.bg.card} rounded-lg ${theme.shadow.sm} p-6 mb-6`}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme.text.tertiary} w-5 h-5`} />
                            <input
                                type="text"
                                placeholder="Search questions..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`w-full pl-10 pr-4 py-2 rounded-lg ${theme.input.base}`}
                            />
                        </div>

                        {/* Company Filter */}
                        <div className="relative">
                            <Building className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme.text.tertiary} w-5 h-5`} />
                            <select
                                value={selectedCompany}
                                onChange={(e) => setSelectedCompany(e.target.value)}
                                className={`w-full pl-10 pr-4 py-2 rounded-lg ${theme.input.base} appearance-none`}
                            >
                                {companies.map(company => (
                                    <option key={company} value={company}>
                                        {company === 'all' ? 'All Companies' : company}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Year Filter */}
                        <div className="relative">
                            <Calendar className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme.text.tertiary} w-5 h-5`} />
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className={`w-full pl-10 pr-4 py-2 rounded-lg ${theme.input.base} appearance-none`}
                            >
                                {years.map(year => (
                                    <option key={year} value={year}>
                                        {year === 'all' ? 'All Years' : year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        Showing {filteredQuestions.length} of {questions.length} questions
                    </p>
                </div>

                {/* Questions List */}
                <div className="space-y-4">
                    {filteredQuestions.map((question) => (
                        <div key={question._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                        {question.company}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(question.category)}`}>
                                        {question.category}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(question.difficulty)}`}>
                                        {question.difficulty}
                                    </span>
                                </div>
                                <span className="text-gray-500 text-sm">{question.year}</span>
                            </div>

                            <h3 className="text-lg font-medium text-gray-900 mb-3">
                                {question.question}
                            </h3>

                            <div className="flex items-center space-x-2">
                                <Tag className="w-4 h-4 text-gray-400" />
                                <div className="flex flex-wrap gap-2">
                                    {question.tags.map((tag, index) => (
                                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredQuestions.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <Search className="w-12 h-12 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
                        <p className="text-gray-600">Try adjusting your search criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Interview;
