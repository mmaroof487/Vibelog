const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
	url: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	user: {
		type: String,
		required: true,
	},
	time: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("post", postSchema);
