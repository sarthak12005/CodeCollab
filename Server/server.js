const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const { createServer } = require('http');

const server = createServer(app);

// const io = socketIo(server);

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





app.use(cors({
  origin: [`${origin_enpoint1}`, `${origin_enpoint2}`], // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// declare route with end point
app.use(`/api/codecollab`, authRoutes);
app.use(`/api/codecollab/problem`, problemRoutes);


// In your route handler
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'server.html'));
});


// listener route
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
})
