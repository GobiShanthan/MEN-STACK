var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var dotenv = require("dotenv");
dotenv.config();

// FOR AUTH
var session = require("express-session");
var passport = require("passport");

require("./config/database");

require("./config/passport");

var logger = require("morgan");
var methodOverride = require("method-override");

// ROUTES IMPORTS
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var ticketsRouter = require("./routes/ticket");
var partiesRouter = require("./routes/party");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//// FOR GOOGLE AUTH
app.use(
  session({
    secret: "SEIRocks!",
    resave: false,
    saveUninitialized: true,
  })
);

//PASSPORT
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method")); // add this

//ROUTES
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/tickets", ticketsRouter);
app.use("/parties", partiesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
