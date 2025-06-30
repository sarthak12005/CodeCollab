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
        
    })
}