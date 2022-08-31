const express = require('express')
const router = express.Router()
const partyCtrl = require('../controllers/party')

///IMAGE UPLOAD START
const multer = require("multer");
const res = require('express/lib/response');
const upload = multer({ dest: 'uploads/'});
///IMAGE UPLOAD END






// RENDER CREATE PARTY FORM PAGE ROUTE
router.get('/createparty',partyCtrl.partyPage)


// GET LIST OF USERS PARTIES ROUTE
router.get('/myparties',partyCtrl.myParties)



//CREATE PARTY ROUTE
router.post('/createparty',upload.single('image'),partyCtrl.createParty)



// GET SINGLE PARTY PAGE ROUTE
router.get('/:partyId',partyCtrl.singleParty)


//DELETE PARTY ROUTE
router.post('/:partyId/delete',partyCtrl.deleteParty)






module.exports = router