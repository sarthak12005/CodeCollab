import React, { useState, useEffect, useContext, useRef, Fragment } from 'react';
import { X, Users, Video, VideoOff, Mic, MicOff, MessageCircle, Copy, Check, Phone, PhoneOff } from 'lucide-react';
import { UserContext } from '../../context/userContext';
import io from 'socket.io-client';

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
    // Debug counters for media tracks and peer state
    const [localVideoTrackCount, setLocalVideoTrackCount] = useState(0);
    const [remoteVideoTrackCount, setRemoteVideoTrackCount] = useState(0);
    const [peerConnectionState, setPeerConnectionState] = useState('new');
    // Join timeout/ref to avoid stuck "Joining..." UI
    const joinTimeoutRef = useRef(null);
    // Queue ICE candidates received before a remote description is set
    const pendingIceCandidatesRef = useRef([]);

    // Code synchronization
    const [lastCodeUpdate, setLastCodeUpdate] = useState(Date.now());
    const [isCodeSyncing, setIsCodeSyncing] = useState(false);

    useEffect(() => {
        if (isOpen && !socket) {
            const newSocket = io(API_URL.replace('/api/codecollab', ''), {
                transports: ['websocket', 'polling']
            });

            newSocket.on('connect', () => {
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
                console.debug('[Collab] received room-joined', data);
                // Clear join timeout if present
                if (joinTimeoutRef.current) {
                    clearTimeout(joinTimeoutRef.current);
                    joinTimeoutRef.current = null;
                }
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
                } else {
                    // Defensive: treat as an error if success flag is false
                    alert(data.message || 'Failed to join room');
                    setIsConnecting(false);
                }
            });

            newSocket.on('join-room-error', (data) => {
                console.warn('[Collab] join-room-error', data);
                if (joinTimeoutRef.current) {
                    clearTimeout(joinTimeoutRef.current);
                    joinTimeoutRef.current = null;
                }
                alert(data.message);
                setIsConnecting(false);
            });

            newSocket.on('user-joined', (data) => {
                console.debug('[Collab] user-joined', data);
                setParticipants(data.participants);
                // Fallback: if joining client didn't receive 'room-joined' but server included this user in participants,
                // treat it as a successful join and enter the room view to avoid getting stuck in the "Joining..." state.
                try {
                    const amPresent = data.participants && user && data.participants.some(p => p.id === user.id);
                    if (!currentRoom && amPresent) {
                        console.debug('[Collab] fallback: detected join via user-joined, entering room');
                        setCurrentRoom(prev => prev || { id: roomId.trim().toUpperCase(), participants: data.participants });
                        setView('room');
                        setIsConnecting(false);
                        if (joinTimeoutRef.current) {
                            clearTimeout(joinTimeoutRef.current);
                            joinTimeoutRef.current = null;
                        }
                    }
                } catch (err) {
                    // ignore
                }
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
                console.debug('[Collab] webrtc-offer', data);
                await handleReceiveOffer(data.offer, data.from);
            });

            newSocket.on('webrtc-answer', async (data) => {
                console.debug('[Collab] webrtc-answer', data);
                await handleReceiveAnswer(data.answer);
            });

            newSocket.on('webrtc-ice-candidate', async (data) => {
                console.debug('[Collab] webrtc-ice-candidate', data);
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
            // Clear join timeout if still pending
            if (joinTimeoutRef.current) {
                clearTimeout(joinTimeoutRef.current);
                joinTimeoutRef.current = null;
            }
            // Clear pending ICE candidates
            if (pendingIceCandidatesRef.current) {
                pendingIceCandidatesRef.current = [];
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
        if (!user || !roomId.trim()) {
            alert('Please enter a room ID');
            return;
        }
        if (!socket) {
            alert('Socket not initialized yet. Please try again in a moment.');
            return;
        }
        
        setIsConnecting(true);
        console.debug('[Collab] joinRoom -> attempting to join', roomId, 'socket.connected=', socket.connected);
        const emitJoin = () => {
            socket.emit('join-room', {
                roomId: roomId.trim().toUpperCase(),
                user: user
            });
        };

        if (socket.connected) {
            emitJoin();
        } else {
            // Wait for socket connect to emit join (helps if connection is not ready yet)
            const onConnect = () => {
                console.debug('[Collab] socket connected, emitting join-room');
                emitJoin();
                socket.off('connect', onConnect);
            };
            socket.on('connect', onConnect);
        }

        // Safety timeout: if no response in X ms, stop loading and show error
        if (joinTimeoutRef.current) clearTimeout(joinTimeoutRef.current);
        joinTimeoutRef.current = setTimeout(() => {
            console.warn('[Collab] joinRoom timeout for', roomId);
            setIsConnecting(false);
            alert('Timed out while joining room. Please check the Room ID and try again.');
            joinTimeoutRef.current = null;
        }, 10000);
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
            console.debug('[Collab] ontrack event', event);
            // Prefer provided streams, otherwise assemble one from tracks
            const remoteStream = (event.streams && event.streams[0]) || null;
            if (remoteStream && remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = remoteStream;
                setRemoteVideoTrackCount(remoteStream.getVideoTracks().length);
                // Ensure remote video is not muted so audio can play when allowed by the browser
                try { if (remoteVideoRef.current) remoteVideoRef.current.muted = false; } catch (err) {}
                // Try to autoplay the incoming media (may be blocked without user gesture)
                setTimeout(async () => {
                    try {
                        if (remoteVideoRef.current) {
                            await remoteVideoRef.current.play();
                            console.debug('[Collab] remote video autoplay succeeded');
                        }
                    } catch (err) {
                        console.warn('[Collab] remote video autoplay failed:', err);
                    }
                }, 50);
            } else if (event.track) {
                // Fallback: create or reuse a MediaStream and add the incoming track
                try {
                    const existing = remoteVideoRef.current && remoteVideoRef.current.srcObject;
                    const inboundStream = existing instanceof MediaStream ? existing : new MediaStream();
                    inboundStream.addTrack(event.track);
                    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = inboundStream;
                    setRemoteVideoTrackCount(inboundStream.getVideoTracks().length);
                    setTimeout(async () => {
                        try {
                            if (remoteVideoRef.current) {
                                await remoteVideoRef.current.play();
                                console.debug('[Collab] remote video autoplay succeeded (track fallback)');
                            }
                        } catch (err) {
                            console.warn('[Collab] remote video autoplay failed (track fallback):', err);
                        }
                    }, 50);
                } catch (err) {
                    console.error('[Collab] error attaching remote track', err);
                }
            }
        };

        peerConnection.onconnectionstatechange = () => {
            console.debug('[Collab] PeerConnection state:', peerConnection.connectionState);
            setPeerConnectionState(peerConnection.connectionState);
        };

        peerConnection.oniceconnectionstatechange = () => {
            console.debug('[Collab] ICE connection state:', peerConnection.iceConnectionState);
        };

        return peerConnection;
    };



    // Simple video setup function
    const setupVideo = async () => {
        try {


            const constraints = {
                video: isVideoOn ? {
                    width: { ideal: 640 },
                    height: { ideal: 480 }
                } : false,
                audio: isAudioOn
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);

            // Store the stream
            localStreamRef.current = stream;
            setLocalStream(stream);
            setLocalVideoTrackCount(stream.getVideoTracks ? stream.getVideoTracks().length : 0);

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
            localVideoRef.current.srcObject = localStream;
            localVideoRef.current.muted = true;

            localVideoRef.current.play().then(() => {
            }).catch(error => {
                console.warn('[Collab] local video play failed:', error);
            });
        }
    }, [localStream]);

    // Effect to play and debug remote video when it arrives
    useEffect(() => {
        const tryPlayRemote = async () => {
            if (remoteVideoRef.current && remoteVideoRef.current.srcObject) {
                try {
                    await remoteVideoRef.current.play();
                    console.debug('[Collab] remote video playing');
                } catch (err) {
                    console.warn('[Collab] remote video play failed:', err);
                }
            }
        };
        tryPlayRemote();
    }, [remoteVideoRef.current && remoteVideoRef.current.srcObject]);

    // Debug helper to inspect local/remote video elements and streams
    const debugVideoElement = () => {
        try {
            console.debug('[Collab] debugVideoElement -> localVideoRef', localVideoRef.current);
            console.debug('[Collab] debugVideoElement -> remoteVideoRef', remoteVideoRef.current);
            if (localVideoRef.current) {
                const s = localVideoRef.current.srcObject;
                console.debug('[Collab] local srcObject', s, 'videoTracks', s ? s.getVideoTracks() : 'no-stream');
            }
            if (remoteVideoRef.current) {
                const s2 = remoteVideoRef.current.srcObject;
                console.debug('[Collab] remote srcObject', s2, 'videoTracks', s2 ? s2.getVideoTracks() : 'no-stream');
            }
        } catch (err) {
            console.error('[Collab] debugVideoElement error', err);
        }
    };

    const startCall = async () => {
        try {

            // Get the video stream
            const stream = await setupVideo();

            setIsCallActive(true);

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

            // Debug the video element after a short delay (defensive call)
            setTimeout(() => {
                try {
                    if (typeof debugVideoElement === 'function') {
                        debugVideoElement();
                    } else {
                        console.warn('[Collab] debugVideoElement is not a function');
                    }
                } catch (err) {
                    console.error('[Collab] debugVideoElement invocation failed', err);
                }
            }, 1000);

            // Show success message: derive from tracks on the acquired stream
            const hasVideo = stream && stream.getVideoTracks && stream.getVideoTracks().length > 0;
            const hasAudio = stream && stream.getAudioTracks && stream.getAudioTracks().length > 0;
            console.debug('[Collab] startCall: hasVideo=', hasVideo, 'hasAudio=', hasAudio);
            if (!hasVideo && !hasAudio) {
                console.warn('[Collab] No media tracks were obtained');
            }
        } catch (error) {
            console.error('Error starting call:', error);
            alert('Failed to start call. Please try again.');
        }
    };

    const handleReceiveOffer = async (offer, from) => {
        try {
            console.debug('[Collab] handleReceiveOffer from', from);
            const peerConnection = initializePeerConnection();
            peerConnectionRef.current = peerConnection;

            console.debug('[Collab] setting remote description');
            await peerConnection.setRemoteDescription(offer);

            // Process any ICE candidates that arrived early
            try {
                if (pendingIceCandidatesRef.current && pendingIceCandidatesRef.current.length) {
                    console.debug('[Collab] processing queued ICE candidates (offer path)', pendingIceCandidatesRef.current.length);
                    for (const c of pendingIceCandidatesRef.current) {
                        try { await peerConnection.addIceCandidate(c); } catch (err) { console.warn('[Collab] queued addIceCandidate failed', err); }
                    }
                    pendingIceCandidatesRef.current = [];
                }
            } catch (err) {
                console.warn('[Collab] processing queued ICE candidates failed', err);
            }

            // Make sure we have a local stream to send back (prompt for permissions if needed)
            if (!localStreamRef.current) {
                try {
                    await setupVideo();
                } catch (err) {
                    console.warn('[Collab] setupVideo failed while answering offer', err);
                }
            }

            if (localStreamRef.current) {
                localStreamRef.current.getTracks().forEach(track => {
                    try {
                        peerConnection.addTrack(track, localStreamRef.current);
                    } catch (err) {
                        console.warn('[Collab] addTrack failed', err);
                    }
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
            console.debug('[Collab] handleReceiveAnswer');
            if (peerConnectionRef.current) {
                await peerConnectionRef.current.setRemoteDescription(answer);
                // Process any queued ICE candidates after setting remote description
                try {
                    if (pendingIceCandidatesRef.current && pendingIceCandidatesRef.current.length) {
                        console.debug('[Collab] processing queued ICE candidates (answer path)', pendingIceCandidatesRef.current.length);
                        for (const c of pendingIceCandidatesRef.current) {
                            try { await peerConnectionRef.current.addIceCandidate(c); } catch (err) { console.warn('[Collab] queued addIceCandidate failed', err); }
                        }
                        pendingIceCandidatesRef.current = [];
                    }
                } catch (err) {
                    console.warn('[Collab] processing queued ICE candidates after answer failed', err);
                }
            }
        } catch (error) {
            console.error('Error handling answer:', error);
        }
    };

    const handleReceiveIceCandidate = async (candidate) => {
        try {
            const pc = peerConnectionRef.current;
            if (pc && pc.remoteDescription && pc.remoteDescription.type) {
                try {
                    await pc.addIceCandidate(candidate);
                } catch (err) {
                    console.warn('[Collab] addIceCandidate failed:', err);
                }
            } else {
                // Queue candidate until remote description is available
                console.debug('[Collab] queuing ICE candidate until remote description is set');
                pendingIceCandidatesRef.current = pendingIceCandidatesRef.current || [];
                pendingIceCandidatesRef.current.push(candidate);
            }
        } catch (error) {
            console.error('Error handling ICE candidate:', error);
        }
    };

    const endCall = () => {

        // Stop all tracks
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(track => {
                track.stop();
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
                        )}                        {/* Small debug status for call */}
                        <div className="ml-4 text-xs text-gray-400 hidden sm:inline">
                            Peer: <span className="font-medium text-gray-200">{peerConnectionState}</span>
                            &nbsp;•&nbsp; LocalVT: <span className="font-medium text-gray-200">{localVideoTrackCount}</span>
                            &nbsp;•&nbsp; RemoteVT: <span className="font-medium text-gray-200">{remoteVideoTrackCount}</span>
                        </div>                    </h2>
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
                                        {participants.map((participant, idx) => (
                                            <div key={participant.id ?? participant.username ?? `participant-${idx}`} className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                                                    {participant.username?.[0]?.toUpperCase()}
                                                </div>
                                                <span className="text-white text-sm">{participant.username || participant.name || 'Guest'}</span>
                                                {participant.id === currentRoom?.host?.id && (
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
                                        {chatMessages.map((message, idx) => (
                                            <div key={message.id ?? `msg-${message.timestamp ? new Date(message.timestamp).getTime() : idx}`} className={`flex gap-3 ${message.isSystem ? 'opacity-75' : ''}`}>
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 ${
                                                    message.isSystem ? 'bg-gray-600' : 'bg-blue-600'
                                                }`}>
                                                    {message.isSystem ? '🤖' : message.user?.username?.[0]?.toUpperCase()}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className={`text-sm font-medium ${
                                                            message.isSystem ? 'text-gray-400' : 'text-white'
                                                        }`}>
                                                            {message.user?.username || (message.isSystem ? 'System' : 'Anonymous')}
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
