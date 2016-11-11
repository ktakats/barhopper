var express=require('express');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var Bars=require('../models/bars');

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
    console.log(req.params.id)
    Bars.find({yelpid: req.params.id}, function(err, bars){
      if (err) throw err;
      console.log(bars.length)
      if(bars.length!=0){
        bars.answers.push({person: 'kati'});
        bars.save(function(err, bar){
          if (err) throw err;
        });
      }
      else{

        Bars.create({yelpid: req.params.id, answers: [{person: 'kati'}]}, function(err, bar){
          if(err) throw err;
        })
      }

      res.redirect(req.get('referer'));
    })

  });

module.exports=barRouter;
