const express = require("express");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

require("dotenv").config(); // Ensure dotenv is required before accessing process.env
const app = express();
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: "https://voting-frontend-delta.vercel.app", // Allow only this origin
    methods: ["GET", "POST", "OPTIONS"], // Allow GET, POST, and OPTIONS methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
    credentials: true,
  })
);

const port = 5000;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.options("/api/send-email", (req, res) => {
  // Handle preflight request
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://voting-frontend-delta.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.status(200).end();
});

app.post("/api/send-email", (req, res) => {
  const { email, otp } = req.body;

  const msg = {
    to: email,
    from: "attiquerehmansahito@gmail.com", // Ensure this email is verified in SendGrid
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
