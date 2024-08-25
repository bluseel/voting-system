const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const imgur = require("imgur");
const cors = require("cors");
const Party = require("../models/PartyModal");
const CreatePartyRoute = require("./routes/CreatePartyRoute");

require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(fileUpload()); // Ensure this middleware is used
app.use("/api", CreatePartyRoute); //api routes

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/voting", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

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
  res.send("Hello World");
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
