const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  cnic: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  partyId: { type: Number, required: true },
  fullname: { type: String, required: true },
  dob: {
    type: Date,
    required: true,
  },
  address: { type: String, required: true },
});

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
