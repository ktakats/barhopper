var express = require('express');
var router = express.Router();
var Yelp=require('yelp');
require('dotenv').config({silent: true});
var passport=require('passport');

var yelp=new Yelp({
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET,
});


/* GET home page. */
router.get('/', function(req, res, next) {
  var user=null;
  if(req.isAuthenticated()){user=req.user}
  res.render('layout', {user: user });
});

router.get('/search', function(req, res){
  yelp.search({term:'nightlife', location: req.query.location, sort:2}, function(err, data){
    if(err) throw err;
    data.businesses.forEach(function(bar){
      bar.going=0;
    })
    res.json(data);
  });
});

/*User handling*/

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.post('/signup', passport.authenticate('local-signup',{
  successRedirect: '/',
  failureRedirect: '/',
  failureFlash: true
}));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/')
});

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()) return next();

  res.redirect('/');
}

module.exports = router;
