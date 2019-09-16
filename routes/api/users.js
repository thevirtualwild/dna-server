const express = require("express");
const router  = express.Router();
const bcrypt  = require("bcryptjs");
const jwt     = require("jsonwebtoken");
const keys    = require("../../config/keys");
const randomatic = require("randomatic");
const auth = require("../../middleware/auth");
const { check, validationResult } = require('express-validator/check');

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
router.post("/register",
  [
    check('name', 'Please add name')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
); // end router.post(register)


// @route   GET api/users/login
// @desc    Get Logged in User
// @access  Private
router.get("/login", auth, async (req, res) => {
  //console.log(req.user);
  try {
    const user = await User.findById(req.user.id).select('-password');
     res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

});

// @route   POST api/users/login
// @desc    Login user and return JWT token
// @access  Public
router.post("/login", (req, res) => {

  //Form validation
  const { errors, isValid } = validateLoginInput(req.body);

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
