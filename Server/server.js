const express = require('express');
const cors = require('cors');
const db = require('./config/db')
require('dotenv').config();

const PORT = process.env.PORT || 9000;

const authRoutes = require('./routes/authRoute');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Import routes
app.use('/api/codecollab', authRoutes);

// Server Home path
app.get('/', (req, res) => {
     res.send("Welcome to the server of code collab");
})


// listener route
app.listen(PORT, () => {
     console.log(`server is running on http://localhost:${PORT}`);
})
