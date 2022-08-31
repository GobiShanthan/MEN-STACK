const Ticket = require('../models/ticket');




// CREATE TICKETS
async function createTickets(req,res,next){
    console.log(req.body);
    let ticketObj={userId:req.user._id,partyId:req.params.partyId}
    let overOneTicket = []
    for(let i = 0; i < req.body.numbOfTicks;i++){
        overOneTicket.push(ticketObj)
    }


    if(parseInt(req.body.numbOfTicks) === 1 ){
        try{
            await Ticket.create(ticketObj)
            res.redirect('/users')
        }catch(err){
            console.log(err,'-<<<<<<<<<<<< error inside the create ticket')
        }
    }else{
        try{
            await Ticket.create(overOneTicket)
            res.redirect('/users')
        }catch(err){
            console.log(err,'-<<<<<<<<<<<< error inside the create ticket')
        }
    }
}


//ALL MY TICKETS

async function getTickets(req, res,next){
    try{
        let tickets = await Ticket.find({userId:req.user._id}).populate('partyId')
        res.render('users/myTickets',{user:req.user,tickets})
    }catch(error){
        console.log(error)
    }
}







module.exports={createTickets,getTickets}