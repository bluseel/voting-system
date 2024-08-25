const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({
  cnic: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

const Voter = mongoose.model("Voter", voterSchema);

module.exports = Voter;
