import postModel from "../models/post.model.js";

import userModel from "../models/user.model.js";

import ImageKit from "imagekit";

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export async function getPosts(req, res) {
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
    if (!user) return res.status(404).json("user not found");
    query.user = user._id;
  }
  if (featured ) {
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
          $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
        };
        break;
      case "oldest":
        sortObj = {  createdAt: 1  }

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
      .skip((page - 1) * limit); // if the limit was 4 and skip is 2 skip will skip the first 2 items and return the rest
    const totalPosts = await postModel.countDocuments();
    const hasMore = page * limit < totalPosts;
    res.status(200).json({ posts, hasMore });
    
  
}




export async function getPost(req, res) {
  try {
    // Using $inc to safely increment the visit count by 1
    const post = await postModel
      .findOneAndUpdate(
        { slug: req.params.slug },
        { $inc: { visit: 1 } }, // Increment 'visit' by 1 atomically
        { new: true }
      )
      .populate("user", "username img");

    // Check if post is found
    if (post) {
      return res.status(200).json(post);
    }
    
    // Return a 404 error if no post is found
    res.status(404).json("Post not found!");
  } catch (error) {
    // Handle any errors that might occur
    res.status(500).json({ error: "An error occurred while fetching the post." });
  }
}


export async function uploadAuth(req, res) {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
}
export async function createPost(req, res) {
  const clerkUserId = req.auth.userId;
  if (!clerkUserId)
    return res.status(401).json({ message: "not authenticated" });

  const user = await userModel.findOne({ clerkUserId });

  let slug = req.body.title.replace(/ /g, "-").toLowerCase().trimEnd();
  let existingPost = await postModel.findOne({ slug });
  let counter = 2;

  while (existingPost) {
    slug = `${slug}-${counter}`;
    existingPost = await postModel.findOne({ slug });
    counter++;
  }

  const newPost = new postModel({ ...req.body, user: user._id, slug });
  const post = await newPost.save();
  res.status(200).json(post); // this includes the slug
}

export async function deletePost(req, res) {
  const clerkUserId = req.auth.userId;
  const role = req.auth.sessionClaims?.metadata?.role || "user";
  if (role === "admin") {
    await postModel.findByIdAndDelete(req.params.id);
    return res.status(200).json("post has been deleted successfully");
  }
  const user = await userModel.findOne({ clerkUserId });

  const deletedPost = await postModel.findOneAndDelete({
    _id: req.params.id,
    user: user._id,
  });
  if (!deletedPost)
    return res.status(403).json("you can delete only your posts");

  res.status(200).json(" post deleted successfully");
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
