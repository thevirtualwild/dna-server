const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const AccountSchema = new Schema({
  account_name: { // Company Name
    type: String,
    required: true
  },
  contact_name: {
    type: String,
    required: true
  },
  contact_email: {
    type: String,
    required: true
  },
  contact_phone: {
    type: Number,
    required: true
  },
  billing_address: {
    type: String,
    required: true
  },
  billing_city: {
    type: String,
    required: true
  },
  billing_state: {
    type: String,
    required: true
  },
  billing_postal: {
    type: Number,
    required: true
  },
  hours_of_operation: {
    type: String,
    required: false
  },
  stripe_customer_id: {
    type: String,
    required: false
  },
  company_details: {
    type: String,
    required: false
  },
  additional_details: {
    type: String,
    required: false
  },
  total_video_plays: {
    type: Number,
    required: true,
    default: 0
  },
  date_created: {
    type: Date,
    default: Date.now
  },
  date_modified: {
    type: Date,
    default: Date.now
  },
  last_modified_by: {
    type: String,
    default: null,
    required: false
  }
});
module.exports = User = mongoose.model("accounts", AccountSchema);
