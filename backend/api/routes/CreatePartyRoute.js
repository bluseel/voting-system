// // create party

// const express = require("express");
// const router = express.Router();
// const path = require("path");
// const fs = require("fs");
// const imgur = require("imgur");
// const Party = require("../../models/PartyModal");
// const packageJson = require("../../package.json");

// // Function to generate a unique 5-digit code
// const generateUniqueCode = async () => {
//   let code;
//   let isUnique = false;

//   while (!isUnique) {
//     code = Math.floor(10000 + Math.random() * 90000).toString(); // Generate a 5-digit code

//     // Check if the code already exists in the database
//     const existingParty = await Party.findOne({ partyId: code });
//     if (!existingParty) {
//       isUnique = true;
//     }
//   }

//   return code;
// };

// // Function to handle image upload
// const uploadImage = (req, res) => {
//   if (!req.files || !req.files.sampleFile) {
//     return res.status(400).json({ error: "No files uploaded" });
//   }

//   const sampleFile = req.files.sampleFile;
//   const newFileName = Date.now() + "_" + sampleFile.name;
//   const uploadPath = path.join(__dirname, "..", "uploads", newFileName);

//   sampleFile.mv(uploadPath, function (err) {
//     if (err) {
//       return res
//         .status(500)
//         .json({ error: "Error uploading file", details: err.message });
//     }

//     imgur
//       .uploadFile(uploadPath)
//       .then((urlObject) => {
//         fs.unlinkSync(uploadPath);
//         console.log(urlObject);
//         res.send(urlObject);
//       })
//       .catch((err) => {
//         fs.unlinkSync(uploadPath);
//         res
//           .status(500)
//           .json({ error: "Error uploading to Imgur", details: err.message });
//       });
//   });
// };

// // Route to handle file upload
// router.post("/upload-logo", uploadImage);

// // Route to handle creating a party
// router.post("/create-party", async (req, res) => {
//   const { partyName, logoUrl } = req.body;
//   console.log("pp:", partyName);
//   console.log("ll:", logoUrl);

//   if (!partyName || !logoUrl) {
//     return res
//       .status(400)
//       .json({ error: "Party name and logo URL are required" });
//   }

//   try {
//     const partyId = await generateUniqueCode(); // Generate a unique 5-digit code

//     const newParty = new Party({
//       partyId,
//       name: partyName,
//       imgUrl: logoUrl,
//     });

//     await newParty.save();
//     res.status(201).json({ message: "Party created successfully", partyId });
//   } catch (error) {
//     res.status(500).json({ error: "Error creating party" });
//   }
// });

// router.get("/version-info", (req, res) => {
//   res.json({
//     imgurVersion: packageJson.dependencies.imgur,
//     // Add other package versions as needed
//   });
// });

// module.exports = router;

//  ---------------------------------------------------------------------------------------------
const express = require("express");
const router = express.Router();
const imgur = require("imgur");
const Party = require("../../models/PartyModal");
const packageJson = require("../../package.json");

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
// Function to handle image upload to Imgur with your Client-ID
const uploadImage = (req, res) => {
  // Check if file is uploaded
  if (!req.files || !req.files.sampleFile) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  const sampleFile = req.files.sampleFile;

  // Prepare FormData to send to Imgur
  const formData = new FormData();
  formData.append("image", sampleFile.data);

  // Upload image using your Client-ID
  imgur.setClientId("546c25a59c58ad7"); // Replace with your actual Client-ID

  imgur
    .uploadBase64(sampleFile.data.toString("base64"))
    .then((result) => {
      const photo = result.link;
      const photo_hash = result.deletehash;

      console.log(result);
      res.json({
        imageUrl: photo,
        deleteHash: photo_hash,
      });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "Error uploading to Imgur", details: err.message });
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

router.get("/version-info", (req, res) => {
  res.json({
    imgurVersion: packageJson.dependencies.imgur,
    // Add other package versions as needed
  });
});

module.exports = router;
