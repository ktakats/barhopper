var express=require('express');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var Bars=require('../models/bars');
var Users=require('../models/user');

var barRouter=express.Router();
barRouter.use(bodyParser.json());

barRouter.route('/')
  .get(function(req,res){
    Bars.find({}).lean().exec(function(err,bars){
      if(err) throw err;
      bars.forEach(function(bar){
        bar.userIsGoing=false;
        if(req.isAuthenticated()){
          var l=bar.answers.filter(function(elem){return elem.person==req.user.id})
          if(l.length>0){
            bar.userIsGoing=true;
          }
        }
      });
      res.json(bars)
    });
  });

barRouter.route('/:id')
  .get(function(req,res){
    Bars.find({yelpid: req.params.id}, function(err, bars){
      if (err) throw err;
      if(bars.length>0){
        bars.push({proba: true});
    }
    res.json(bars)
    })

  })
  .post(function(req, res){
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
