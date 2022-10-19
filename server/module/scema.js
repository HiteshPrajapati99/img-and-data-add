const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  password: { type: String },
  profile_file: { type: String },
  profile_path: { type: String },
});

module.exports = mongoose.model("user", UserSchema);
