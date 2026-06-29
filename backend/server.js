require("dotenv").config();

const express = require("express");
const cors    = require("cors");
const { clerkMiddleware } = require("@clerk/express");
const connectDB   = require("./config/db");
const noteRoutes  = require("./routes/noteRoutes");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Clerk session middleware — must come before any protected route
// It parses the Clerk session token from the Authorization header
app.use(clerkMiddleware());

// Routes
app.use("/api/notes", noteRoutes);
// /api/auth routes are no longer needed — Clerk handles auth entirely

// Health check
app.get("/", (req, res) => {
  res.send("Note Tracker API Running...");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});