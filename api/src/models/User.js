const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, min: true, unique: true },
	password: { type: String, required: true },
});
module.exports = mongoose.model("user", userSchema);
