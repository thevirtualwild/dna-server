const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const DeviceSchema = new Schema({
  account: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'accounts'
  },
  device_id: {
    type: String
  },
  device_serial: {
    type: String
  },
  device_UUID: {
    type: String
  }

});
module.exports = User = mongoose.model("devices", DeviceSchema);
