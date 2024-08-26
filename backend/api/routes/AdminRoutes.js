const express = require("express");
const router = express.Router();
const Candidate = require("../../models/CandidateModal");
const Voter = require("../../models/VoterModal");
const Party = require("../../models/PartyModal");
const Voting = require("../../models/VotingModal");
const Admin = require("../../models/AdminModal");

// Route to delete all records in each collection
router.post("/reset-everything", async (req, res) => {
  try {
    await Candidate.deleteMany({});

    await Voter.deleteMany({});

    await Party.deleteMany({});

    await Voting.deleteMany({});

    // Check if an Admin document exists
    const adminExists = await Admin.findOne({});
    if (!adminExists) {
      // Create the default Admin document if none exists
      await Admin.create({ adminName: "fida", currentPhase: "Registration" });
    }

    res.status(200).send({ message: "All collections have been reset." });
  } catch (error) {
    console.error("Error deleting records:", error);
    res
      .status(500)
      .send({ error: "An error occurred while resetting the collections." });
  }
});

// Route to update the currentPhase of the admin named "fida"
router.post("/update-phase", async (req, res) => {
  try {
    const { newPhase } = req.body;

    if (!newPhase) {
      return res.status(400).send({ error: "newPhase is required" });
    }

    // Find the admin with the name "fida"
    const admin = await Admin.findOneAndUpdate(
      { adminName: "fida" },
      { currentPhase: newPhase },
      { new: true } // This option returns the updated document
    );

    if (!admin) {
      return res
        .status(404)
        .send({ error: "Admin with name 'fida' not found" });
    }

    res
      .status(200)
      .send({ message: "Admin phase updated successfully", admin });
  } catch (error) {
    console.error("Error updating admin phase:", error);
    res
      .status(500)
      .send({ error: "An error occurred while updating the phase" });
  }
});

// Route to get the currentPhase of the admin named "fida"
router.get("/current-phase", async (req, res) => {
  try {
    const admin = await Admin.findOne({ adminName: "fida" });

    if (!admin) {
      return res
        .status(404)
        .send({ error: "Admin with name 'fida' not found" });
    }

    res.status(200).send({ currentPhase: admin.currentPhase });
  } catch (error) {
    console.error("Error fetching current phase:", error);
    res
      .status(500)
      .send({ error: "An error occurred while fetching the current phase" });
  }
});

module.exports = router;
