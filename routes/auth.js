var express = require('express');
var Router = express.Router();
var User = require('../models/User');
var { registerValidation, loginValidation } = require('../services/validation');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Register

Router.post('/register', async (req, res, next) => {

    //Data Validation for Users
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if email already exists
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already Exists');

    //Password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a New User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send({
            userId: user._id,
            name: user.name,
            email: user.email,
            spotify: user.spotify,
            spotifyId: user.spotifyId,
            spotifyRefreshToken: user.spotifyRefreshToken
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

//Login

Router.post('/login', async (req, res) => {
    //Data Validation for Users
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email is not Found');

    //Checking if Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid Password");

    //Create and Assign a JWT
    if (user) {
        const token = jwt.sign(
            { _id: user._id },
            process.env.TOKEN_SECRET,
            { expiresIn: '1h' });
        res.cookie('jwt', token);
        res.send(user);
    }
});

//Logout

Router.get('/logout', function(req,res){
    res.cookie('jwt', "", {expires: new Date(0)});
    res.send('Logged Out')
  })

module.exports = Router;
