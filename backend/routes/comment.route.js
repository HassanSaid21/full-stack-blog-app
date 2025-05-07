import express from "express";
import { addComment, deleteComment, getComments } from "../controllers/comment.controller.js";

const router = express.Router();

router.get('/:postId' , getComments)
router.post('/:postId' , addComment)
router.delete('/:id' , deleteComment)
export default router;
