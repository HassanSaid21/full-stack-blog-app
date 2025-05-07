import commentModel from "../models/comment.model.js";
import userModel from "../models/user.model.js";


export async function getComments(req, res) {
  const comments = await commentModel
    .find({ post: req.params.postId })
    .populate("user", " username img")
    .sort({ createdAt: -1 });
  res.json(comments);
}

export async function addComment(req, res) {
  const clerkUserId = req.auth.userId;
  const postId = req.params.postId;
  if (!clerkUserId) return res.status(401).json("not Authenticated!");

  const user = await userModel.findOne({ clerkUserId });
  const newComment = new commentModel({
    ...req.body,
    user: user._id,
    post: postId,
  });
  const savedComment = await newComment.save();

  setTimeout(() => {
    return res.status(201).json(savedComment);
  }, 3000);
}

export async function deleteComment(req, res) {
  const clerkUserId = req.auth.userId;
  const id = req.params.id;

  if (!clerkUserId) return res.status(401).json("Not authenticated!");

  const role = req.auth.sessionClaims?.metadata?.role || "user"; // ✅ corrected 'metadata'

  if (role === "admin") {
    await commentModel.findByIdAndDelete(id);
    return res.status(200).json("Comment has been deleted successfully"); // ✅ improved message
  }

  const user = await userModel.findOne({ clerkUserId });

  const deletedComment = await commentModel.findOneAndDelete({
    user: user._id, // ✅ careful: it's user._id (lowercase i)
    _id: id,
  });

  if (!deletedComment)
    return res.status(403).json("You can only delete your own comments"); // ✅ fixed message

  return res.status(200).json("Comment deleted successfully"); // ✅ cleaner message
}
