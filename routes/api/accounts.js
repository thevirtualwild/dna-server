const express = require("express");
const router  = express.Router();
const bcrypt  = require("bcryptjs");
const jwt     = require("jsonwebtoken");
const keys    = require("../../config/keys");
const randomatic = require("randomatic");

//Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput    = require("../../validation/login");

//Load Account model
const Account = require("../../models/Account");

// @route GET api/accounts/
// @desc  See All Accounts
// @access Public
router.get("/", (req, res) => {
  Account.find(function(err, accounts) {
      if (err) {
        console.log(err);
      } else if (!accounts.keys(res.data).length) {
        res.status(200).json({accountnotfound: "no accounts found"});
      } else {
        res.json(accounts);
      }
  });
});

// @route GET api/accounts/:{id}
// @desc  See Account by ID
// @access Public
router.get("/:id", (req, res) => {
  // Find Account by Email
  Account.findById(req.params.id).then(account => {
    //Check if user exists
    if (!account) {
      return res.status(404).json({ accountnotfound: "Account not found" });
    }
    return res.status(200).json(account);
  });//end Account.findone
}); //end router(Login)



// @route POST api/accounts/register
// @desc  Register Account
// @access Public
router.post("/register", (req, res) => {

  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Account.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {

        //create new user if one doesnt exist with the email
        const newAccount = new Account({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          account_key: randomatic('A0',5)
        });
      }
  }); //end Account.findone

}); // end router.post(register)


module.exports = router;
