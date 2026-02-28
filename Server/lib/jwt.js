const jwt = require('jsonwebtoken');

exports.generateToken = (userId, username, secret, expiry) => {
    return jwt.sign({ id: userId, username: username }, secret, { expiresIn: expiry });
}