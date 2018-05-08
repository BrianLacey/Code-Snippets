/* I am a contributor to the passport.js and original author
of the twitterLogin function. I refactored the socialMediaLogin
function to make it dynamic depending on whether the user logged in
with Facebook or Twitter, in keeping with the best practice of not
repeating code. */

const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const session = require("express-session");
const dotenv = require("dotenv");
const usersService = require("./services/users.service");
const responses = require("./models/responses");

module.exports = {
  // ... Code contributed by another team member.
  twitterLogin: twitterLogin
};

// ... Facebook login code contributed by another team member.

function twitterLogin() {
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        userProfileURL: process.env.TWITTER_USER_PROFILE_URL,
        callbackURL: process.env.TWITTER_CALLBACK_URL
      },
      function(token, tokenSecret, profile, done) {
        socialMediaLogin(token, tokenSecret, profile, done);
      }
    )
  );
}

function socialMediaLogin(token, secondToken, profile, done) {
  usersService.readByIdSocialMedia(profile).then(userId => {
    if (userId) {
      return done(null, userId);
    }
    if (!userId) {
      let socialMedia = profile.provider;
      const socialMediaUser = {
        [socialMedia]: {
          token: token,
          _id: profile.id,
          imageUrl: profile.photos[0].value
        },
        email: profile.emails[0].value,
        isEmailConfirmed: true,
        subscription:{
          isPremiumUser: false
        },
        defaultImageUrl:  profile.photos[0].value,
        createDate: new Date(),
        updateDate: new Date()
      };
      usersService.create(socialMediaUser).then(socialMediaUserId => {
        return done(null, socialMediaUserId);
      });
    }
  });
}
