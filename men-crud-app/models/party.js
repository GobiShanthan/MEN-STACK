const mongoose = require('mongoose')
const Schema = mongoose.Schema




//PARTY SCHEMA


const partySchema =  new Schema({
    host: {type: Schema.Types.ObjectId ,ref:'User'},
    name: {type:String,require},
    image: {type:String},
    desc: {type:String,require},
    location:{type:String,require},
    date:{type:Date,require},
    ticketRequest: [Schema.Types.ObjectId],
    attendees:{type:String,require},
    numOfTickets:{type:String, require},
    price:{type:String,require},
  },{
    timestamps: true
  });




module.exports = mongoose.model('Party',partySchema)