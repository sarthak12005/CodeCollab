const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.loginUser = async (req, res) => {
     try {

        const {username, password} = req.body;

        const user = await User.findOne({username}).select('+password');

        if (!user) {
            console.log("the user does not found");
            res.status(404).json({message: "the user does not found"});
        }

        const validateUser = await bcrypt.compare(password, user.password);

        if (!validateUser) {
            console.log("password does not matched ");
            res.status(400).json({message: "incorrect password"});
        }


        res.status(200).json({message: "User login successfully: ",user});

     } catch(err) {
         console.log("the error in adding user is ", err);
         res.status(500).json({message: "internal server error", err});
     }
}

exports.signUpUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;

         if (!username || !email || !password) {
             console.log("credentials required ");
             res.status(401).json({message: "creadentials missing"});
         }

         const salt = await  bcrypt.genSalt(10);
         const hashPassword = await bcrypt.hash(password, salt);
         console.log(hashPassword);

         const newUser = new User({
             username,
             email,
             password: hashPassword
         });

         await newUser.save();


    } catch (err) {
        console.log("error in registering user", err);
        res.status(500).json({message: "Internal Server error", err});
    }
}

exports.editUser = async (req, res) => {
     
}


