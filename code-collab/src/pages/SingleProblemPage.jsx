import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';
import { Users, Copy, Mic, MicOff, Video, VideoOff, X, Plus, LogIn } from 'lucide-react';
import ProblemDescription from '../components/SingleProblem/ProblemDescription';
import CodeEditor from '../components/SingleProblem/CodeEditor';
import OutputConsole from '../components/SingleProblem/OutputConsole';
import LanguageSelector from '../components/SingleProblem/LanguageSelector';

const API_URL = import.meta.env.VITE_API_ENDPOINT;

const SingleProblem = () => {
    const { problemId } = useParams();
    const navigate = useNavigate();

    if (!problemId) {
        alert("problemId is required");
        navigate('/problem');
        return null;
    }

    const [code, setCode] = useState(`class Solution:
    def twoSum(self, nums, target):
        # Your code here
        pass`);

    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);

    const [language, setLanguage] = useState('java');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [showCollabModal, setShowCollabModal] = useState(false);
    const [isCollaborating, setIsCollaborating] = useState(false);
    const [roomId, setRoomId] = useState('');
    const [participants, setParticipants] = useState([]);
    const [isVideoOn, setIsVideoOn] = useState(false);
    const [isAudioOn, setIsAudioOn] = useState(false);

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

                }

            } catch (err) {
                console.error("Error fetching problem:", err);
                alert("Failed to fetch problem details. Please try again later.");
                navigate('/problem');
            } finally {
                setLoading(false);
            }
        }

        fetchSingleProblem();

    }, [problemId, navigate]);

    const runCode = () => {
        setIsRunning(true);
        setOutput('Running...');

        // Simulate code execution
        setTimeout(() => {
            setOutput('Ready to run your code...');
            setIsRunning(false);
        }, 2000);
    };

    const createRoom = () => {
        const newRoomId = Math.random().toString(36).substr(2, 9);
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
            <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
                    <p className="mt-4 text-gray-300">Loading problem...</p>
                </div>
            </div>
        );
    }

    // Show error state if problem failed to load
    if (!problem) {
        return (
            <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-400 text-lg mb-4">Failed to load problem</p>
                    <button
                        onClick={() => navigate('/problem')}
                        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
                    >
                        Go back to problems
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-white flex">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 bg-slate-800 border-b border-slate-700 px-6 py-3 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-bold text-white">CodeCollab</h1>
                    <span className="text-sm bg-green-600 px-2 py-1 rounded font-medium">{problem?.title || 'Loading...'}</span>
                    <span className="text-xs bg-green-500 px-2 py-1 rounded font-medium">{problem?.difficulty || 'Easy'}</span>
                </div>
                <button
                    onClick={() => setShowCollabModal(true)}
                    className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
                >
                    <Users size={16} />
                    Collaborate
                </button>
            </div>

            {/* Main Content */}
            <div className="flex w-full pt-16">
                {/* Left Sidebar - Problem Description */}
                <div className="w-96 bg-slate-800 border-r border-slate-700">
                    <ProblemDescription problem={problem} />
                </div>

                {/* Center - Code Editor */}
                <div className="flex-1 flex flex-col">
                    {/* Editor Header */}
                    <div className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-300">{problem?.title || 'Loading...'}</span>
                            <LanguageSelector language={language} setLanguage={setLanguage} />
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={runCode}
                                disabled={isRunning}
                                className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
                            >
                                ▶
                                {isRunning ? 'Running...' : 'Run'}
                            </button>
                            <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Code Editor */}
                    <div className="flex-1">
                        <CodeEditor
                            code={code}
                            setCode={setCode}
                            language={language}
                        />
                    </div>

                    {/* Output Console */}
                    <div className="h-48 border-t border-slate-700">
                        <OutputConsole output={output} />
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
            {showCollabModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-slate-800 rounded-lg p-6 w-96 border border-slate-700">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">Start Collaboration</h2>
                            <button
                                onClick={() => setShowCollabModal(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <button
                                onClick={createRoom}
                                className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
                            >
                                <Plus size={20} />
                                Create New Room
                            </button>

                            <div className="text-center text-gray-400">or</div>

                            <div className="space-y-3">
                                <input
                                    type="text"
                                    placeholder="Enter room ID"
                                    value={roomId}
                                    onChange={(e) => setRoomId(e.target.value)}
                                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    onClick={joinRoom}
                                    className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
                                >
                                    <LogIn size={20} />
                                    Join Room
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