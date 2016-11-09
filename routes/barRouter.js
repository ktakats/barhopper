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
  })

module.exports=barRouter;  
