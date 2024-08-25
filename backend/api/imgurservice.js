const imgur = require("imgur");
const fs = require("fs");
const path = require("path");

// Function to upload file to Imgur
const uploadToImgur = (filePath) => {
  return imgur
    .uploadFile(filePath)
    .then((urlObject) => {
      // Remove file from local storage after upload
      fs.unlinkSync(filePath);
      return urlObject;
    })
    .catch((err) => {
      throw new Error(`Imgur upload failed: ${err.message}`);
    });
};

module.exports = { uploadToImgur };
