const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddelware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(400).json({message: "Authrization failed"});

    try {
        // console.log("token recieved", token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("The decoded data from the verify is ",decoded);

        if (!decoded.id) {
             console.log("the userId is not provided ");
             res.status(404).json({message: "the userid is not found"});
        }


        req.user = {
            id: decoded.id,
            userId: decoded.id,
            username: decoded.username
        }

        next();

    } catch (err) {
        console.log("the error in jwt verify is : ", err);
        res.status(500).json({message: "Internal server in verifying jwt token", err});
    }

}

module.exports = authMiddelware;