const express = require("express");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

require("dotenv").config(); // Ensure dotenv is required before accessing process.env
const app = express();
app.use(express.json());
//for vercel online
// app.use(
//   cors({
//     // "taskstracker.netlify.app" for netlfiy npm run build
//     // original : https://mern-frontend-lake.vercel.app
//     origin: [
//       "https://voting-frontend-delta.vercel.app",
//       "http://localhost:5000",
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     credentials: true,
//   })
// );

forlocal;
app.use(cors());
const port = 5000;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
