import express from "express";
import userRouter from "./routes/user.route.js";
import commentRouter from "./routes/comment.route.js";
import postRouter from "./routes/post.route.js";
import WebhookRouter from "./routes/webHook.route.js";
import connectDB from "./lib/connectDB.js";
import cors from 'cors'
import { clerkMiddleware } from "@clerk/express";
const app = express();
app.use(cors(process.env.CLIENT_URL))
app.use(clerkMiddleware());
app.use("/webhooks", WebhookRouter);

// Parse JSON payloads
app.use(express.json());


// Routes
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong",
    status: err.status,
    stack: err.stack,
  });
});

// Start Server
app.listen(3000, async () => {
  try {
    await connectDB();
    console.log("✅ Server is running & DB connected!");
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err.message);
    process.exit(1); // Stop server if DB fails
  }
});
