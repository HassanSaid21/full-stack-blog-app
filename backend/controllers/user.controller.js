import userModel from "../models/user.model.js";

export async function getUsers(req, res) {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
}

export async function getUserSavedPosts(req, res) {
  try {
    const clerkUserId = req.auth.userId;
    if (!clerkUserId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await userModel.findOne({ clerkUserId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.savedPosts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching saved posts", error: error.message });
  }
}

export async function savePost(req, res) {
  try {
    const postId = req.body.postId;
    const clerkUserId = req.auth.userId;

    if (!clerkUserId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await userModel.findOne({ clerkUserId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isSaved = user.savedPosts.some((p) => p === postId);

    if (!isSaved) {
      await userModel.findByIdAndUpdate(user._id, {
        $push: { savedPosts: postId },
      });
      return res.status(200).json({ message: "Post saved" });
    } else {
      await userModel.findByIdAndUpdate(user._id, {
        $pull: { savedPosts: postId },
      });
      return res.status(200).json({ message: "Post unsaved" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error saving post", error: error.message });
  }
}
