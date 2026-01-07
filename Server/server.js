const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const { createServer } = require('http');
const socketIo = require('socket.io');
//db connection 
const db = require('./config/db')
require('dotenv').config();
const CollaborationController = require('./controllers/collaborationController');

const server = createServer(app);

const origin_enpoint1 = process.env.ORIGIN_ADDRESS1;
const origin_enpoint2 = process.env.ORIGIN_ADDRESS2;
const origin_enpoint3 = process.env.ORIGIN_ADDRESS3;
const origin_enpoint4 = process.env.ORIGIN_ADDRESS4;

// Initialize Socket.io with CORS
const io = socketIo(server, {
  cors: {
    origin: [`${origin_enpoint1}`, `${origin_enpoint2}`, `${origin_enpoint3}`, `${origin_enpoint4}`],
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Initialize collaboration controller
const collaborationController = new CollaborationController(io);


const PORT = process.env.PORT || 5000;

const startAPI = process.env.API_START;


// adding routes
const authRoutes = require('./routes/authRoute');
const problemRoutes = require('./routes/problemRoute');
const codeExecutionRoutes = require('./routes/codeExecutionRoute');
const preparationRoutes = require('./routes/preparationRoute');
const logger = require('./logger/logger');
const errorMiddleware = require('./middleware/error.middleware');





app.use(cors({
  origin: [`${origin_enpoint1}`, `${origin_enpoint2}`, `${origin_enpoint3}`, `${origin_enpoint4}`], // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' })); 
app.use(errorMiddleware);

// declare route with end point
app.use(`${startAPI}`, authRoutes);
app.use(`${startAPI}/problem`, problemRoutes);
app.use(`${startAPI}/code`, codeExecutionRoutes);
app.use(`${startAPI}/preparation`, preparationRoutes);

// Collaboration routes
app.get(`${startAPI}/collaboration/room/:roomId`, collaborationController.getRoomInfo.bind(collaborationController));
app.get(`${startAPI}/collaboration/rooms`, collaborationController.getActiveRooms.bind(collaborationController));


// In your route handler
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'server.html'));
});

app.get('/ping', (req, res) => {
  res.status(200).json({ message: "pong" });
})

// listener route
server.listen(PORT, () => {
   logger.info(`Server is running on ${PORT}`)
})
