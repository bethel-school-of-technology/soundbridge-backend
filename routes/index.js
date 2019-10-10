const express = require('express');
const Router = express.Router();
const Request = require('request');

// For passport
// const validateRegisterInput = require('../services/register');
const User = require('../models/User');
const SPOTIFY_CLIENT_ID = "94f0fc9ce18b4809bf951ec27dee0021";
const SPOTIFY_CLIENT_SECRET = "88c179d7425449beb19bacd9d5146fad";
const redirect_uri = 'http://localhost:4000/callback';

Router.get('/', (req, res) => {
  res.render('index');
});

/* Spotify Login */

Router.get('/spotify-login', function (req, res) {
  var scopes = 'user-read-private user-read-email user-library-read user-library-modify';
  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + SPOTIFY_CLIENT_ID +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + redirect_uri);
});

/* Callback after Logged in to Spotify */

Router.get('/callback', function (req, res) {
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
  Request.post(authOptions, function (error, response, body) {
    var refresh_token = body.refresh_token;
    var access_token = body.access_token;
    // let uri = 'http://localhost:3000/spotify-logged-in'
    let uri = 'https://soundbridge.netlify.com/spotify-logged-in'
    res.redirect(uri + '/' + access_token + '/' + refresh_token);
  });
});

/* Put Spotify details on User in Database */

Router.post('/add-spotify', (req, res) => {
  console.log(req.body);
  User.findOneAndUpdate(
    {
      email: req.body.email
    },
    {
      spotify: req.body.spotify,
      spotifyId: req.body.spotifyId,
      spotifyRefreshToken: req.body.spotifyRefreshToken
    }, (err, doc) => {
      res.send(doc)
    });
});

/* Login with Spotify already linked */

Router.post('/has-spotify/:refresh_token', (req, res) => {
  let refresh_token = req.params.refresh_token;
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      grant_type: 'refresh_token',
      refresh_token,
      client_id: SPOTIFY_CLIENT_ID,
      client_secret: SPOTIFY_CLIENT_SECRET
    },
    json: true
  }
  Request.post(authOptions, (error, response, body) => {
    res.send(body.access_token);
  });
});

/* Retrieve User Info */

Router.route('/user-info').get((req, res) => {
  User.find()
    .then(Users => res.json(Users))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = Router;
