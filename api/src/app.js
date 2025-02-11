import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/v1/auth", authRoutes);

app.listen(3000, () => {
	console.log("Server running on port 3000");
});

export default app;
