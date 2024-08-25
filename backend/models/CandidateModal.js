const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  cnic: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  partyId: { type: mongoose.Schema.Types.String, ref: "Party", required: true },
  name: { type: String, required: true },
});

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
