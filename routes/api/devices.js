const express = require("express");
const router  = express.Router();
const keys    = require("../../config/keys");
const auth    = require("../../middleware/auth");


//Load Device model
const Device = require("../../models/Device");
const Account = require("../../models/Account");

// @route GET api/devices/
// @desc  See All Devices
// @access Private
router.get("/", auth, async (req, res) => {

  try {
    const devices = await Device.find({ user: req.user.id });
    res.json(devices);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/devices/:{id}
// @desc  See Device by ID
// @access Private
router.get("/:id", auth, async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);

    if (!device) {
      res.status(404).json({ devicenotfound: "Device not found" });
    } else {
      res.status(200).json(device);
    }
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
}); //end Get Device by ID


// @route   GET api/devices/:account
// @desc    See devices associated with an account
// @access  Private

router.get("/:account", auth, async (req, res) => {
    try {


    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    } 
}); // end get account devices


module.exports = router;
