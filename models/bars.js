var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var answerSchema=new Schema({
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},{
  timestamps: true
});

var barSchema=new Schema({
  yelpid:{
    type: String
  },
  answers: [answerSchema]
})



var Bars=mongoose.model('Bar', barSchema);

module.exports=Bars;
