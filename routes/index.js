const express = require('express');
const router = express.Router();
const request = require('request');
let User = require('../models/users.model');
const SPOTIFY_CLIENT_ID = "94f0fc9ce18b4809bf951ec27dee0021";
const SPOTIFY_CLIENT_SECRET = "88c179d7425449beb19bacd9d5146fad";
const redirect_uri = 'http://localhost:3001/callback';

/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/login', function (req, res) {
  var scopes = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + SPOTIFY_CLIENT_ID +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') + 
    '&redirect_uri=' + redirect_uri );
});

/* Callback after Logged in to Sporify */

router.get('/callback', function(req, res) {
  let code = req.query.code || null
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code',
      client_id: SPOTIFY_CLIENT_ID,
      client_secret: SPOTIFY_CLIENT_SECRET
    },
    json: true
  }
  request.post(authOptions, function(error, response, body) {
    var access_token = body.access_token;
    let uri = 'http://localhost:3000/logged-in'
    res.redirect(uri + '?access_token=' + access_token)
  });
});

/* Retrieve User Info */

router.route('/user-info').get((req, res) => {
  User.find()
    .then(Users => res.json(Users))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
