import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Clock, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/Header';

const Aptitude = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [testMode, setTestMode] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    // Sample aptitude questions
    const sampleQuestions = [
        {
            id: 1,
            category: 'Quantitative',
            question: 'If a train travels 120 km in 2 hours, what is its speed in km/h?',
            options: ['50 km/h', '60 km/h', '70 km/h', '80 km/h'],
            correctAnswer: 1,
            explanation: 'Speed = Distance / Time = 120 km / 2 hours = 60 km/h',
            difficulty: 'Easy',
            company: 'TCS'
        },
        {
            id: 2,
            category: 'Logical',
            question: 'What comes next in the sequence: 2, 6, 12, 20, 30, ?',
            options: ['40', '42', '44', '46'],
            correctAnswer: 1,
            explanation: 'The differences are 4, 6, 8, 10, so next difference is 12. 30 + 12 = 42',
            difficulty: 'Medium',
            company: 'Infosys'
        },
        {
            id: 3,
            category: 'Verbal',
            question: 'Choose the word that is most similar in meaning to "ABUNDANT":',
            options: ['Scarce', 'Plentiful', 'Limited', 'Rare'],
            correctAnswer: 1,
            explanation: 'Abundant means existing in large quantities; plentiful.',
            difficulty: 'Easy',
            company: 'Wipro'
        },
        {
            id: 4,
            category: 'Quantitative',
            question: 'A shopkeeper marks his goods 40% above cost price and gives a discount of 20%. What is his profit percentage?',
            options: ['10%', '12%', '15%', '20%'],
            correctAnswer: 1,
            explanation: 'Let CP = 100. MP = 140. SP = 140 × 0.8 = 112. Profit% = (112-100)/100 × 100 = 12%',
            difficulty: 'Medium',
            company: 'Accenture'
        },
        {
            id: 5,
            category: 'Logical',
            question: 'If all roses are flowers and some flowers are red, which conclusion is definitely true?',
            options: ['All roses are red', 'Some roses are red', 'No roses are red', 'Some roses may be red'],
            correctAnswer: 3,
            explanation: 'We cannot conclude that roses are definitely red, but they may be red since some flowers are red.',
            difficulty: 'Hard',
            company: 'Cognizant'
        }
    ];

    const categories = ['all', 'Quantitative', 'Logical', 'Verbal'];

    useEffect(() => {
        setQuestions(sampleQuestions);
    }, []);

    useEffect(() => {
        if (testMode && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (testMode && timeLeft === 0) {
            handleSubmitTest();
        }
    }, [timeLeft, testMode]);

    const filteredQuestions = selectedCategory === 'all' 
        ? questions 
        : questions.filter(q => q.category === selectedCategory);

    const startTest = () => {
        setTestMode(true);
        setCurrentQuestion(0);
        setSelectedAnswer('');
        setShowResult(false);
        setScore(0);
        setUserAnswers([]);
        setTimeLeft(filteredQuestions.length * 60); // 1 minute per question
    };

    const handleAnswerSelect = (answerIndex) => {
        setSelectedAnswer(answerIndex);
    };

    const handleNextQuestion = () => {
        const newUserAnswers = [...userAnswers];
        newUserAnswers[currentQuestion] = {
            selected: selectedAnswer,
            correct: selectedAnswer === filteredQuestions[currentQuestion].correctAnswer
        };
        setUserAnswers(newUserAnswers);

        if (selectedAnswer === filteredQuestions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }

        if (currentQuestion < filteredQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer('');
        } else {
            handleSubmitTest();
        }
    };

    const handleSubmitTest = () => {
        setTestMode(false);
        setShowResult(true);
    };

    const resetTest = () => {
        setTestMode(false);
        setCurrentQuestion(0);
        setSelectedAnswer('');
        setShowResult(false);
        setScore(0);
        setUserAnswers([]);
        setTimeLeft(0);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (showResult) {
        return (
            <div className={`min-h-screen ${theme.bg.primary}`}>
                <Header />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className={`${theme.bg.card} rounded-lg ${theme.shadow.lg} p-8 text-center`}>
                        <div className="mb-6">
                            {score >= filteredQuestions.length * 0.7 ? (
                                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                            ) : (
                                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                            )}
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Test Completed!</h2>
                            <p className="text-xl text-gray-600">
                                You scored {score} out of {filteredQuestions.length}
                            </p>
                            <p className="text-lg text-gray-500 mt-2">
                                {Math.round((score / filteredQuestions.length) * 100)}% accuracy
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            <div className="bg-green-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-green-800">Correct</h3>
                                <p className="text-2xl font-bold text-green-600">{score}</p>
                            </div>
                            <div className="bg-red-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-red-800">Incorrect</h3>
                                <p className="text-2xl font-bold text-red-600">{filteredQuestions.length - score}</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-blue-800">Total</h3>
                                <p className="text-2xl font-bold text-blue-600">{filteredQuestions.length}</p>
                            </div>
                        </div>

                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={resetTest}
                                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <RotateCcw className="w-5 h-5" />
                                <span>Try Again</span>
                            </button>
                            <button
                                onClick={() => navigate('/preparation')}
                                className="flex items-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                <span>Back to Preparation</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (testMode) {
        const question = filteredQuestions[currentQuestion];
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Test Header */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Question {currentQuestion + 1} of {filteredQuestions.length}
                                </h2>
                                <p className="text-gray-600">{question.category} • {question.difficulty}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2 text-orange-600">
                                    <Clock className="w-5 h-5" />
                                    <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
                                </div>
                                <div className="text-gray-600">
                                    Score: {score}/{currentQuestion}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Question */}
                    <div className="bg-white rounded-lg shadow-sm p-8">
                        <h3 className="text-xl font-medium text-gray-900 mb-6">
                            {question.question}
                        </h3>

                        <div className="space-y-3 mb-8">
                            {question.options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerSelect(index)}
                                    className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                                        selectedAnswer === index
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <span className="font-medium mr-3">
                                        {String.fromCharCode(65 + index)}.
                                    </span>
                                    {option}
                                </button>
                            ))}
                        </div>

                        <div className="flex justify-between">
                            <button
                                onClick={() => setTestMode(false)}
                                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                Exit Test
                            </button>
                            <button
                                onClick={handleNextQuestion}
                                disabled={selectedAnswer === ''}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                            >
                                {currentQuestion === filteredQuestions.length - 1 ? 'Submit Test' : 'Next Question'}
                            </button>
                        </div>
                    </div>
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
                        <h1 className={`text-3xl font-bold ${theme.text.primary}`}>Aptitude Tests</h1>
                        <p className={`${theme.text.secondary} mt-2`}>Practice quantitative, logical, and verbal reasoning questions</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Category Selection */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Select Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`p-4 rounded-lg border-2 transition-colors ${
                                    selectedCategory === category
                                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <div className="text-center">
                                    <h3 className="font-medium">
                                        {category === 'all' ? 'All Categories' : category}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {category === 'all' 
                                            ? `${questions.length} questions`
                                            : `${questions.filter(q => q.category === category).length} questions`
                                        }
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Start Test */}
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Ready to start your {selectedCategory === 'all' ? 'aptitude' : selectedCategory.toLowerCase()} test?
                    </h2>
                    <p className="text-gray-600 mb-6">
                        You'll have {filteredQuestions.length} questions with {filteredQuestions.length} minutes to complete.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-blue-800">Questions</h3>
                            <p className="text-2xl font-bold text-blue-600">{filteredQuestions.length}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-green-800">Time Limit</h3>
                            <p className="text-2xl font-bold text-green-600">{filteredQuestions.length} min</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-purple-800">Category</h3>
                            <p className="text-lg font-bold text-purple-600">
                                {selectedCategory === 'all' ? 'Mixed' : selectedCategory}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={startTest}
                        disabled={filteredQuestions.length === 0}
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-lg font-medium"
                    >
                        Start Test
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Aptitude;
