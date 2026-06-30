require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { clerkMiddleware } = require("@clerk/express");

const connectDB = require("./config/db");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

connectDB();

app.use(cors());
// app.options("*", cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/notes", noteRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});