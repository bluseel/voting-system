const express = require("express");
const app = express();
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

require("dotenv").config();
app.use(express.json());

app.use(cors());

const port = 5000;

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

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.port || port, () => {
  console.log(
    `Server is listening on http://localhost:${process.env.port || port}`
  );
});
