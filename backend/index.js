require("dotenv").config(); // Ensure dotenv is required before accessing process.env
const express = require("express");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log("SendGrid API Key:", process.env.SENDGRID_API_KEY);

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
      console.error("Error sending email:", error.response.body);
      res.status(500).send("Error sending email");
    });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
