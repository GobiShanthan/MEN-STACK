const express = require("express");
const router = express.Router();
const partyCtrl = require("../controllers/party");

///IMAGE UPLOAD START
const multer = require("multer");
const res = require("express/lib/response");
const upload = multer({ dest: "uploads/" });
///IMAGE UPLOAD END

// RENDER CREATE PARTY FORM PAGE ROUTE
router.get("/createparty", isLoggedIn, partyCtrl.partyPage);

// GET LIST OF USERS PARTIES ROUTE
router.get("/myparties", isLoggedIn, partyCtrl.myParties);

//CREATE PARTY ROUTE
router.post(
  "/createparty",
  isLoggedIn,
  upload.single("image"),
  partyCtrl.createParty
);

// GET SINGLE PARTY PAGE ROUTE
router.get("/:partyId", partyCtrl.singleParty);

//DELETE PARTY ROUTE
router.delete("/:partyId/delete", isLoggedIn, partyCtrl.deleteParty);

//UPDATE PARTY SHOW
router.get("/:partyId/edit", isLoggedIn, partyCtrl.updatePartyShow);

//UPDATE PARTY PUT REQUEST
router.put("/:partyId/update",isLoggedIn,upload.single("image"),partyCtrl.updateParty);

//AUTHORIZATION
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;
