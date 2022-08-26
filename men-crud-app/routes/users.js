var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/users')

///IMAGE UPLOAD
const multer = require("multer");
const upload = multer({ dest: 'uploads/'});

/* GET users listing. */
router.get('/',userCtrl.index);

router.post('/upload',upload.single('image'),userCtrl.upload)


module.exports = router;
