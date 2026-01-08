import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Calculator, Code, ArrowRight, Users, Trophy, Clock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';
import useDeviceDetection from '../hooks/useDeviceDetection';

const Preparation = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const deviceInfo = useDeviceDetection();

    const categories = [
        {
            id: 'interview',
            title: 'Interview Questions',
            description: 'Practice real interview questions from top companies like Google, Amazon, Microsoft, and more.',
            icon: Brain,
            color: 'from-blue-500 to-blue-600',
            hoverColor: 'hover:from-blue-600 hover:to-blue-700',
            stats: '500+ Questions',
            companies: ['Google', 'Amazon', 'Microsoft', 'Apple'],
            route: '/preparation/interview'
        },
        {
            id: 'aptitude',
            title: 'Aptitude Tests',
            description: 'Master quantitative, logical, and verbal reasoning with practice tests from top recruiters.',
            icon: Calculator,
            color: 'from-green-500 to-green-600',
            hoverColor: 'hover:from-green-600 hover:to-green-700',
            stats: '300+ Questions',
            companies: ['TCS', 'Infosys', 'Wipro', 'Accenture'],
            route: '/preparation/aptitude'
        },
        {
            id: 'Technical',
            title: 'Technical Questions',
            description: 'Solve Technical Question from basic to advanced level. Perfect for technical interviews.',
            icon: Code,
            color: 'from-purple-500 to-purple-600',
            hoverColor: 'hover:from-purple-600 hover:to-purple-700',
            stats: '800+ Problems',
            companies: ['LeetCode', 'HackerRank', 'CodeChef', 'Codeforces'],
            route: '/preparation/coding'
        }
    ];

    const handleCategoryClick = (route) => {
        navigate(route);
    };

    return (
        <div className={`min-h-screen ${theme.bg.primary}`}>
            <Header />

            <div className="max-w-7xl mx-auto mobile-padding sm:px-6 lg:px-8 py-6 sm:py-8">

                {/* Category Cards */}
                <div className="responsive-grid gap-6 sm:gap-8">
                    {categories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                            <div
                                key={category.id}
                                onClick={() => handleCategoryClick(category.route)}
                                className={`${theme.bg.card} rounded-xl ${theme.shadow.lg} hover:${theme.shadow.lg} transition-all duration-300 cursor-pointer transform hover:-translate-y-1 sm:hover:-translate-y-2 group`}
                            >
                                {/* Card Header with Gradient */}
                                <div className={`bg-gradient-to-r ${category.color} ${category.hoverColor} p-4 sm:p-6 rounded-t-xl transition-all duration-300`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2 sm:space-x-3">
                                            <div className="bg-white bg-opacity-20 p-2 sm:p-3 rounded-lg">
                                                <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg sm:text-xl font-bold text-white">{category.title}</h3>
                                                <p className="text-white text-opacity-90 text-xs sm:text-sm">{category.stats}</p>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:translate-x-1 transition-transform duration-300" />
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-6">
                                    <p className={`${theme.text.secondary} mb-4 leading-relaxed`}>
                                        {category.description}
                                    </p>

                                    {/* Company Tags */}
                                    <div className="mb-4">
                                        <p className={`text-sm font-medium ${theme.text.primary} mb-2`}>Featured Companies:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {category.companies.map((company, index) => (
                                                <span
                                                    key={index}
                                                    className={`px-3 py-1 ${theme.bg.tertiary} ${theme.text.secondary} text-xs rounded-full font-medium`}
                                                >
                                                    {company}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <button className={`w-full bg-gradient-to-r ${category.color} ${category.hoverColor} text-white py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg`}>
                                        <span>Start Practicing</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Additional Features Section */}
                <div className={`mt-16 ${theme.bg.card} rounded-xl ${theme.shadow.lg} p-8`}>
                    <h2 className={`text-2xl font-bold ${theme.text.primary} text-center mb-8`}>
                        Why Choose Our Preparation Platform?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Brain className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className={`font-semibold ${theme.text.primary} mb-2`}>Real Questions</h3>
                            <p className="text-gray-600 text-sm">Actual questions from recent interviews</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Trophy className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className={`font-semibold ${theme.text.primary} mb-2`}>Track Progress</h3>
                            <p className="text-gray-600 text-sm">Monitor your improvement over time</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Code className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className={`font-semibold ${theme.text.primary} mb-2`}>Multiple Formats</h3>
                            <p className="text-gray-600 text-sm">MCQs, coding problems, and more</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className={`font-semibold ${theme.text.primary} mb-2`}>Community</h3>
                            <p className="text-gray-600 text-sm">Learn with thousands of students</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preparation;
