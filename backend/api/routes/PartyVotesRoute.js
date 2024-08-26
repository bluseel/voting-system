// In your Express server file
const express = require("express");
const router = express.Router();
const Voting = require("../../models/VotingModal"); // Adjust the path as necessary
const Party = require("../../models/PartyModal"); // Adjust the path as necessary

// Route to fetch live vote counts
router.get("/live-votes", async (req, res) => {
  try {
    // Step 1: Get all parties
    const parties = await Party.find({});

    // Step 2: Aggregate votes by partyID
    const votes = await Voting.aggregate([
      {
        $group: {
          _id: "$partyId", // Use partyID here
          count: { $sum: 1 },
        },
      },
    ]);

    // Step 3: Create a map of partyID to party details
    const partyMap = parties.reduce((map, party) => {
      map[party.partyId] = party;
      return map;
    }, {});

    // Step 4: Map votes to party details
    const partyVotes = votes.map((vote) => {
      const party = partyMap[vote._id];
      return {
        ...party.toObject(),
        voteCount: vote.count,
      };
    });

    // Include parties with zero votes
    const partyIDsWithVotes = votes.map((vote) => vote._id);
    const partiesWithZeroVotes = parties
      .filter((party) => !partyIDsWithVotes.includes(party.partyId))
      .map((party) => ({
        ...party.toObject(),
        voteCount: 0,
      }));

    // Combine parties with votes and parties with zero votes
    const result = [...partyVotes, ...partiesWithZeroVotes];

    res.json(result);
  } catch (error) {
    console.error("Error fetching live votes:", error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
