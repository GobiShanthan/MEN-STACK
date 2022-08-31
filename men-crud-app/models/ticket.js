const mongoose = require('mongoose')
const Schema = mongoose.Schema




//PARTY SCHEMA


const ticketSchema =  new Schema({
    userID:{type:[Schema.Types.ObjectId],ref:'Party'},
    partyId:{type:[Schema.Types.ObjectId],ref:'Party'}
  },{
    timestamps: true
  });




module.exports = mongoose.model('Ticket',ticketSchema)