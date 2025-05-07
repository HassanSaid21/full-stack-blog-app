import userModel from "../models/user.model.js";

export async function getUsers(req, res) {
  const users = await userModel.find();
  res.status(200).json(users);
}

export async function getUserSavedPosts(req, res) {
  const clerkUserId = req.auth.userId;
  if (!clerkUserId) return res.status(401).json("not authenticated");
  const user = await userModel.findOne({ clerkUserId });
  return res.status(200).json(user.savedPosts);
}

export async function savePost(req, res) {
  const postId = req.body.postId;
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) return res.status(401).json("not authenticated");

  const user = await userModel.findOne({ clerkUserId });
  const isSaved = user.savedPosts.some((p) => p === postId);

  if (!isSaved) {
    await userModel.findByIdAndUpdate(user._id, {
      $push: { savedPosts: postId },
    });
    return res.status(200).json("post saved"); // ✅ respond here
  } else {
    await userModel.findByIdAndUpdate(user._id, {
      $pull: { savedPosts: postId },
    });
    return res.status(200).json("post unsaved"); // ✅ respond here
  }
}
