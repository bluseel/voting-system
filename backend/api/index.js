const express = require("express");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

require("dotenv").config();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*", // Allow all origins (adjust as needed for security)
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const port = 5000;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.options("/api/send-email", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.status(200).end();
});

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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
