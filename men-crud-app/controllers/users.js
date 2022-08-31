const User = require('../models/user')
const Party = require('../models/party')


//FOR IMAGE URL
const request = require('request');
const fs = require('fs');


// RETURN ALL DATA
async function index(req, res, next) {
  let parties = await Party.find({})
    try{
        res.render('users/index',{
            user:req.user,
            parties
          })
    }catch(error){
        res.render('user/index',{userError:error})
    }
}

// GET ONE USER
function getUser(req,res,next){
  try{
    res.render('users/userpage',{user:req.user})
  }catch(error){
    console.log('error:',error)
  }
}



  module.exports = {index,getUser}