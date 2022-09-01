var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/users')



/* GET */
router.get('/',userCtrl.index);

router.get('/userpage',userCtrl.getUser)




module.exports = router;
