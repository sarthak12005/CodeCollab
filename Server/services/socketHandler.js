const { Server } = require('socket.io');
require('dotenv').config();


module.exports = (server) => {
    const io = new Server(server, {
        cors: {
            origin: [`${process.env.ORIGIN_ADDRESS1}`, `${process.env.ORIGIN_ADDRESS2}`],
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
        },
    });

    io.on('connection', (socket) => {
        console.log("A user is connected: ", socket.id);

        // Handing the join-room event for the live chat in my application 
        socket.on('join-room', (roomId) => {
            console.log(`User ${socket.id} joined room: ${roomId}`);
            socket.join(roomId);

            socket.on('send-message', (message, userId) => {
                console.log(`Message from ${userId} in room ${roomId}: ${message}`);
                io.to(roomId).emit('receive-message', { message, userId });
            });




        })

        socket.on('disconnect', () => {
            console.log("A user is disconnected: ", socket.id);
        });

    })
} 