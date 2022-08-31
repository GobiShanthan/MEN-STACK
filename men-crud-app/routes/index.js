var express = require('express');
var router = express.Router();
const passport = require('passport');



// The root route renders our only view
router.get('/', function(req, res) {
  res.redirect('/users');
});




//------------------------------------------------------- AUTH SECTION START-------------------------------------------------------//
// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));


// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/users',
    failureRedirect : '/users'
  }
));


// OAuth logout route
router.get('/logout', function(req, res){
  req.logout(function(err){
    res.redirect('/users');
  });
 
});
//------------------------------------------------------- AUTH SECTION END-------------------------------------------------------//




module.exports = router;
