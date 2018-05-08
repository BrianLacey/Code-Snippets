/* Route for Twitter login logic. The first API endpoint is called by
clicking the "login with Twitter" button on the front-end login page. 
The callback endpoint is invoked once the user returns from the 
Twitter redirect for authentication purposes.*/

const router = require("express").Router();
const usersController = require("../controllers/users.controller");
const validateBody = require("../filters/validate.body");
const User = require("../models/users");
const UsersLogin = require("../models/usersLogin");
const Password = require("../models/resetPassword");
const idFilter = require("../filters/id.filter");
const passport = require("passport");
const updatedDateTimestamp = require("../filters/timestamp");
const protectAdminOnlyUserUpdates = require('../filters/filter').protectAdminOnlyUserUpdates

module.exports = router;

// ... Code contributed by other team members goes here.
router.get("/auth/twitter", passport.authenticate("twitter"));
router.get("/auth/twitter/callback", usersController.socialMediaLoginCallback);
// ... Code contributed by other team members goes here.
