const mongoose = require("mongoose");

const votingSchema = new mongoose.Schema({
  cnicVoter: { type: String, required: true, ref: "Voter" },
  partyId: { type: mongoose.Schema.Types.String, ref: "Party", required: true },
  dateTimeOfVote: { type: Date, required: true, default: Date.now },
});

const Voting = mongoose.model("Voting", votingSchema);

module.exports = Voting;
