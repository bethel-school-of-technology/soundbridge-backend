var express = require('express');
var router = express.Router();
var request = require('request');
var SPOTIFY_CLIENT_ID = "94f0fc9ce18b4809bf951ec27dee0021";
var SPOTIFY_CLIENT_SECRET = "88c179d7425449beb19bacd9d5146fad";
var redirect_uri = 'http://localhost:3001/callback';

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

module.exports = router;
