const passport = require('passport/lib');
const User = require('../models/user');
const googleStrategy = require('./googleStrategy');
const localStrategy = require('./localStrategy');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(googleStrategy);
// passport.use('register',localStrategy);

