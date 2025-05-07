import express from "express";
import { getUsers, getUserSavedPosts, savePost } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/", getUsers);

router.get('/saved-posts', getUserSavedPosts )
router.patch('/save' , savePost)

// router.delete('/:postId' , deleteUserPost)

export default router
