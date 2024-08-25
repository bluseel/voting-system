const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dob: { type: Date, required: true },
  cnic: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const Voter = mongoose.model("Voter", voterSchema);

module.exports = Voter;
