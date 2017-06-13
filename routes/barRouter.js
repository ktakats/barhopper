var express=require('express');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var Bars=require('../models/bars');
var Users=require('../models/user');

var barRouter=express.Router();
barRouter.use(bodyParser.json());

barRouter.route('/')
  .get(function(req,res){
    Bars.find({}, function(err, bars){
      if(err) throw err;
     res.json(bars)
    })
  });

barRouter.route('/:id')
  .get(function(req,res){
    console.log(req.params.id)
    Bars.find({yelpid: req.params.id}, function(err, bars){
      if (err) throw err;

      res.json(bars)
    })
  })
  .post(function(req, res){
    console.log(req.user)
    var query = {yelpid: req.params.id},
    update = { $push: {answers: {person: req.user}}, new: true },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

// Find the document
    Bars.findOneAndUpdate(query, update, options, function(error, result) {
      if (error) throw error;
      res.json(result);
    //  res.redirect(req.get('referer'));
    // do something with the document
    });


  });

module.exports=barRouter;
