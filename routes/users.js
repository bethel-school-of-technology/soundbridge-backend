var express = require('express');
var router = express.Router();

/* // Defined store route
Router.route( '/add' ).post(function (req, res) {
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
Router.get('/', function (req, res) {
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
Router.get('/edit/:id',(function (req, res) {
  let id = req.params.id;
  User.findById(id, function (err, business){
      res.json(user);
  });
}));
//  Defined update route
Router.post('/update/:id',function (req, res) {
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
Router.delete('/delete/:id',function (req, res) {
    user.findByIdAndRemove({_id: req.params.id}, function(err, user){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
}); */

module.exports = router;