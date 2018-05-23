const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const HttpStatus = require('http-status-codes');
const jwt = require('jsonwebtoken');
const config = require('../config/general')


/* GET home page. */
router.get('/hello', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  // User.remove({})
  res.json({ greeting: "you are authed" });
});

/* POST login. */
router.post('/login', function (req, res, next) {
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (err) throw err;

    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).send({ success: false, message: 'Authentication failed. User not found.' });
    } else {
      // Check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) { return res.send({ success: false, message: err + 'hi!'}); }
        if (isMatch && !err) {
          // Create token if the password matched and no error was thrown
          var token = jwt.sign(user.toJSON(), config.jwtsecret, {
            expiresIn: 10080 // in seconds
          });

          user=user.toObject()
          user.token = 'JWT ' + token
          user.password = undefined

          return res.json({ success: true, user: user });
        } else {
          return res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
        }
      });
    }
  });
});


router.post('/register', function (req, res, next) {
  if (!req.body.email || !req.body.password) {
    return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: 'Please enter email and passwords.' });
  }

  var newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  // Attempt to save the user
  newUser.save(err => {
    if (err) {
      return res.status(HttpStatus.CONFLICT).json({ success: false, message: err.message });
    }
    return res.status(HttpStatus.OK).json({ success: true, user: newUser });

  });

});




module.exports = router;
