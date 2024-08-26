const express = require("express");
const router = express.Router();
const Candidate = require("../../models/CandidateModal");
const Voter = require("../../models/VoterModal");
const Voting = require("../../models/VotingModal"); // Import the Voting model

// Route to register a vote
router.post("/register-voting", async (req, res) => {
  const { cnicVoter, partyId, dateTimeOfVote } = req.body;

  try {
    // Create a new voting record
    const newVoting = new Voting({
      cnicVoter,
      partyId,
      dateTimeOfVote,
    });

    // Save the voting record to the database
    await newVoting.save();

    return res.status(200).json({ message: "Vote registered successfully." });
  } catch (error) {
    console.error("Error registering vote:", error);
    return res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
