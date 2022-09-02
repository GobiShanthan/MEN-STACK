const express = require("express");
const router = express.Router();
const ticketCtrl = require("../controllers/ticket");

//GET ALL TICKETS
router.get("/", isLoggedIn, ticketCtrl.getTickets);

//CREATE SINGLE TICKET
router.post("/create/:partyId", isLoggedIn, ticketCtrl.createTickets);

//AUTHORIZATION
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;
