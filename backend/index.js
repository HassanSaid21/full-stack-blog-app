import express from "express";
import userRouter from "./routes/user.route.js";
import commentRouter from "./routes/comment.route.js";
import postRouter from "./routes/post.route.js";
import WebhookRouter from "./routes/webhook.route.js";
import connectDB from "./lib/connectDB.js";
import cors from 'cors'
import { clerkMiddleware } from "@clerk/express";
const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  credentials: true
}));

// Parse JSON payloads (must be before routes)
app.use(express.json());

// Clerk middleware and webhook route (webhooks before clerkMiddleware)
app.use("/webhooks", WebhookRouter);
app.use(clerkMiddleware());


// Routes
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message || "Something went wrong",
    status: statusCode,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
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


