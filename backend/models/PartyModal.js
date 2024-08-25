const mongoose = require("mongoose");

const partySchema = new mongoose.Schema({
  partyId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  imgUrl: { type: String, required: true },
});

const Party = mongoose.model("Party", partySchema);

module.exports = Party;
