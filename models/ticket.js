const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//PARTY SCHEMA

const ticketSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    partyId: { type: Schema.Types.ObjectId, ref: "Party" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
