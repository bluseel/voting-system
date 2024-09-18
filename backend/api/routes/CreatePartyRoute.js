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
const path = require("path");
const fs = require("fs");
const os = require("os");
const imgur = require("imgur");
const Party = require("../../models/PartyModal");
const packageJson = require("../../package.json");
const multer = require("multer");
const { promisify } = require("util");
const schedule = require("node-schedule");

// Configure multer for file uploads
const upload = multer({
  dest: path.join(__dirname, "..", "uploads"), // Destination folder for uploaded files
});

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
const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  const file = req.file;
  const uploadPath = path.join(__dirname, "..", "uploads", file.filename);
  const newFileName = Date.now() + "_" + file.originalname;
  const newFilePath = path.join(__dirname, "..", "uploads", newFileName);

  fs.renameSync(uploadPath, newFilePath); // Rename the file to include a timestamp

  try {
    const result = await imgur.uploadFile(newFilePath);
    fs.unlinkSync(newFilePath); // Remove file from server after uploading
    res.send(result);
  } catch (err) {
    fs.unlinkSync(newFilePath);
    res
      .status(500)
      .json({ error: "Error uploading to Imgur", details: err.message });
  }
};

// Route to handle file upload
router.post("/upload-logo", upload.single("sampleFile"), uploadImage);

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

// Route to get version info
router.get("/version-info", (req, res) => {
  res.json({
    imgurVersion: packageJson.dependencies.imgur,
    // Add other package versions as needed
  });
});

// Schedule a job to delete files older than 24 hours
const deleteOldUploads = async () => {
  const uploadDir = path.join(__dirname, "..", "uploads");
  fs.readdir(uploadDir, (err, files) => {
    if (err) throw err;

    const now = Date.now();
    files.forEach((file) => {
      const filePath = path.join(uploadDir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) throw err;

        if (now - stats.mtimeMs > 24 * 60 * 60 * 1000) {
          // 24 hours
          fs.unlink(filePath, (err) => {
            if (err) throw err;
            console.log(`Deleted old file: ${filePath}`);
          });
        }
      });
    });
  });
};

// Run the cleanup job every 24 hours
schedule.scheduleJob("0 0 * * *", deleteOldUploads);

module.exports = router;
