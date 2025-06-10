const mongoose  = require('mongoose');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;


mongoose.connect(MONGO_URL)
 .then(() => {
    console.log('Connected to Code-Collab Database');
 }).catch((err) => {
    console.error('Error connecting to Code-Collab Database:', err);
 });


module.exports = mongoose;

