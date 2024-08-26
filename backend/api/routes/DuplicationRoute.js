// create party

const express = require("express");
const router = express.Router();
const Candidate = require("../../models/CandidateModal");
const Voter = require("../../models/VoterModal");

// Route to handle creating a party
router.post("/duplication-check", async (req, res) => {
  const { cnic, email } = req.body;
  // Check if the voter already exists by CNIC
  const existingCandidate = await Candidate.findOne({ cnic });
  if (existingCandidate) {
    return res
      .status(410)
      .json({ error: "CNIC already registered as candidate." });
  }
  const existingVoter = await Voter.findOne({ cnic });
  if (existingVoter) {
    return res.status(410).json({ error: "CNIC already registered as voter." });
  }

  return res.status(200).json({ messsage: "CNIC is unique." });
});

module.exports = router;
