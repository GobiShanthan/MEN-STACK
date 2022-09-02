const User = require("../models/user");
const Party = require("../models/party");

// RETURN ALL DATA
async function index(req, res, next) {
  try {
    let parties = await Party.find({});
    res.render("users/index", {
      user: req.user,
      parties,
    });
  } catch (error) {
    res.redirect("/users");
  }
}

// GET ONE USER
function getUser(req, res, next) {
  try {
    res.render("users/userpage", { user: req.user });
  } catch (error) {
    console.log("error:", error);
    res.redirect("/users");
  }
}

module.exports = { index, getUser };
