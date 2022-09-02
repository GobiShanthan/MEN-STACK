const res = require("express/lib/response");
const Party = require("../models/party");
const Ticket = require("../models/ticket");

//FOR IMAGE URL
const request = require("request");
const fs = require("fs");

async function partyPage(req, res, next) {
  try {
    res.render("users/createParty", { user: req.user });
  } catch (err) {
    console.log(err);
  }
}

// CREATE PARTY

async function myParties(req, res, next) {
  try {
    let allMyParties = await Party.find({ host: req.user._id });
    res.render("users/myParties", { user: req.user, parties: allMyParties });
  } catch (error) {
    console.log(error);
    res.redirect("/users");
  }
}

////////////////////////////////////IMAGE UPLOAD///////////////////////////////////////////

function base64Encode(image) {
  // read binary data
  var bitmap = fs.readFileSync(image);
  // convert binary data to base64 encoded string
  return bitmap.toString("base64");
}

//CREATE A PARTY FUNCTION

function createParty(req, res, next) {
  let image = base64Encode(req.file.path);

  const options = {
    method: "POST",
    url: "https://api.imgur.com/3/image",
    headers: {
      Authorization: `Client-ID ${process.env.CLIENT_ID}`,
    },
    formData: {
      image,
      type: "base64",
    },
  };
  request(options, function (err, response) {
    if (err) return console.log(err);
    let imgData = JSON.parse(response.body);
    totalCreate(imgData.data.link);

    async function totalCreate(image) {
      let createObj = {
        host: req.user._id,
        image,
        numOfAvailableTickets: req.body.numOfTickets,
        ...req.body,
      };
      try {
        await Party.create(createObj);
        res.redirect("/parties/myparties");
      } catch (err) {
        console.log(err, "create error");
        res.redirect("/parties/myparties");
      }
    }
  });
}

// GET SINGLE PARTY INFO BY PARAMS ID
async function singleParty(req, res, next) {
  try {
    let singleParty = await Party.findById(req.params.partyId);
    res.render("users/oneParty", { party: singleParty, user: req.user });
  } catch (error) {
    console.log(error);
  }
}

//DELETE PARTY
async function deleteParty(req, res, next) {
  try {
    let partyInfo = await Party.findById(req.params.partyId);
    if (partyInfo.host.toString() === req.user._id.toString()) {
      await Ticket.deleteMany({ partyId: partyInfo._id });
      await Party.findByIdAndDelete(req.params.partyId);
      res.redirect("/parties/myparties");
    } else {
      console.log("You do not have access to delete this file");
      res.redirect("/users");
    }
  } catch (err) {
    console.log(err);
    res.redirect("/parties/myparties");
  }
}

async function updatePartyShow(req, res, next) {
  try {
    let party = await Party.findById(req.params.partyId);
    res.render("users/updatePage", { user: req.user, party });
  } catch (err) {
    console.log(err);
    res.redirect("/users");
  }
}

async function updateParty(req, res, next) {
  if (req.file && req.file.path) {
    let image = base64Encode(req.file.path);

    const options = {
      method: "POST",
      url: "https://api.imgur.com/3/image",
      headers: {
        Authorization: `Client-ID ${process.env.CLIENT_ID}`,
      },
      formData: {
        image,
        type: "base64",
      },
    };
    request(options, function (err, response) {
      if (err) return console.log(err);
      let imgData = JSON.parse(response.body);
      totalCreate(imgData.data.link);

      async function totalCreate(image) {
        let party = await Party.findById(req.params.partyId);
        const { name, desc, location, date, numOfTickets, price } = req.body;

        let createObj = {
          host: party.host,
          image: image,
          numOfAvailableTickets: party.numOfAvailableTickets,
          name: name ? name : party.name,
          desc: desc ? desc : party.desc,
          price: price ? price : party.price,
          location: location ? location : party.location,
          date: date ? date : party.date,
          numOfTickets: numOfTickets ? numOfTickets : party.numOfTickets,
        };
        try {
          await Party.findOneAndUpdate(req.params.partyId, createObj);
          res.redirect("/parties/myparties");
        } catch (err) {
          console.log(err, "create error");
          res.redirect("/parties/myparties");
        }
      }
    });
  } else {
    let party = await Party.findById(req.params.partyId);
    const { name, desc, location, date, numOfTickets, price } = req.body;

    let createObj = {
      host: party.host,
      image: party.image,
      numOfAvailableTickets: party.numOfAvailableTickets,
      name: name ? name : party.name,
      desc: desc ? desc : party.desc,
      price: price ? price : party.price,
      location: location ? location : party.location,
      date: date ? date : party.date,
      numOfTickets: numOfTickets ? numOfTickets : party.numOfTickets,
    };
    try {
      await Party.findOneAndUpdate(req.params.partyId, createObj);
      res.redirect("/parties/myparties");
    } catch (err) {
      console.log(err, "create error hedsdsadkjkdjksjdksajdkjsakdjsakjdsak");
      res.render("users/index", {
        user: req.user,
        route: req.query.route,
        updateSucces: "false",
      });
    }
  }
}

module.exports = {
  partyPage,
  createParty,
  myParties,
  deleteParty,
  singleParty,
  updateParty,
  updatePartyShow,
};
