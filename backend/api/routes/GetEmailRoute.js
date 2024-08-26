const express = require("express");
const router = express.Router();
const Candidate = require("../../models/CandidateModal");
const Voter = require("../../models/VoterModal");

// Route to fetch email based on CNIC
router.post("/get-email", async (req, res) => {
  const { cnic } = req.body;

  try {
    // Check if the CNIC belongs to a candidate
    const candidate = await Candidate.findOne({ cnic });
    if (candidate) {
      return res.status(200).json({ email: candidate.email });
    }

    // Check if the CNIC belongs to a voter
    const voter = await Voter.findOne({ cnic });
    if (voter) {
      return res.status(200).json({ email: voter.email });
    }

    // If CNIC is not found
    return res.status(420).json({ error: "CNIC not found." });
  } catch (error) {
    console.error("Error fetching email:", error);
    return res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
