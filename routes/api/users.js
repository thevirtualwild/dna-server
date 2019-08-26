const express = require("express");
const router  = express.Router();
const bcrypt  = require("bcryptjs");
const jwt     = require("jsonwebtoken");
const keys    = require("../../config/keys");

//Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput    = require("../../validation/login");

//Load User model
const User = require("../../models/User");

// @route GET api/users/list
// @desc  See Users
// @access Public
router.get("/list", (req, res) => {
  User.find(function(err, users) {
      if (err) {
        console.log(err);
      } else {
        res.json(users);
      }
  });
});

// @route POST api/users/register
// @desc  Register User
// @access Public
router.post("/register", (req, res) => {

  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {

      //create new user if one doesnt exist with the email
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      //Hash PW before saving
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        }); // end bcrypt.hash
      }); // end bcyrpt.gensalt
    } // end if

  }); //end User.findone

}); // end router.post(register)



// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {

  //Form validation
  const { erros, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find User by Email
  User.findOne({ email }).then(user => {
    //Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    //Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //user exists and passwords matches
        //create JWT jwt_payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password Incorrect"});
      }
    })
  });//end User.findone
}); //end router(Login)

module.exports = router;