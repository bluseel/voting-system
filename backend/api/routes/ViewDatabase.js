const express = require("express");
const router = express.Router();

// Import models
const Voting = require("../../models/VotingModal");
const Voter = require("../../models/VoterModal");
const Party = require("../../models/PartyModal");
const Candidate = require("../../models/CandidateModal");

// Route to get all votings with party name, voter cnic, and vote date
router.get("/votings", async (req, res) => {
  try {
    // Fetch all votings
    const votings = await Voting.find();

    // For each voting, find the corresponding party name and format the output
    const enhancedVotings = await Promise.all(
      votings.map(async (voting) => {
        // Find the party by partyId (using partyId field in the Party model)
        const party = await Party.findOne({ partyId: voting.partyId }); // Adjust field name as needed
        return {
          cnicVoter: voting.cnicVoter, // Add cnicVoter
          dateTimeOfVote: voting.dateTimeOfVote, // Add dateTimeOfVote
          partyName: party ? party.name : null, // Add partyName
        };
      })
    );

    // Return the enhanced votings with only the selected fields
    res.status(200).json(enhancedVotings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch votings", details: err });
  }
});

// Route to get all voters
router.get("/voters", async (req, res) => {
  try {
    const voters = await Voter.find();
    res.status(200).json(voters);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch voters", details: err });
  }
});

// Route to get all parties
router.get("/parties", async (req, res) => {
  try {
    const parties = await Party.find();
    res.status(200).json(parties);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch parties", details: err });
  }
});

// Route to get all candidates
router.get("/candidates", async (req, res) => {
  try {
    const candidates = await Candidate.find().populate("partyId", "name");
    res.status(200).json(candidates);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch candidates", details: err });
  }
});

module.exports = router;
