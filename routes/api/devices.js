const express = require("express");
const router  = express.Router();
const bcrypt  = require("bcryptjs");
const jwt     = require("jsonwebtoken");
const keys    = require("../../config/keys");
const randomatic = require("randomatic");

//Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput    = require("../../validation/login");

//Load Device model
const Device = require("../../models/Device");

// @route GET api/devices/
// @desc  See All Devices
// @access Public
router.get("/", (req, res) => {
  Device.find(function(err, devices) {
      if (err) {
        console.log(err);
      } else {
        res.json(devices);
      }
  });
});

// @route GET api/devices/:{id}
// @desc  See Device by ID
// @access Public
router.get("/:id", (req, res) => {
  // Find Device by Email
  Device.findById(req.params.id).then(device => {
    //Check if user exists
    if (!device) {
      return res.status(404).json({ devicenotfound: "Device not found" });
    }
    return res.status(200).json(device);
  });//end Device.findone
}); //end router(Login)




module.exports = router;
