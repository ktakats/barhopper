var express = require('express');
var router = express.Router();
var Yelp=require('yelp');
require('dotenv').config({silent: true});

var yelp=new Yelp({
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET,
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout');
});

router.get('/search', function(req, res){
  yelp.search({term:'nightlife', location: req.query.location, sort:2}, function(err, data){
    if(err) throw err;
    res.json(data);
  });
});

module.exports = router;
