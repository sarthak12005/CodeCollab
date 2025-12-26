import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Users, Copy, Mic, MicOff, Video, VideoOff, X, Code } from 'lucide-react';
import ProblemDescription from '../components/SingleProblem/ProblemDescription';
import MonacoCodeEditor from '../components/SingleProblem/MonacoCodeEditor';
import '../styles/SingleProblem.css';
import OutputConsole from '../components/SingleProblem/OutputConsole';
import LanguageSelector from '../components/SingleProblem/LanguageSelector';
import CollaborationModal from '../components/Collaboration/CollaborationModal';
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';
import useDeviceDetection from '../hooks/useDeviceDetection';
import MobileRestrictionPage from '../components/MobileRestriction/MobileRestrictionPage';
import toast from 'react-hot-toast'

const API_URL = import.meta.env.VITE_API_ENDPOINT;

const SingleProblem = () => {
    const { problemId } = useParams();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const deviceInfo = useDeviceDetection();

    // Check if user is on mobile device and restrict access
    if (deviceInfo.isMobile || deviceInfo.isTablet) {
        return <MobileRestrictionPage />;
    }

    if (!problemId) {
        alert("problemId is required");
        navigate('/problem');
        return null;
    }

    const [code, setCode] = useState('// Loading problem template...');

    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);

    const [language, setLanguage] = useState('python');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [showCollabModal, setShowCollabModal] = useState(false);
    const [isCollaborating, setIsCollaborating] = useState(false);
    const [roomId, setRoomId] = useState('');
    const [participants, setParticipants] = useState([]);
    const [isVideoOn, setIsVideoOn] = useState(false);
    const [isAudioOn, setIsAudioOn] = useState(false);
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [lastExecutionSuccess, setLastExecutionSuccess] = useState(false);

    useEffect(() => {
        const fetchSingleProblem = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_URL}/problem/get-problem/${problemId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.data && response.data.problem) {
                    setProblem(response.data.problem);

                    // Set initial code from function template
                    const templates = response.data.problem.functionTemplates;
                    if (templates && templates[language]) {
                        setCode(templates[language]);
                    }
                }

            } catch (err) {
                alert("Failed to fetch problem details. Please try again later.");
                navigate('/problem');
            } finally {
                setLoading(false);
            }
        }

        fetchSingleProblem();

    }, [problemId, navigate, language]);

    // Update code when language changes
    useEffect(() => {
        if (problem?.functionTemplates && problem.functionTemplates[language]) {
            setCode(problem.functionTemplates[language]);
        }
    }, [language, problem]);

    const runCode = async () => {
        setIsRunning(true);
        setOutput('Running your code...\n');

        try {
            // Get the first test case for running
            const firstTestCase = problem?.testCases?.[0];
            const testInput = firstTestCase?.input || '';

            const response = await axios.post(`${API_URL}/code/execute`, {
                code: code,
                language: language,
                input: testInput,
                testCase: firstTestCase
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.success) {
                const output = response.data.output || '';
                const hasError = output.toLowerCase().includes('error') ||
                    output.toLowerCase().includes('exception') ||
                    output.toLowerCase().includes('traceback');

                if (hasError) {
                    setOutput(`${output}\n\nExecution Time: ${response.data.executionTime || 'N/A'}ms\nMemory Used: ${response.data.memory || 'N/A'}KB`);
                    setLastExecutionSuccess(false);
                } else {
                    // Test case validation
                    let testResult = '';
                    if (firstTestCase) {
                        const expectedOutput = firstTestCase.output.trim();
                        let actualOutput = output.trim();

                        // Remove "Result: " prefix if present
                        if (actualOutput.startsWith('Result: ')) {
                            actualOutput = actualOutput.substring(8);
                        }

                        // Try to parse and normalize JSON output
                        try {
                            const parsedActual = JSON.parse(actualOutput);
                            const parsedExpected = JSON.parse(expectedOutput);
                            actualOutput = JSON.stringify(parsedActual);
                            const normalizedExpected = JSON.stringify(parsedExpected);
                            const isMatch = actualOutput === normalizedExpected;

                            testResult = `\n\n📋 Test Case Validation:\n`;
                            testResult += `Input: ${firstTestCase.input}\n`;
                            testResult += `Expected: ${normalizedExpected}\n`;
                            testResult += `Your Output: ${actualOutput}\n`;
                            testResult += isMatch ?
                                `✅ Test Case PASSED` :
                                `❌ Test Case FAILED - Output doesn't match expected result`;
                        } catch (e) {
                            // Fallback to string comparison
                            const isMatch = actualOutput === expectedOutput;
                            testResult = `\n\n📋 Test Case Validation:\n`;
                            testResult += `Input: ${firstTestCase.input}\n`;
                            testResult += `Expected: ${expectedOutput}\n`;
                            testResult += `Your Output: ${actualOutput}\n`;
                            testResult += isMatch ?
                                `✅ Test Case PASSED` :
                                `❌ Test Case FAILED - Output doesn't match expected result`;
                        }
                    }

                    setOutput(`${output}\n\nExecution Time: ${response.data.executionTime || 'N/A'}ms\nMemory Used: ${response.data.memory || 'N/A'}KB${testResult}`);
                    setLastExecutionSuccess(true);
                }
            } else {
                setOutput(`Error: ${response.data.message}\n\n${response.data.output || 'No additional details'}`);
                setLastExecutionSuccess(false);
            }
        } catch (error) {
            setOutput(`Failed to execute code\n\nError: ${error.response?.data?.message || error.message}`);
            setLastExecutionSuccess(false);
        } finally {
            setIsRunning(false);
        }
    };

    const handleSubmit = () => {
        if (!lastExecutionSuccess) {
            alert('Please run your code successfully before submitting!');
            return;
        }
        setShowSubmitModal(true);
    };

    // const submitSolution = async () => {
    //     setIsSubmitting(true);
    //     try {
    //         // Test the code with multiple test cases first
    //         const testCases = problem?.testCases || [];

    //         if (testCases.length === 0) {
    //             alert('No test cases available for this problem.');
    //             setIsSubmitting(false);
    //             return;
    //         }

    //         const testResponse = await axios.post(`${API_URL}/code/test`, {
    //             code: code,
    //             language: language,
    //             testCases: testCases
    //         }, {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem('token')}`
    //             }
    //         });

    //         if (testResponse.data.success) {
    //             const { allTestsPassed, summary, results } = testResponse.data;

    //             // Submit the solution regardless of test results
    //             const submitResponse = await axios.post(`${API_URL}/problem/submission/submit`, {
    //                 problemId: problemId,
    //                 code: code,
    //                 language: language,
    //                 status: allTestsPassed ? 'Accepted' : 'Wrong Answer',
    //                 testCasesPassed: summary.passed,
    //                 totalTestCases: summary.total,
    //                 executionTime: results[0]?.executionTime || 0,
    //                 runtime: results[0]?.executionTime || 0,
    //                 memory: 0 // Not available in local execution
    //             }, {
    //                 headers: {
    //                     Authorization: `Bearer ${localStorage.getItem('token')}`
    //                 }
    //             });

    //             if (submitResponse.data.success) {
    //                 // Show detailed results
    //                 let resultMessage = '';
    //                 if (allTestsPassed) {
    //                     resultMessage = `🎉 Congratulations! All ${summary.total} test cases passed!\n\n`;
    //                     resultMessage += `✅ Your solution is correct and has been submitted successfully.`;
    //                 } else {
    //                     resultMessage = `⚠️ ${summary.passed}/${summary.total} test cases passed.\n\n`;
    //                     resultMessage += `❌ ${summary.failed} test case(s) failed. Please review your solution.`;
    //                 }

    //                 // Show test case details
    //                 if (results && results.length > 0) {
    //                     resultMessage += '\n\nTest Case Results:\n';
    //                     results.forEach((result, index) => {
    //                         const status = result.passed ? '✅' : '❌';
    //                         resultMessage += `${status} Test Case ${index + 1}: ${result.passed ? 'PASSED' : 'FAILED'}\n`;
    //                         if (!result.passed) {
    //                             resultMessage += `   Expected: ${result.expected}\n`;
    //                             resultMessage += `   Your Output: ${result.actual}\n`;
    //                         }
    //                     });
    //                 }

    //                 toast.success(resultMessage);
    //                 setShowSubmitModal(false);

    //                 // Refresh the problem to show updated solved status
    //                 if (allTestsPassed) {
    //                     window.location.reload();
    //                 }
    //             } else {
    //                 alert('Failed to submit solution. Please try again.');
    //             }
    //         } else {
    //             alert('Failed to test solution. Please try again.');
    //         }
    //     } catch (error) {
    //         alert(`Failed to submit solution: ${error.response?.data?.message || error.message}`);
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };


    const submitSolution = async () => {
        setIsSubmitting(true);

        const promise = (async () => {
            const testCases = problem?.testCases || [];

            if (testCases.length === 0) {
                throw new Error('No test cases available for this problem.');
            }

            // Step 1: Run tests
            const testResponse = await axios.post(`${API_URL}/code/test`, {
                code,
                language,
                testCases
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!testResponse.data.success) {
                throw new Error('Failed to test solution.');
            }

            const { allTestsPassed, summary, results } = testResponse.data;

            // Step 2: Submit the solution
            const submitResponse = await axios.post(`${API_URL}/problem/submission/submit`, {
                problemId,
                code,
                language,
                status: allTestsPassed ? 'Accepted' : 'Wrong Answer',
                testCasesPassed: summary.passed,
                totalTestCases: summary.total,
                executionTime: results[0]?.executionTime || 0,
                runtime: results[0]?.executionTime || 0,
                memory: 0
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!submitResponse.data.success) {
                throw new Error('Failed to submit solution.');
            }

            // Success Message
            let resultMessage = '';
            if (allTestsPassed) {
                resultMessage = `🎉 All ${summary.total} test cases passed!\n✅ Solution accepted.`;
            } else {
                resultMessage = `⚠️ ${summary.passed}/${summary.total} test cases passed.\n❌ Some failed, please review your code.`;
            }

            toast.success(resultMessage);
            setShowSubmitModal(false);

            if (allTestsPassed) window.location.reload();

            return 'Solution submitted successfully!';
        })();

        // Step 3: Use toast.promise for visual feedback
        toast.promise(
            promise,
            {
                loading: 'Submitting your solution...',
                success: <b>✅ Solution submitted!</b>,
                error: (err) => <b>❌ {err.message}</b>,
            }
        );

        try {
            await promise;
        } catch (err) {
        } finally {
            setIsSubmitting(false);
        }
    };


    const createRoom = () => {
        const newRoomId = Math.random().toString(36).substring(2, 11);
        setRoomId(newRoomId);
        setIsCollaborating(true);
        setShowCollabModal(false);
        setParticipants([{ id: 1, name: 'You', avatar: '👤' }]);
    };

    const joinRoom = () => {
        if (roomId.trim()) {
            setIsCollaborating(true);
            setShowCollabModal(false);
            setParticipants([
                { id: 1, name: 'You', avatar: '👤' },
                { id: 2, name: 'Collaborator', avatar: '👥' }
            ]);
        }
    };

    const copyRoomLink = () => {
        navigator.clipboard.writeText(`https://codecollab.com/room/${roomId}`);
    };

    // Show loading state while fetching problem
    if (loading) {
        return (
            <div className={`min-h-screen ${theme.bg.primary} ${theme.text.primary} flex flex-col`}>
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center space-y-6">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-20 w-20 border-4 border-indigo-200 border-t-indigo-600 mx-auto"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-8 h-8 bg-indigo-600 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className={`text-xl font-semibold ${theme.text.primary}`}>Loading Problem</h3>
                            <p className={`${theme.text.secondary} text-sm`}>Fetching problem details and templates...</p>
                        </div>
                        <div className="flex justify-center space-x-1">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Show error state if problem failed to load
    if (!problem) {
        return (
            <div className={`min-h-screen ${theme.bg.primary} ${theme.text.primary} flex flex-col`}>
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center space-y-6 max-w-md mx-auto px-6">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold text-red-400">Problem Not Found</h3>
                            <p className={`${theme.text.secondary} text-sm`}>
                                We couldn't load the problem details. This might be due to a network issue or the problem may not exist.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={() => window.location.reload()}
                                className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg text-white font-medium transition-colors"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => navigate('/problem')}
                                className={`${theme.bg.secondary} hover:${theme.bg.tertiary} px-6 py-2 rounded-lg ${theme.text.primary} font-medium transition-colors border ${theme.border.primary}`}
                            >
                                Back to Problems
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${theme.bg.primary} ${theme.text.primary} flex flex-col`}>
            {/* Problem Header - Enhanced */}
            <div className={`${theme.bg.secondary} border-b ${theme.border.primary} px-6 py-4 shadow-sm`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <h1 className={`text-lg font-bold ${theme.text.primary} truncate max-w-md`}>
                                {problem?.title || 'Loading...'}
                            </h1>
                            <span className={`text-xs px-3 py-1 rounded-full font-semibold text-white ${problem?.difficulty === 'Easy' ? 'bg-green-500' :
                                    problem?.difficulty === 'Medium' ? 'bg-yellow-500' :
                                        'bg-red-500'
                                }`}>
                                {problem?.difficulty || 'Easy'}
                            </span>
                        </div>
                        {problem?.tags && problem.tags.length > 0 && (
                            <div className="hidden md:flex items-center gap-2">
                                {problem.tags.slice(0, 3).map((tag, index) => (
                                    <span key={index} className={`text-xs px-2 py-1 rounded ${theme.bg.tertiary} ${theme.text.secondary}`}>
                                        {tag}
                                    </span>
                                ))}
                                {problem.tags.length > 3 && (
                                    <span className={`text-xs ${theme.text.secondary}`}>+{problem.tags.length - 3} more</span>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate(`/problems/${problemId}/submissions`)}
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:shadow-lg"
                        >
                            <Code size={16} />
                            <span className="hidden sm:inline">View Submissions</span>
                        </button>
                        <button
                            onClick={() => setShowCollabModal(true)}
                            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:shadow-lg"
                        >
                            <Users size={16} />
                            <span className="hidden sm:inline">Collaborate</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content - Enhanced Layout */}
            <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 140px)' }}>
                {/* Left Sidebar - Problem Description */}
                <div className={`w-2/5 min-w-[380px] max-w-[480px] ${theme.bg.secondary} border-r ${theme.border.primary} flex flex-col shadow-lg`}>
                    <div className={`${theme.bg.tertiary} px-4 py-3 border-b ${theme.border.primary}`}>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <h2 className={`font-semibold ${theme.text.primary}`}>Problem Description</h2>
                        </div>
                    </div>
                    <div className="flex-1 overflow-hidden hide-scrollbar">
                        <ProblemDescription problem={problem} />
                    </div>
                </div>

                {/* Center - Code Editor and Output */}
                <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                    {/* Editor Header - Enhanced */}
                    <div className={`${theme.bg.tertiary} px-4 py-3 border-b ${theme.border.primary} flex items-center justify-between shadow-sm flex-shrink-0`}>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className={`font-medium ${theme.text.primary}`}>Code Editor</span>
                            </div>
                            <LanguageSelector language={language} setLanguage={setLanguage} />
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={runCode}
                                disabled={isRunning}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${isRunning
                                        ? 'bg-gray-600 cursor-not-allowed opacity-70'
                                        : 'bg-green-600 hover:bg-green-700 hover:shadow-lg transform hover:scale-105'
                                    }`}
                            >
                                {isRunning ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                )}
                                <span className="hidden sm:inline">{isRunning ? 'Running...' : 'Run Code'}</span>
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={!lastExecutionSuccess}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${lastExecutionSuccess
                                        ? 'bg-purple-600 hover:bg-purple-700 hover:shadow-lg transform hover:scale-105'
                                        : 'bg-gray-600 cursor-not-allowed opacity-70'
                                    }`}
                                title={!lastExecutionSuccess ? 'Run your code successfully first' : 'Submit your solution'}
                            >
                                <span className="hidden sm:inline">Submit</span>
                                <span className="sm:hidden">Submit</span>
                            </button>
                        </div>
                    </div>

                    {/* Code Editor - Enhanced */}
                    <div className={`${theme.bg.primary} overflow-hidden relative`} style={{ height: '60%' }}>
                        <div className="absolute inset-0 overflow-y-auto hide-scrollbar" >
                            <MonacoCodeEditor
                                code={code}
                                setCode={setCode}
                                language={language}
                            />
                        </div>
                    </div>

                    {/* Output Console - Enhanced */}
                    <div className={`${theme.bg.secondary} border-t ${theme.border.primary} relative`} style={{ height: '40%' }}>
                        <OutputConsole
                            output={output}
                            isRunning={isRunning}
                            onClearOutput={() => setOutput('')}
                        />
                    </div>
                </div>

                {/* Right Sidebar - Collaboration */}
                {isCollaborating && (
                    <div className="w-100 bg-slate-800 border-l border-slate-700 flex flex-col">
                        <div className="p-4 border-b border-slate-700">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold text-white">Video Call</h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-400">{participants.length} participants</span>
                                    <button
                                        onClick={copyRoomLink}
                                        className="text-blue-400 hover:text-blue-300"
                                    >
                                        <Copy size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Video Area */}
                            <div className="bg-slate-700 rounded-lg h-40 flex items-center justify-center mb-4">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-2xl mb-2">
                                        👤
                                    </div>
                                    <p className="text-sm text-gray-300">Waiting for peers...</p>
                                </div>
                            </div>

                            {/* Video Controls */}
                            <div className="flex justify-center gap-2 mb-4">
                                <button
                                    onClick={() => setIsAudioOn(!isAudioOn)}
                                    className={`p-2 rounded-lg ${isAudioOn ? 'bg-green-600' : 'bg-red-600'
                                        }`}
                                >
                                    {isAudioOn ? <Mic size={16} /> : <MicOff size={16} />}
                                </button>
                                <button
                                    onClick={() => setIsVideoOn(!isVideoOn)}
                                    className={`p-2 rounded-lg ${isVideoOn ? 'bg-green-600' : 'bg-red-600'
                                        }`}
                                >
                                    {isVideoOn ? <Video size={16} /> : <VideoOff size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Chat */}
                        <div className="p-4">
                            <h3 className="font-semibold mb-3 text-white">Chat</h3>
                            <div className="bg-slate-700 rounded-lg p-3 mb-3">
                                <div className="text-sm text-gray-300">
                                    <span className="font-medium text-blue-400">System:</span> Room created! Share the link to invite collaborators.
                                </div>
                            </div>
                            <div className="text-sm text-gray-400">
                                Room ID: {roomId}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Collaboration Modal */}
            <CollaborationModal
                isOpen={showCollabModal}
                onClose={() => setShowCollabModal(false)}
                problem={problem}
                code={code}
                language={language}
                onCodeChange={setCode}
                onLanguageChange={setLanguage}
            />

            {/* Submit Modal */}
            {showSubmitModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-slate-800 rounded-lg p-6 w-96 max-w-md mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">Submit Solution</h3>
                            <button
                                onClick={() => setShowSubmitModal(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="text-sm text-gray-300">
                                <p>Are you sure you want to submit your solution?</p>
                                <p className="mt-2 text-yellow-400">
                                    ⚠️ Your code will be tested against all test cases.
                                </p>
                            </div>

                            <div className="bg-slate-700 rounded-lg p-3">
                                <div className="text-xs text-gray-400 mb-1">Language:</div>
                                <div className="text-sm text-white">{language.toUpperCase()}</div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowSubmitModal(false)}
                                    className="flex-1 bg-gray-600 hover:bg-gray-700 py-2 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={submitSolution}
                                    disabled={isSubmitting}
                                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-800 py-2 rounded-lg text-sm font-medium transition-colors"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleProblem;