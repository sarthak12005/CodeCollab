import React, { useState, useEffect, useContext, useRef, Fragment } from 'react';
import { X, Users, Video, VideoOff, Mic, MicOff, MessageCircle, Copy, Check, Phone, PhoneOff } from 'lucide-react';
import { UserContext } from '../../context/userContext';
import io from 'socket.io-client'

const API_URL = import.meta.env.VITE_API_ENDPOINT;

const CollaborationModal = ({ 
    isOpen, 
    onClose, 
    problem, 
    code, 
    language, 
    onCodeChange, 
    onLanguageChange 
}) => {
    const { user } = useContext(UserContext);
    const [socket, setSocket] = useState(null);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [roomId, setRoomId] = useState('');
    const [participants, setParticipants] = useState([]);
    const [isVideoOn, setIsVideoOn] = useState(false);
    const [isAudioOn, setIsAudioOn] = useState(true); // Default to audio enabled
    const [showChat, setShowChat] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isConnecting, setIsConnecting] = useState(false);
    const [copied, setCopied] = useState(false);
    const [view, setView] = useState('join'); // 'join', 'create', 'room'

    // WebRTC refs and state
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerConnectionRef = useRef(null);
    const localStreamRef = useRef(null);
    const [isCallActive, setIsCallActive] = useState(false);
    const [remoteUsers, setRemoteUsers] = useState([]);
    const [localStream, setLocalStream] = useState(null);

    // Code synchronization
    const [lastCodeUpdate, setLastCodeUpdate] = useState(Date.now());
    const [isCodeSyncing, setIsCodeSyncing] = useState(false);

    useEffect(() => {
        if (isOpen && !socket) {
            const newSocket = io(API_URL.replace('/api/codecollab', ''), {
                transports: ['websocket', 'polling']
            });

            newSocket.on('connect', () => {
                console.log('Connected to collaboration server');
                newSocket.emit('user-connected', user);
            });

            newSocket.on('room-created', (data) => {
                if (data.success) {
                    setCurrentRoom(data.room);
                    setParticipants(data.room.participants);
                    setView('room');
                    setIsConnecting(false);
                }
            });

            newSocket.on('room-joined', (data) => {
                if (data.success) {
                    setCurrentRoom(data.room);
                    setParticipants(data.room.participants);
                    setChatMessages(data.room.chat || []);
                    setView('room');
                    setIsConnecting(false);
                    
                    // Sync code with room
                    if (data.room.code && data.room.code !== code) {
                        onCodeChange(data.room.code);
                    }
                    if (data.room.language && data.room.language !== language) {
                        onLanguageChange(data.room.language);
                    }
                }
            });

            newSocket.on('join-room-error', (data) => {
                alert(data.message);
                setIsConnecting(false);
            });

            newSocket.on('user-joined', (data) => {
                setParticipants(data.participants);
            });

            newSocket.on('user-left', (data) => {
                setParticipants(data.participants);
            });

            newSocket.on('code-updated', (data) => {
                setIsCodeSyncing(true);
                onCodeChange(data.code);
                if (data.language) {
                    onLanguageChange(data.language);
                }
                // Show who updated the code
                if (data.updatedBy) {
                    setChatMessages(prev => [...prev, {
                        id: `system-${Date.now()}-${Math.random()}`,
                        user: { username: 'System' },
                        message: `${data.updatedBy} updated the code`,
                        timestamp: new Date(),
                        isSystem: true
                    }]);
                }
                setTimeout(() => setIsCodeSyncing(false), 1000);
            });

            newSocket.on('new-message', (message) => {
                setChatMessages(prev => [...prev, message]);
            });

            // WebRTC signaling handlers
            newSocket.on('webrtc-offer', async (data) => {
                await handleReceiveOffer(data.offer, data.from);
            });

            newSocket.on('webrtc-answer', async (data) => {
                await handleReceiveAnswer(data.answer);
            });

            newSocket.on('webrtc-ice-candidate', async (data) => {
                await handleReceiveIceCandidate(data.candidate);
            });

            newSocket.on('user-video-toggle', (data) => {
                setRemoteUsers(prev => prev.map(user =>
                    user.socketId === data.userId
                        ? { ...user, isVideoOn: data.isVideoOn }
                        : user
                ));
            });

            newSocket.on('user-audio-toggle', (data) => {
                setRemoteUsers(prev => prev.map(user =>
                    user.socketId === data.userId
                        ? { ...user, isAudioOn: data.isAudioOn }
                        : user
                ));
            });

            setSocket(newSocket);
        }

        return () => {
            if (socket) {
                socket.disconnect();
                setSocket(null);
            }
            // Clean up WebRTC
            if (localStreamRef.current) {
                localStreamRef.current.getTracks().forEach(track => track.stop());
            }
            if (peerConnectionRef.current) {
                peerConnectionRef.current.close();
            }
        };
    }, [isOpen]);

    const createRoom = () => {
        if (!socket || !user) return;
        
        setIsConnecting(true);
        socket.emit('create-room', {
            problemId: problem._id,
            problemTitle: problem.title,
            user: user,
            initialCode: code,
            language: language
        });
    };

    const joinRoom = () => {
        if (!socket || !user || !roomId.trim()) {
            alert('Please enter a room ID');
            return;
        }
        
        setIsConnecting(true);
        socket.emit('join-room', {
            roomId: roomId.trim().toUpperCase(),
            user: user
        });
    };

    const leaveRoom = () => {
        if (socket && currentRoom) {
            socket.emit('leave-room', { roomId: currentRoom.id });
            setCurrentRoom(null);
            setParticipants([]);
            setChatMessages([]);
            setView('join');
        }
    };

    const sendMessage = () => {
        if (!socket || !currentRoom || !newMessage.trim()) return;

        socket.emit('send-message', {
            roomId: currentRoom.id,
            message: newMessage.trim(),
            user: user
        });

        setNewMessage('');
    };

    const copyRoomId = () => {
        if (currentRoom) {
            navigator.clipboard.writeText(currentRoom.id);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const toggleVideo = () => {
        setIsVideoOn(!isVideoOn);
        if (socket && currentRoom) {
            socket.emit('toggle-video', {
                roomId: currentRoom.id,
                isVideoOn: !isVideoOn
            });
        }
    };

    const toggleAudio = () => {
        setIsAudioOn(!isAudioOn);
        if (socket && currentRoom) {
            socket.emit('toggle-audio', {
                roomId: currentRoom.id,
                isAudioOn: !isAudioOn
            });
        }
    };

    // WebRTC Functions
    const initializePeerConnection = () => {
        const configuration = {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' }
            ]
        };

        const peerConnection = new RTCPeerConnection(configuration);

        peerConnection.onicecandidate = (event) => {
            if (event.candidate && socket && currentRoom) {
                socket.emit('webrtc-ice-candidate', {
                    roomId: currentRoom.id,
                    candidate: event.candidate
                });
            }
        };

        peerConnection.ontrack = (event) => {
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = event.streams[0];
            }
        };

        return peerConnection;
    };



    // Simple video setup function
    const setupVideo = async () => {
        try {
            console.log('🎥 Setting up video...');

            const constraints = {
                video: isVideoOn ? {
                    width: { ideal: 640 },
                    height: { ideal: 480 }
                } : false,
                audio: isAudioOn
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            console.log('✅ Got stream:', stream);

            // Store the stream
            localStreamRef.current = stream;
            setLocalStream(stream);

            return stream;
        } catch (error) {
            console.error('❌ Video setup failed:', error);
            alert('Failed to access camera/microphone. Please check permissions.');
            throw error;
        }
    };

    // Effect to handle video element when stream changes
    useEffect(() => {
        if (localStream && localVideoRef.current) {
            console.log('🔗 Connecting stream to video element...');
            localVideoRef.current.srcObject = localStream;
            localVideoRef.current.muted = true;

            localVideoRef.current.play().then(() => {
                console.log('✅ Video is playing!');
            }).catch(error => {
                console.log('Video play error (might be normal):', error);
            });
        }
    }, [localStream]);

    const startCall = async () => {
        try {
            console.log('🚀 Starting call...');

            // Get the video stream
            const stream = await setupVideo();

            setIsCallActive(true);
            console.log('✅ Call started successfully!');

            const peerConnection = initializePeerConnection();
            peerConnectionRef.current = peerConnection;

            stream.getTracks().forEach(track => {
                peerConnection.addTrack(track, stream);
            });

            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);

            if (socket && currentRoom) {
                socket.emit('webrtc-offer', {
                    roomId: currentRoom.id,
                    offer: offer
                });
            }

            setIsCallActive(true);

            // Debug the video element after a short delay
            setTimeout(() => {
                debugVideoElement();
            }, 1000);

            // Show success message
            const hasVideo = !!videoTrack;
            const hasAudio = !!audioTrack;
            if (hasVideo && hasAudio) {
                console.log('Call started with video and audio');
            } else if (hasAudio) {
                console.log('Call started with audio only');
            } else if (hasVideo) {
                console.log('Call started with video only');
            }
        } catch (error) {
            console.error('Error starting call:', error);
            alert('Failed to start call. Please try again.');
        }
    };

    const handleReceiveOffer = async (offer, from) => {
        try {
            const peerConnection = initializePeerConnection();
            peerConnectionRef.current = peerConnection;

            await peerConnection.setRemoteDescription(offer);

            if (localStreamRef.current) {
                localStreamRef.current.getTracks().forEach(track => {
                    peerConnection.addTrack(track, localStreamRef.current);
                });
            }

            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);

            if (socket) {
                socket.emit('webrtc-answer', {
                    to: from,
                    answer: answer
                });
            }
        } catch (error) {
            console.error('Error handling offer:', error);
        }
    };

    const handleReceiveAnswer = async (answer) => {
        try {
            if (peerConnectionRef.current) {
                await peerConnectionRef.current.setRemoteDescription(answer);
            }
        } catch (error) {
            console.error('Error handling answer:', error);
        }
    };

    const handleReceiveIceCandidate = async (candidate) => {
        try {
            if (peerConnectionRef.current) {
                await peerConnectionRef.current.addIceCandidate(candidate);
            }
        } catch (error) {
            console.error('Error handling ICE candidate:', error);
        }
    };

    const endCall = () => {
        console.log('🛑 Ending call...');

        // Stop all tracks
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(track => {
                track.stop();
                console.log(`Stopped ${track.kind} track`);
            });
            localStreamRef.current = null;
        }

        // Close peer connection
        if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
            peerConnectionRef.current = null;
        }

        // Clear video elements
        if (localVideoRef.current) {
            localVideoRef.current.srcObject = null;
        }

        if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = null;
        }

        // Reset state
        setIsCallActive(false);
        setLocalStream(null);
        setIsVideoOn(false);
        setIsAudioOn(false);

        console.log('✅ Call ended');
    };

    // Sync code changes to room with debouncing
    useEffect(() => {
        if (socket && currentRoom && !isCodeSyncing) {
            const now = Date.now();
            if (now - lastCodeUpdate > 500) { // Debounce for 500ms
                setIsCodeSyncing(true);
                socket.emit('code-change', {
                    roomId: currentRoom.id,
                    code: code,
                    language: language
                });
                setLastCodeUpdate(now);
                setTimeout(() => setIsCodeSyncing(false), 100);
            }
        }
    }, [code, language]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-700">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Users size={20} />
                        {currentRoom ? `Room: ${currentRoom.id}` : 'Collaborate'}
                        {isCodeSyncing && (
                            <span className="text-xs bg-blue-600 px-2 py-1 rounded-full animate-pulse">
                                Syncing...
                            </span>
                        )}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 flex">
                    {view === 'join' && (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center space-y-6 max-w-md">
                                <h3 className="text-2xl font-bold text-white">Join Collaboration</h3>
                                <p className="text-gray-400">Work together on {problem?.title}</p>
                                
                                <div className="space-y-4">
                                    <button
                                        onClick={createRoom}
                                        disabled={isConnecting}
                                        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 py-3 rounded-lg text-white font-medium transition-colors"
                                    >
                                        {isConnecting ? 'Creating...' : 'Create New Room'}
                                    </button>
                                    
                                    <div className="text-gray-400">or</div>
                                    
                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            placeholder="Enter Room ID"
                                            value={roomId}
                                            onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                                            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                            maxLength={8}
                                        />
                                        <button
                                            onClick={joinRoom}
                                            disabled={isConnecting || !roomId.trim()}
                                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 py-3 rounded-lg text-white font-medium transition-colors"
                                        >
                                            {isConnecting ? 'Joining...' : 'Join Room'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {view === 'room' && currentRoom && (
                        <Fragment key="room-content">
                            {/* Left Panel - Participants & Video */}
                            <div className="w-1/3 border-r border-slate-700 flex flex-col">
                                {/* Room Info */}
                                <div className="p-4 border-b border-slate-700">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-400">Room ID</span>
                                        <button
                                            onClick={copyRoomId}
                                            className="flex items-center gap-1 text-xs bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded transition-colors"
                                        >
                                            {copied ? <Check size={12} /> : <Copy size={12} />}
                                            {copied ? 'Copied!' : 'Copy'}
                                        </button>
                                    </div>
                                    <div className="text-lg font-mono text-white">{currentRoom.id}</div>
                                </div>

                                {/* Participants */}
                                <div className="p-4 border-b border-slate-700">
                                    <h4 className="text-sm font-medium text-gray-400 mb-3">
                                        Participants ({participants.length})
                                    </h4>
                                    <div className="space-y-2">
                                        {participants.map((participant) => (
                                            <div key={participant.id} className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                                                    {participant.username?.[0]?.toUpperCase()}
                                                </div>
                                                <span className="text-white text-sm">{participant.username}</span>
                                                {participant.id === currentRoom.host.id && (
                                                    <span className="text-xs bg-yellow-600 px-1 py-0.5 rounded text-white">Host</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Video Controls */}
                                <div className="p-4 border-b border-slate-700">
                                    <h4 className="text-sm font-medium text-gray-400 mb-3">Video Call</h4>
                                    <div className="space-y-2">
                                        {!isCallActive ? (
                                            <div className="space-y-3">
                                                {/* Pre-call controls */}
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => setIsVideoOn(!isVideoOn)}
                                                        className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                                                            isVideoOn
                                                                ? 'bg-green-600 hover:bg-green-700'
                                                                : 'bg-gray-600 hover:bg-gray-700'
                                                        }`}
                                                    >
                                                        {isVideoOn ? <Video size={16} /> : <VideoOff size={16} />}
                                                        <span className="text-sm">{isVideoOn ? 'Video' : 'No Video'}</span>
                                                    </button>
                                                    <button
                                                        onClick={() => setIsAudioOn(!isAudioOn)}
                                                        className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                                                            isAudioOn
                                                                ? 'bg-green-600 hover:bg-green-700'
                                                                : 'bg-gray-600 hover:bg-gray-700'
                                                        }`}
                                                    >
                                                        {isAudioOn ? <Mic size={16} /> : <MicOff size={16} />}
                                                        <span className="text-sm">{isAudioOn ? 'Audio' : 'No Audio'}</span>
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={startCall}
                                                    className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                                                >
                                                    <Phone size={16} />
                                                    <span className="text-sm">Start Call</span>
                                                </button>



                                                <div className="text-xs text-gray-400 text-center">
                                                    {isVideoOn && isAudioOn ? 'Starting with video and audio' :
                                                     isVideoOn ? 'Starting with video only' :
                                                     isAudioOn ? 'Starting with audio only' : 'Audio will be enabled automatically'}
                                                </div>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={endCall}
                                                className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                                            >
                                                <PhoneOff size={16} />
                                                <span className="text-sm">End Call</span>
                                            </button>
                                        )}

                                        {isCallActive && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={toggleVideo}
                                                    className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                                                        isVideoOn
                                                            ? 'bg-green-600 hover:bg-green-700'
                                                            : 'bg-red-600 hover:bg-red-700'
                                                    }`}
                                                >
                                                    {isVideoOn ? <Video size={16} /> : <VideoOff size={16} />}
                                                    <span className="text-sm">{isVideoOn ? 'On' : 'Off'}</span>
                                                </button>
                                                <button
                                                    onClick={toggleAudio}
                                                    className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                                                        isAudioOn
                                                            ? 'bg-green-600 hover:bg-green-700'
                                                            : 'bg-red-600 hover:bg-red-700'
                                                    }`}
                                                >
                                                    {isAudioOn ? <Mic size={16} /> : <MicOff size={16} />}
                                                    <span className="text-sm">{isAudioOn ? 'On' : 'Off'}</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Video Area */}
                                <div className="flex-1 p-4">
                                    <div className="bg-slate-700 rounded-lg h-full relative overflow-hidden">
                                        {isCallActive ? (
                                            <Fragment key="video-active">
                                                {/* Video Display Area */}
                                                <div className="w-full h-full relative bg-slate-800 rounded-lg overflow-hidden">
                                                    {/* Remote Video (Main Display - Other Person) */}
                                                    <video
                                                        ref={remoteVideoRef}
                                                        autoPlay
                                                        playsInline
                                                        className="w-full h-full object-cover"
                                                    />

                                                    {/* Remote Video Placeholder */}
                                                    <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                                                        <div className="text-white text-center">
                                                            <div className="w-16 h-16 bg-slate-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                                                                👤
                                                            </div>
                                                            <p className="text-lg">Waiting for other person</p>
                                                            <p className="text-sm text-gray-400">They will appear here when they join</p>
                                                        </div>
                                                    </div>

                                                    {/* Local Video (Picture-in-Picture - Your Camera) */}
                                                    <div className="absolute top-2 right-2 w-32 h-24 bg-slate-800 rounded-lg overflow-hidden border-2 border-green-500 shadow-lg">
                                                        <video
                                                            ref={localVideoRef}
                                                            autoPlay
                                                            playsInline
                                                            muted
                                                            className="w-full h-full object-cover"
                                                        />

                                                        {/* Your Video Status Overlay */}
                                                        {!isVideoOn && (
                                                            <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                                                                <div className="text-white text-xs text-center">
                                                                    <div className="w-6 h-6 bg-slate-600 rounded-full mx-auto mb-1 flex items-center justify-center">
                                                                        👤
                                                                    </div>
                                                                    You
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* "You" Label */}
                                                        <div className="absolute bottom-1 left-1 bg-green-600 text-white text-xs px-2 py-1 rounded">
                                                            You
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Call Status Indicator */}
                                                <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                                                    🔴 Live
                                                </div>

                                                {/* Call Status */}
                                                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-xs text-white">
                                                    {isVideoOn && isAudioOn ? '🎥 Video Call' :
                                                     isAudioOn ? '🎤 Voice Call' :
                                                     '🔇 Call Active'}
                                                </div>
                                            </Fragment>
                                        ) : (
                                            <div className="flex items-center justify-center h-full">
                                                <div className="text-center text-gray-400">
                                                    <Video size={32} className="mx-auto mb-2" />
                                                    <p className="text-sm">Click "Start Call" to begin video chat</p>
                                                    <p className="text-xs text-gray-500 mt-1">Camera and microphone access required</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Panel - Chat */}
                            <div className="flex-1 flex flex-col">
                                {/* Chat Header */}
                                <div className="p-4 border-b border-slate-700 flex items-center justify-between">
                                    <h4 className="text-lg font-medium text-white">Live Chat</h4>
                                    <button
                                        onClick={leaveRoom}
                                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition-colors"
                                    >
                                        Leave Room
                                    </button>
                                </div>

                                {/* Chat Messages */}
                                <div className="flex-1 p-4 overflow-y-auto">
                                    <div className="space-y-3">
                                        {chatMessages.map((message) => (
                                            <div key={message.id} className={`flex gap-3 ${message.isSystem ? 'opacity-75' : ''}`}>
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 ${
                                                    message.isSystem ? 'bg-gray-600' : 'bg-blue-600'
                                                }`}>
                                                    {message.isSystem ? '🤖' : message.user.username?.[0]?.toUpperCase()}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className={`text-sm font-medium ${
                                                            message.isSystem ? 'text-gray-400' : 'text-white'
                                                        }`}>
                                                            {message.user.username}
                                                        </span>
                                                        <span className="text-xs text-gray-400">
                                                            {new Date(message.timestamp).toLocaleTimeString()}
                                                        </span>
                                                    </div>
                                                    <p className={`text-sm ${
                                                        message.isSystem ? 'text-gray-400 italic' : 'text-gray-300'
                                                    }`}>
                                                        {message.message}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Chat Input */}
                                <div className="p-4 border-t border-slate-700">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Type a message..."
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                            className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                        />
                                        <button
                                            onClick={sendMessage}
                                            disabled={!newMessage.trim()}
                                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 px-4 py-2 rounded-lg transition-colors"
                                        >
                                            <MessageCircle size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CollaborationModal;
