const { v4: uuidv4 } = require('uuid');

// In-memory storage for rooms (in production, use Redis or database)
const rooms = new Map();
const userSockets = new Map();

class CollaborationController {
    constructor(io) {
        this.io = io;
        this.setupSocketHandlers();
    }

    setupSocketHandlers() {
        this.io.on('connection', (socket) => {

            // Store user socket
            socket.on('user-connected', (userData) => {
                userSockets.set(socket.id, {
                    ...userData,
                    socketId: socket.id
                });
            });

            // Create room
            socket.on('create-room', (data) => {
                const roomId = uuidv4().substring(0, 8).toUpperCase();
                const room = {
                    id: roomId,
                    problemId: data.problemId,
                    problemTitle: data.problemTitle,
                    host: data.user,
                    participants: [data.user],
                    code: data.initialCode || '',
                    language: data.language || 'python',
                    createdAt: new Date(),
                    isActive: true,
                    chat: []
                };

                rooms.set(roomId, room);
                socket.join(roomId);

                socket.emit('room-created', {
                    success: true,
                    roomId: roomId,
                    room: room
                });

            });

            // Join room
            socket.on('join-room', (data) => {
                const { roomId, user } = data;
                const room = rooms.get(roomId);

                if (!room) {
                    socket.emit('join-room-error', {
                        success: false,
                        message: 'Room not found'
                    });
                    return;
                }

                if (!room.isActive) {
                    socket.emit('join-room-error', {
                        success: false,
                        message: 'Room is no longer active'
                    });
                    return;
                }

                // Add user to room if not already present
                const existingUser = room.participants.find(p => p.id === user.id);
                if (!existingUser) {
                    room.participants.push(user);
                }

                socket.join(roomId);

                // Notify user of successful join
                socket.emit('room-joined', {
                    success: true,
                    room: room
                });

                // Notify other participants
                socket.to(roomId).emit('user-joined', {
                    user: user,
                    participants: room.participants
                });
            });

            // Handle code changes with real-time synchronization
            socket.on('code-change', (data) => {
                const { roomId, code, language } = data;
                const room = rooms.get(roomId);

                if (room) {
                    room.code = code;
                    room.language = language;
                    room.lastUpdated = new Date();
                    room.lastUpdatedBy = userSockets.get(socket.id)?.username;

                    // Broadcast to other participants with user info
                    socket.to(roomId).emit('code-updated', {
                        code: code,
                        language: language,
                        updatedBy: userSockets.get(socket.id)?.username,
                        timestamp: room.lastUpdated
                    });
                }
            });

            // Handle cursor position sharing
            socket.on('cursor-position', (data) => {
                const { roomId, line, column } = data;
                socket.to(roomId).emit('cursor-updated', {
                    userId: socket.id,
                    username: userSockets.get(socket.id)?.username,
                    line: line,
                    column: column
                });
            });

            // Handle chat messages
            socket.on('send-message', (data) => {
                const { roomId, message, user } = data;
                const room = rooms.get(roomId);

                if (room) {
                    const chatMessage = {
                        id: uuidv4(),
                        user: user,
                        message: message,
                        timestamp: new Date()
                    };

                    room.chat.push(chatMessage);

                    // Broadcast to all participants including sender
                    this.io.to(roomId).emit('new-message', chatMessage);
                }
            });

            // Handle WebRTC signaling
            socket.on('webrtc-offer', (data) => {
                socket.to(data.roomId).emit('webrtc-offer', {
                    offer: data.offer,
                    from: socket.id
                });
            });

            socket.on('webrtc-answer', (data) => {
                socket.to(data.to).emit('webrtc-answer', {
                    answer: data.answer,
                    from: socket.id
                });
            });

            socket.on('webrtc-ice-candidate', (data) => {
                socket.to(data.roomId).emit('webrtc-ice-candidate', {
                    candidate: data.candidate,
                    from: socket.id
                });
            });

            // Handle video/audio toggle
            socket.on('toggle-video', (data) => {
                socket.to(data.roomId).emit('user-video-toggle', {
                    userId: socket.id,
                    isVideoOn: data.isVideoOn
                });
            });

            socket.on('toggle-audio', (data) => {
                socket.to(data.roomId).emit('user-audio-toggle', {
                    userId: socket.id,
                    isAudioOn: data.isAudioOn
                });
            });

            // Handle code execution in room
            socket.on('execute-code', (data) => {
                socket.to(data.roomId).emit('code-execution-started', {
                    executedBy: userSockets.get(socket.id)?.username
                });
            });

            socket.on('execution-result', (data) => {
                socket.to(data.roomId).emit('code-execution-result', {
                    result: data.result,
                    executedBy: userSockets.get(socket.id)?.username
                });
            });

            // Handle disconnect
            socket.on('disconnect', () => {
                
                // Remove user from all rooms
                for (const [roomId, room] of rooms.entries()) {
                    const userIndex = room.participants.findIndex(p => 
                        userSockets.get(socket.id)?.id === p.id
                    );
                    
                    if (userIndex !== -1) {
                        const user = room.participants[userIndex];
                        room.participants.splice(userIndex, 1);
                        
                        // Notify other participants
                        socket.to(roomId).emit('user-left', {
                            user: user,
                            participants: room.participants
                        });

                        // If room is empty, mark as inactive
                        if (room.participants.length === 0) {
                            room.isActive = false;
                        }
                    }
                }

                userSockets.delete(socket.id);
            });

            // Leave room
            socket.on('leave-room', (data) => {
                const { roomId } = data;
                const room = rooms.get(roomId);
                
                if (room) {
                    const user = userSockets.get(socket.id);
                    const userIndex = room.participants.findIndex(p => p.id === user?.id);
                    
                    if (userIndex !== -1) {
                        room.participants.splice(userIndex, 1);
                        socket.leave(roomId);
                        
                        // Notify other participants
                        socket.to(roomId).emit('user-left', {
                            user: user,
                            participants: room.participants
                        });

                        // If room is empty, mark as inactive
                        if (room.participants.length === 0) {
                            room.isActive = false;
                        }
                    }
                }
            });
        });
    }

    // REST API endpoints
    getRoomInfo(req, res) {
        const { roomId } = req.params;
        const room = rooms.get(roomId);

        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }

        res.json({
            success: true,
            room: {
                id: room.id,
                problemId: room.problemId,
                problemTitle: room.problemTitle,
                participants: room.participants,
                isActive: room.isActive,
                createdAt: room.createdAt
            }
        });
    }

    getActiveRooms(req, res) {
        const activeRooms = Array.from(rooms.values())
            .filter(room => room.isActive)
            .map(room => ({
                id: room.id,
                problemId: room.problemId,
                problemTitle: room.problemTitle,
                participantCount: room.participants.length,
                createdAt: room.createdAt
            }));

        res.json({
            success: true,
            rooms: activeRooms
        });
    }
}

module.exports = CollaborationController;
