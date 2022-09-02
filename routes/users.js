var express = require("express");
var router = express.Router();
var userCtrl = require("../controllers/users");

/* GET MAIN PAGE USER AND ALL PARTIES*/
router.get("/", userCtrl.index);

//GO TO USER PAGE
router.get("/userpage", userCtrl.getUser);

module.exports = router;
