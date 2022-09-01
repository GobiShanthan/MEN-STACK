const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema =  new Schema({
    name: String,
    email: String,
    avatar: String,
    googleId: String,
    isAdmin:{type:Boolean, default:false}
  },{
    timestamps: true
  });

  
module.exports = mongoose.model('User',userSchema)