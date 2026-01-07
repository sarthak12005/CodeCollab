const mongoose  = require('mongoose');
const logger = require('../logger/logger');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;


mongoose.connect(MONGO_URL)
 .then(() => {
    logger.info(`CodeCollab database connected successfully`)
 }).catch((err) => {
    logger.error('Error connecting to Code-Collab Database:', err);
 });


module.exports = mongoose;

