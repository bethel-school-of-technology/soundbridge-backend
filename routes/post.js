const Router = require('express').Router();

const verify = require('./verifyToken');

Router.get('/', verify, (req,res) => {
    res.send(req.user);
    User.findByOne({_id: req.user});
});


module.exports = Router