const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const userModel = require("./models/User");
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

app.post("/register", async (req, res) => {
	try {
		const { username, password } = req.body;
		if (!username || !password) {
			return res.status(400).json({ message: "Username and password are required" });
		}
		const hashedPassword = bcrypt.hashSync(password, salt);
		const createdUser = await userModel.create({ username, password: hashedPassword });
		res.status(201).json({ message: "User registered successfully", user: createdUser });
	} catch (error) {
		res.status(500).json({ message: "Error registering user", error });
	}
});

app.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;
		if (!username || !password) {
			return res.status(400).json({ message: "Username and password are required" });
		}
		const found = await userModel.findOne({ username });
		if (!found) {
			return res.status(401).json({ message: "Invalid credentials" });
		}
		const result = bcrypt.compareSync(password, found.password);
		if (result) {
			res.status(200).json({ message: "Login successful", user: found });
		} else {
			res.status(401).json({ message: "Invalid credentials" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error logging in", error });
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

app.listen(3000, () => {
	console.log("Server running on port 3000");
});
