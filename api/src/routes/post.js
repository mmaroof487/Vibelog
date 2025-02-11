import express from "express";
import postController from "../controllers/post/index.js";
const router = express.Router();

router.post("/", postController.getPost);
router.post("/create", postController.createPost);
router.post("/delete", postController.deletePost);

export default router;
