const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  adminName: { type: String, required: true, unique: true },
  currentPhase: { type: String, required: true, unique: true },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
