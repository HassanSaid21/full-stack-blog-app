import userModel from "../models/user.model.js";

export async function getUsers(req, res) {
  const users = await userModel.find();
  res.status(200).json(users);
}
