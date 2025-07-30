const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const { createServer } = require('http');
const socketIo = require('socket.io');
const CollaborationController = require('./controllers/collaborationController');

const server = createServer(app);

// Initialize Socket.io with CORS
const io = socketIo(server, {
    cors: {
        origin: ["http://localhost:5173", "http://localhost:5174", "https://code-collab-sable.vercel.app"],
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Initialize collaboration controller
const collaborationController = new CollaborationController(io);

//db connection 
const db = require('./config/db')
require('dotenv').config();

const PORT = process.env.PORT || 5000;



const origin_enpoint1 = process.env.ORIGIN_ADDRESS1;
const origin_enpoint2 = process.env.ORIGIN_ADDRESS2;





const startAPI = process.env.API_START;


// adding routes
const authRoutes = require('./routes/authRoute');
const problemRoutes = require('./routes/problemRoute');
const codeExecutionRoutes = require('./routes/codeExecutionRoute');
const preparationRoutes = require('./routes/preparationRoute');





app.use(cors({
  origin: [`${origin_enpoint1}`, `http://localhost:5174`, `https://code-collab-sable.vercel.app`], // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

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
  console.log(`server is running on ${PORT}`);
})
