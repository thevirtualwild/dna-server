const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const DeviceSchema = new Schema({
  device_id: {
    type: String,
    required: true
  },
  device_serial: {
    type: String,
    required: false
  },
  device_UUID: {
    type: String,
    required: false
  }

});
module.exports = User = mongoose.model("devices", DeviceSchema);
