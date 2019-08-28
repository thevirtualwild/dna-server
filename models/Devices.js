const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const DeviceSchema = new Schema({
  device_id: {
    type: String,
    required: true
  },

});
module.exports = User = mongoose.model("devices", DeviceSchema);
