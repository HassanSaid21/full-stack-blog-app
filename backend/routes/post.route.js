import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  uploadAuth
} from "../controllers/post.controller.js";

const router = express.Router();

// Static or specific routes first
router.get('/upload-auth', uploadAuth);
router.get('/', getPosts);
router.post('/', createPost);

// Dynamic routes after static ones
router.get('/:slug', getPost);
router.delete('/:id', deletePost);

export default router

