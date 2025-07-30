import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, XCircle, ArrowLeft, Code, User, HardDrive } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_ENDPOINT;

const SubmissionResults = () => {
    const { problemId } = useParams();
    const navigate = useNavigate();
    const [submissions, setSubmissions] = useState([]);
    const [userSubmission, setUserSubmission] = useState(null);
    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubmissionData();
    }, [problemId]);

    const fetchSubmissionData = async () => {
        try {
            setLoading(true);
            
            // Fetch problem details
            const problemResponse = await axios.get(`${API_URL}/problem/get-problem/${problemId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setProblem(problemResponse.data.problem);

            // Fetch all submissions for this problem
            const submissionsResponse = await axios.get(`${API_URL}/problem/submissions/${problemId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (submissionsResponse.data.success) {
                setSubmissions(submissionsResponse.data.submissions);
                setUserSubmission(submissionsResponse.data.userSubmission);
            }
        } catch (error) {
            console.error('Error fetching submission data:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Accepted': return 'text-green-400';
            case 'Wrong Answer': return 'text-red-400';
            case 'Runtime Error': return 'text-orange-400';
            case 'Time Limit Exceeded': return 'text-yellow-400';
            default: return 'text-gray-400';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Accepted': return <CheckCircle size={16} className="text-green-400" />;
            default: return <XCircle size={16} className="text-red-400" />;
        }
    };

    const formatTime = (ms) => {
        if (ms < 1000) return `${ms}ms`;
        return `${(ms / 1000).toFixed(2)}s`;
    };

    const getLanguageColor = (language) => {
        const colors = {
            python: 'bg-blue-600',
            javascript: 'bg-yellow-600',
            java: 'bg-red-600',
            cpp: 'bg-purple-600',
            c: 'bg-gray-600'
        };
        return colors[language] || 'bg-gray-600';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p>Loading submission results...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            {/* Header */}
            <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(`/problems/singleProblem/${problemId}`)}
                            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft size={20} />
                            Back to Problem
                        </button>
                        <h1 className="text-xl font-bold">{problem?.title} - Submissions</h1>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                {/* User's Latest Submission */}
                {userSubmission && (
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <User size={20} />
                            Your Latest Submission
                        </h2>
                        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                <div className="flex items-center gap-2">
                                    {getStatusIcon(userSubmission.status)}
                                    <span className={`font-medium ${getStatusColor(userSubmission.status)}`}>
                                        {userSubmission.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} className="text-gray-400" />
                                    <span>{formatTime(userSubmission.executionTime)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <HardDrive size={16} className="text-gray-400" />
                                    <span>{userSubmission.memory || 'N/A'} KB</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-1 rounded text-xs ${getLanguageColor(userSubmission.language)} text-white`}>
                                        {userSubmission.language.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                            <div className="text-sm text-gray-400 mb-2">
                                Test Cases: {userSubmission.testCasesPassed}/{userSubmission.totalTestCases} passed
                            </div>
                            <div className="text-xs text-gray-500">
                                Submitted: {new Date(userSubmission.createdAt).toLocaleString()}
                            </div>
                        </div>
                    </div>
                )}

                {/* All Submissions */}
                <div>
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Code size={20} />
                        All Submissions ({submissions.length})
                    </h2>
                    
                    {submissions.length === 0 ? (
                        <div className="bg-slate-800 rounded-lg p-8 text-center border border-slate-700">
                            <p className="text-gray-400">No submissions yet for this problem.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {submissions.map((submission, index) => (
                                <div key={submission._id} className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-colors">
                                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-400 text-sm">#{submissions.length - index}</span>
                                            <span className="font-medium">{submission.username}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(submission.status)}
                                            <span className={`text-sm ${getStatusColor(submission.status)}`}>
                                                {submission.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock size={14} className="text-gray-400" />
                                            <span className="text-sm">{formatTime(submission.executionTime)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <HardDrive size={14} className="text-gray-400" />
                                            <span className="text-sm">{submission.memory || 'N/A'} KB</span>
                                        </div>
                                        <div>
                                            <span className={`px-2 py-1 rounded text-xs ${getLanguageColor(submission.language)} text-white`}>
                                                {submission.language.toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {new Date(submission.createdAt).toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="mt-2 text-xs text-gray-400">
                                        Test Cases: {submission.testCasesPassed}/{submission.totalTestCases} passed
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Statistics */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                        <h3 className="text-sm font-medium text-gray-400 mb-2">Total Submissions</h3>
                        <p className="text-2xl font-bold text-white">{submissions.length}</p>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                        <h3 className="text-sm font-medium text-gray-400 mb-2">Accepted Solutions</h3>
                        <p className="text-2xl font-bold text-green-400">
                            {submissions.filter(s => s.status === 'Accepted').length}
                        </p>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                        <h3 className="text-sm font-medium text-gray-400 mb-2">Acceptance Rate</h3>
                        <p className="text-2xl font-bold text-blue-400">
                            {submissions.length > 0 
                                ? Math.round((submissions.filter(s => s.status === 'Accepted').length / submissions.length) * 100)
                                : 0}%
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmissionResults;
