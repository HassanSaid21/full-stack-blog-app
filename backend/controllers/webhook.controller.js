import userModel from "../models/user.model.js";
import { Webhook } from "svix";

export async function clerkWebHook(req, res) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) throw new Error("webhook secret needed");

  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;

  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    console.error("❌ Webhook verification failed:", err.message);
    return res.status(400).json({ message: "Webhook verification failed" });
  }

  if (evt.type === "user.created") {
    try {
      const newUser = new userModel({
        username:
          evt.data.username || evt.data.email_addresses?.[0]?.email_address,
        clerkUserId: evt.data.id,
        email: evt.data.email_addresses?.[0]?.email_address,
        img: evt.data.profile_img_url,
      });
      await newUser.save();
      console.log("✅ User created");
    } catch (error) {
      console.error("❌ Error saving user:", error.message);
      return res.status(500).json({ message: "DB save failed" });
    }
  }

  if (evt.type === "user.deleted") {
    try {
      const deletedUser = await userModel.findOneAndDelete({
        clerkUserId: evt.data.id,
      });
      console.log("🗑️ User deleted");
    } catch (error) {
      console.error("❌ Error deleting user:", error.message);
      return res.status(500).json({ message: "DB delete failed" });
    }
  }

  return res.status(200).json({ message: "Webhook received" });
}
