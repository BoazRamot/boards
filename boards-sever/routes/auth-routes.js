const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/user');
const auth = require('../middleware/auth');

// auth login
router
  .get('/login', auth, async (req, res) => {
    try {
      // const user = await User.findById(req.user.id).select('-password');
      const user = await User.findById(req.user.id);
      // res.json(user);
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  })

// auth logout
  .get('/logout', (req, res) => {
    req.logout();
    res.redirect('http://localhost:3000/');
  })

// auth with google
  .get('/google', passport.authenticate('google', {
    scope: ['profile']
  }))


// callback route for google to redirect to
// hand control to passport to use code to grab profile info
  .get('/google/redirect',
    passport.authenticate('google', {session: false}),
    (req, res) => {
      // Return jsonwebtoken
      const payload = {
        user: {
          id: req.user.id,
        },
      };

      jwt.sign(payload, keys.jwt.secret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.redirect(`http://localhost:3000/Redirect/${token}`);
      });
  });

module.exports = router;



