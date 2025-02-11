const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const postModel = require("./models/Post");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017/blog", { useNewUrlParser: true, useUnifiedTopology: true });

const salt = bcrypt.genSaltSync(10);

app.get("/", async (req, res) => {
	try {
		const posts = await postModel.find();
		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json({ message: "Error fetching posts", error });
	}
});

app.post("/create", async (req, res) => {
	try {
		const { url, title, content, user } = req.body;
		if (!url || !title || !content || !user) {
			return res.status(400).json({ message: "All fields are required" });
		}
		const post = await postModel.create({ url, title, content, user });
		res.status(201).json({ message: "Post created successfully", post });
	} catch (error) {
		res.status(500).json({ message: "Error creating post", error });
	}
});

app.post("/delete", async (req, res) => {
	try {
		const { url } = req.body;
		if (!url) {
			return res.status(400).json({ message: "URL is required" });
		}
		const deletedPost = await postModel.findOneAndDelete({ url });
		if (!deletedPost) {
			return res.status(404).json({ message: "Post not found" });
		}
		res.status(200).json({ message: "Post deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Error deleting post", error });
	}
});

export default { getPost, createPost, deletePost };
