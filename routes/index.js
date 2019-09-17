var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function (req, res) {
  res.send('You successfully created a POST route!');
});

router.put('/', function (req, res) {
  res.send('You successfully created a PUT route!');
});

router.delete('/', function (req, res) {
  res.send('You successfully created a DELETE route!');
});
module.exports = router;
