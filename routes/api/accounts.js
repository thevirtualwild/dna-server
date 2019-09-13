const express = require("express");
const router  = express.Router();
const keys    = require("../../config/keys");
const randomatic = require("randomatic");


//Load Account model
const Account = require("../../models/Account");

// @route GET api/accounts/
// @desc  See All Accounts
// @access Public
router.get("/", (req, res) => {
  Account.find(function(err, accounts) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(accounts);
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
  //check to make sure account doestn exist
  Account.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {

        //create new user if one doesnt exist with the email
        const newAccount = new Account({
          account_name: req.body.name,
          contact_name: req.body.contact_name,
          contact_email: req.body.email,
          contact_phone: req.body.phone,
          billing_address: req.body.billing_address,
          billing_city: req.body.billing_city,
          billing_state: req.body.billing_state,
          billing_postal: req.body.billing_postal,
          hours_of_operation: req.body.hours,
          company_details: req.body.company_details,
          additional_details: req.body.additional_details,
          created_by: null, // User who created the account
          last_modified_by: null, //Currently Logged In User
          account_key: randomatic('A0',5)
        });

        newAccount.save()
          .then(account => res.json(account))
          .catch(err => {
            console.log(err);
            res.status(400).json({ error: "Record not Created. Error Thrown"});
          });

      }
  }); //end Account.findone

}); // end router.post(register)


module.exports = router;
