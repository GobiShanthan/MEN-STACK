const mongoose = require('mongoose')
const Schema = mongoose.Schema




//PARTY SCHEMA


const partySchema =  new Schema({
    host: {type: Schema.Types.ObjectId ,ref:'User',required:true},
    name: {type:String, required:true},
    image: {type:String, required:true},
    desc: {type:String},
    location:{type:String, required:true},
    date:{type:Date,required:true},
    attendees:{type:String},
    numOfTickets:{type:Number, required:true},
    numOfAvailableTickets:{type: Number, required:true},
    price:{type:String, required:true},
  },{
    timestamps: true
  });




module.exports = mongoose.model('Party',partySchema)