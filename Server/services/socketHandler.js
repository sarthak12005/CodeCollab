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
        // connection events handled (logging removed)

        // Handing the join-room event for the live chat in my application 
        socket.on('join-room', (roomId) => {
            socket.join(roomId);

            socket.on('send-message', (message, userId) => {
                io.to(roomId).emit('receive-message', { message, userId });
            });

        })

        socket.on('disconnect', () => {
            // socket disconnected
        });

    })
} 