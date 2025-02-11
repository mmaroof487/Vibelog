const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const userModel = require("./models/User");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017/blog", { useNewUrlParser: true, useUnifiedTopology: true });

const salt = bcrypt.genSaltSync(10);
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

export default { registerUser, loginUser };
