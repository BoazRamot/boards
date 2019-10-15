const router = require('express').Router();
const passport = require('passport');

// auth login
router
  .get('/login', (req, res) => {
    res.status(200).send('login');
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
  .get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.redirect(`http://localhost:3000/${req.user.id}`);
    // res.redirect(`http://localhost:3000/Home/${req.user.id}`);
    res.redirect(`http://localhost:3000/Home/${req.user}`);
    // res.redirect(`http://localhost:3000/`);
  });

module.exports = router;



