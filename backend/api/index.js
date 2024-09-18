const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const imgur = require("imgur");
const cors = require("cors");
const Candidate = require("../models/CandidateModal");
const Party = require("../models/PartyModal");
const Voter = require("../models/VoterModal");
const Voting = require("../models/VotingModal");

// all routes
const CreatePartyRoute = require("./routes/CreatePartyRoute");
const DuplicationCheckRoute = require("./routes/DuplicationRoute");
const GetEmailRoute = require("./routes/GetEmailRoute");
const VotingRoute = require("./routes/VotingRoute");
const PartyVotesRoute = require("./routes/PartyVotesRoute");
const AdminRoutes = require("./routes/AdminRoutes");

require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(fileUpload()); // Ensure this middleware is used
app.use("/api", CreatePartyRoute); //api routes
app.use("/api/", DuplicationCheckRoute); //api routes
app.use("/api/", GetEmailRoute); //api routes
app.use("/api/", VotingRoute); //api routes
app.use("/api/", PartyVotesRoute); //api routes
app.use("/api/", AdminRoutes); //api routes

// Connect to MongoDB

mongoose
  // .connect("mongodb://localhost:27017/voting", {
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Route to create a candidate
app.post("/api/createcandidate", async (req, res) => {
  const { cnic, fullName: fullname, dob, email, address, partyId } = req.body;

  try {
    // Create a new candidate instance
    const newCandidate = new Candidate({
      cnic,
      email,
      partyId,
      fullname,
      dob,
      address,
    });
    console.log("Request Body:", newCandidate);

    // Save the candidate to the database
    const savedCandidate = await newCandidate.save();

    console.log(savedCandidate);
    res.status(201).json(savedCandidate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating candidate" });
  }
});

// Route to create a voter
app.post("/api/register-voter", async (req, res) => {
  const { fullName, dob, cnic, address, email } = req.body;

  // Age validation
  const birthDate = new Date(dob);
  const age = new Date().getFullYear() - birthDate.getFullYear();
  if (age < 18 || age > 110) {
    return res
      .status(400)
      .json({ error: "Age must be between 18 and 110 years." });
  }

  const newVoter = new Voter({
    fullName,
    dob,
    cnic,
    address,
    email,
  });

  console.log(newVoter);

  try {
    await newVoter.save();
    res.status(201).json({ message: "Voter registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to register voter" });
  }
});

// Route to get all parties
app.get("/api/parties", async (req, res) => {
  try {
    const parties = await Party.find({}, "partyId name imgUrl"); // Fetch only the fields you need
    res.json(parties);
  } catch (error) {
    console.error("Error fetching parties:", error);
    res.status(500).json({ error: "Error fetching parties" });
  }
});

// Route to handle sending email
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post("/api/send-email", (req, res) => {
  const { email, otp } = req.body;

  const msg = {
    to: email,
    from: "attiquerehmansahito@gmail.com",
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
    html: `<strong>Your OTP code is ${otp}</strong>`,
  };

  sgMail
    .send(msg)
    .then(() => {
      res.status(200).send("Email sent");
    })
    .catch((error) => {
      console.error("Error sending email:", error.response?.body || error);
      res.status(500).send("Error sending email");
    });
});

// Basic route
app.get("/", (req, res) => {
  res.send("Hello Worsld");
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
