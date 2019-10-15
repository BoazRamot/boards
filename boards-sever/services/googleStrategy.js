const GoogleStrategy = require('passport-google-oauth20/lib').Strategy;
const keys = require('../config/keys');
const User = require('../models/user');

const googleStrategy = new GoogleStrategy({
  // options for google strategy
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret,
  callbackURL: '/api/auth/google/redirect'
}, (accessToken, refreshToken, profile, done) => {
  // passport callback function
  // check if user already exists in our own db
  User.findOne({googleId: profile.id}).then((currentUser) => {
    if(currentUser){
      // already have this user
      console.log('user is: ', currentUser);
      done(null, currentUser);
    } else {
      // if not, create user in our db
      new User({
        googleId: profile.id,
        username: profile.displayName,
        thumbnail: profile._json.image.url
      }).save().then((newUser) => {
        console.log('created new user: ', newUser);
        done(null, newUser);
      });
    }
  });
});

module.exports = googleStrategy;