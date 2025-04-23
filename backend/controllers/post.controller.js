import postModel from "../models/post.model.js";

import userModel from "../models/user.model.js";

import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

export async function getPosts(req, res) {
  const posts = await postModel.find();
  res.status(200).send(posts);
  // res.status(200).send('hello postman')
}

export async function getPost(req, res) {
  const post = await postModel.findOne({ slug: req.params.slug });
  res.status(200).json(post);
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
    slug = `${slug}-${counter}` ;
    existingPost =await postModel.findOne({ slug });
   counter++;
  }

  const newPost = new postModel({ ...req.body, user: user._id, slug });
  const post = await newPost.save();
  res.status(200).json(post); // this includes the slug

}

export async function deletePost(req, res) {
  const clerkUserId = req.auth.userId;
  if (!clerkUserId)
    return res.status(401).json({ message: "Not authenticated" });
  const user = await userModel.findOne({ clerkUserId });

  const deletedPost = await postModel.findOneAndDelete({
    _id: req.params.id,
    user: user._id,
  });
  if (!deletedPost) return res.send(403).json("you can delete only your posts");

  res.status(200).json("this post has been deleted");
}
