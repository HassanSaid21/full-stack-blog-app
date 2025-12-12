import commentModel from "../models/comment.model.js";
import userModel from "../models/user.model.js";


export async function getComments(req, res) {
  try {
    const comments = await commentModel
      .find({ post: req.params.postId })
      .populate("user", "username img")
      .sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error: error.message });
  }
}

export async function addComment(req, res) {
  try {
    const clerkUserId = req.auth.userId;
    const postId = req.params.postId;

    if (!clerkUserId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await userModel.findOne({ clerkUserId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newComment = new commentModel({
      ...req.body,
      user: user._id,
      post: postId,
    });
    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error: error.message });
  }
}

export async function deleteComment(req, res) {
  try {
    const clerkUserId = req.auth.userId;
    const id = req.params.id;

    if (!clerkUserId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const role = req.auth.sessionClaims?.metadata?.role || "user";

    if (role === "admin") {
      await commentModel.findByIdAndDelete(id);
      return res.status(200).json({ message: "Comment deleted successfully" });
    }

    const user = await userModel.findOne({ clerkUserId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const deletedComment = await commentModel.findOneAndDelete({
      user: user._id,
      _id: id,
    });

    if (!deletedComment) {
      return res.status(403).json({ message: "You can only delete your own comments" });
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error: error.message });
  }
}
