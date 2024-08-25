// create party

const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const imgur = require("imgur");
const Party = require("../../models/PartyModal");

// Function to generate a unique 5-digit code
const generateUniqueCode = async () => {
  let code;
  let isUnique = false;

  while (!isUnique) {
    code = Math.floor(10000 + Math.random() * 90000).toString(); // Generate a 5-digit code

    // Check if the code already exists in the database
    const existingParty = await Party.findOne({ partyId: code });
    if (!existingParty) {
      isUnique = true;
    }
  }

  return code;
};

// Function to handle image upload
const uploadImage = (req, res) => {
  if (!req.files || !req.files.sampleFile) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  const sampleFile = req.files.sampleFile;
  const newFileName = Date.now() + "_" + sampleFile.name;
  const uploadPath = path.join(__dirname, "..", "uploads", newFileName);

  sampleFile.mv(uploadPath, function (err) {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error uploading file", details: err.message });
    }

    imgur
      .uploadFile(uploadPath)
      .then((urlObject) => {
        fs.unlinkSync(uploadPath);
        console.log(urlObject);
        res.send(urlObject);
      })
      .catch((err) => {
        fs.unlinkSync(uploadPath);
        res
          .status(500)
          .json({ error: "Error uploading to Imgur", details: err.message });
      });
  });
};

// Route to handle file upload
router.post("/upload-logo", uploadImage);

// Route to handle creating a party
router.post("/create-party", async (req, res) => {
  const { partyName, logoUrl } = req.body;
  console.log("pp:", partyName);
  console.log("ll:", logoUrl);

  if (!partyName || !logoUrl) {
    return res
      .status(400)
      .json({ error: "Party name and logo URL are required" });
  }

  try {
    const partyId = await generateUniqueCode(); // Generate a unique 5-digit code

    const newParty = new Party({
      partyId,
      name: partyName,
      imgUrl: logoUrl,
    });

    await newParty.save();
    res.status(201).json({ message: "Party created successfully", partyId });
  } catch (error) {
    res.status(500).json({ error: "Error creating party" });
  }
});

module.exports = router;
