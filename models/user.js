var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bcrypt=require('bcrypt-nodejs');
//https://scotch.io/tutorials/easy-node-authentication-setup-and-local
var UserSchema=new Schema({
  local: {
    email: String,
    password: String,
  },
});

//generate a hash
UserSchema.methods.generateHash=function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//check if password is valid
UserSchema.methods.validPassword=function(password){
  return bcrypt.compareSync(password, this.local.password);
};


module.exports=mongoose.model('User', UserSchema);
