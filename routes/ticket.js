const express = require('express')
const router = express.Router()
const ticketCtrl = require('../controllers/ticket')





router.get('/',ticketCtrl.getTickets)
router.post('/create/:partyId',ticketCtrl.createTickets)






module.exports = router