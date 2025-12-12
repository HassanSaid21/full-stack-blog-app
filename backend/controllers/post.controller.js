import postModel from "../models/post.model.js";

import userModel from "../models/user.model.js";

import ImageKit from "imagekit";

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export async function getPosts(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const query = {};
    const cat = req.query.cat;
    const author = req.query.author;
    const searchQuery = req.query.search;
    const sortQuery = req.query.sort;
    const featured = req.query.featured;

    if (cat) {
      query.category = cat;
    }

    if (searchQuery) {
      query.title = { $regex: searchQuery, $options: "i" };
    }

    if (author) {
      const user = await userModel.findOne({ username: author }).select("_id");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      query.user = user._id;
    }

    if (featured) {
      query.isFeatured = true;
    }

    let sortObj = { createdAt: -1 };
    if (sortQuery) {
      switch (sortQuery) {
        case "newest":
          sortObj = { createdAt: -1 };
          break;
        case "popular":
          sortObj = { visit: -1 };
          break;
        case "trending":
          sortObj = { visit: -1 };
          query.createdAt = {
            $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          };
          break;
        case "oldest":
          sortObj = { createdAt: 1 };
          break;
        default:
          break;
      }
    }

    const posts = await postModel
      .find(query)
      .populate("user", "username")
      .sort(sortObj)
      .limit(limit)
      .skip((page - 1) * limit);

    const totalPosts = await postModel.countDocuments(query);
    const hasMore = page * limit < totalPosts;

    res.status(200).json({ posts, hasMore });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error: error.message });
  }
}




export async function getPost(req, res) {
  try {
    const post = await postModel
      .findOneAndUpdate(
        { slug: req.params.slug },
        { $inc: { visit: 1 } },
        { new: true }
      )
      .populate("user", "username img");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error: error.message });
  }
}


export async function uploadAuth(req, res) {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
}
export async function createPost(req, res) {
  try {
    const clerkUserId = req.auth.userId;
    if (!clerkUserId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await userModel.findOne({ clerkUserId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let slug = req.body.title.replace(/ /g, "-").toLowerCase().trim();
    let existingPost = await postModel.findOne({ slug });
    let counter = 2;

    while (existingPost) {
      slug = `${req.body.title.replace(/ /g, "-").toLowerCase().trim()}-${counter}`;
      existingPost = await postModel.findOne({ slug });
      counter++;
    }

    const newPost = new postModel({ ...req.body, user: user._id, slug });
    const post = await newPost.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error: error.message });
  }
}

export async function deletePost(req, res) {
  try {
    const clerkUserId = req.auth.userId;
    if (!clerkUserId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const role = req.auth.sessionClaims?.metadata?.role || "user";

    if (role === "admin") {
      await postModel.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "Post deleted successfully" });
    }

    const user = await userModel.findOne({ clerkUserId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const deletedPost = await postModel.findOneAndDelete({
      _id: req.params.id,
      user: user._id,
    });

    if (!deletedPost) {
      return res.status(403).json({ message: "You can only delete your own posts" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error: error.message });
  }
}

export async function featurePost(req, res) {
  const clerkUserId = req.auth.userId;
  const id = req.body.id;

  if (!clerkUserId) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const role = req.auth.sessionClaims?.metadata?.role || "user";

  if (role !== "admin") {
    return res.status(403).json({ message: "Not authorized" });
  }

  const post = await postModel.findById(id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const updatedPost = await postModel.findByIdAndUpdate(
    id,
    { isFeatured: !post.isFeatured },
    { new: true }
  );

  return res.status(200).json(updatedPost);
}
