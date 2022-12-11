import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*
* READ - grabs user feed from homepage, gives every user social post
* then get the post of the specific user only
*/
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);


/* 
* UPDATE 
*/
router.patch("/:id/like", verifyToken, likePost);

export default router;
