var express = require('express');
var Router = express.Router();
var User = require('../models/User');
var { registerValidation, loginValidation } = require('../validation');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');



/* 
// Defined store route
Router.route('/add').post(function (req, res) {
  let user = new User(req.body);
  user.save()
    .then(user => {
      res.status(200).json({'user': 'user added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
Router.route('/').get(function (req, res) {
    User.find(function(err, users){
    if(err){
      console.log(err);
    }
    else {
      res.json(users);
    }
  });
});

// Defined edit route
Router.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  User.findById(id, function (err, business){
      res.json(user);
  });
});

//  Defined update route
Router.route('/update/:id').post(function (req, res) {
    User.findById(req.params.id, function(err, user) {
    if (!user)
      res.status(404).send("data is not found");
    else {
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;

        user.save().then(user => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
Router.route('/delete/:id').get(function (req, res) {
    user.findByIdAndRemove({_id: req.params.id}, function(err, user){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
}); */


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
    res.send({ user: user._id });
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
 
  if (user) {
    //Create and Assign a JWT
    const token = jwt.sign(
      { _id: user._id },
      process.env.TOKEN_SECRET,
      { expiresIn: '1h' });
    res.cookie('jwt', token);
    res.send('Login Successful');
  } else {
    console.log('Wrong Password');
    res.redirect('login')
  }

})


//Logout

Router.get('/logout', function(req,res){
  res.cookie('jwt', "", {expires: new Date(0)});
  res.send('Logged Out')
})

module.exports = Router;