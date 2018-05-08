/* This is the callback function run from the /auth/twitter/callback
endpoint once all logic from /auth/twitter has run. If no userId
is returned from the passport.authenticate function and there was no error,
the user is redirected to the login page, otherwise they are sent a cookie
 and redirected to the dashboard in a successful login.*/

const dotenv = require("dotenv");
const responses = require("../models/responses");
const usersService = require("../services/users.service");
const exceptionLogger = require("../services/exceptionLogger.service");
const dogsService = require("../services/dogs.service");
const apiPrefix = "/api/users";
const passport = require("passport");
const crypto = require("crypto");
const authenticate = require("../filters/authenticate");
const interactionManager = require("../managers/interaction.manager");
const mongodb = require("../mongodb");
const ObjectId = mongodb.ObjectId;
const stripeServices = require("../services/stripe.service");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/users");
const dogSchema = require("../models/dogs");
const validateDoc = require("../helpers/validate");
const sendgridServices = require("../services/email.service");
const hasher = require("../helpers/hasher");

const Exception = require("../models/exception");

module.exports = {
  // ... Code contributed by other team members goes here.
  socialMediaLoginCallback: socialMediaLoginCallback
  // ... Code contributed by other team members goes here.
};

// ... Code contributed by other team members goes here.

function socialMediaLoginCallback(req, res, next) {
  let socialMediaName = req.path.split("/");
  passport.authenticate(`${socialMediaName[2]}`, function(err, userId, info) {
    if (err) {
      return next(err);
    }
    if (!userId) {
      res.redirect("http://localhost:3000/auth/login");
    } else {
      let user = { _id: userId };
      authenticate.setAuthCookie(req, res, user);
    }
  })(req, res, next);
}

// ... Code contributed by other team members goes here.
