const { getAuth } = require("@clerk/express");

// Clerk session verification middleware for protected routes
const protect = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ message: "Not authorized. Please sign in." });
    }

    // Attach Clerk user ID to request — used in all note controllers
    req.user = { _id: userId };
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401).json({ message: "Not authorized. Invalid session." });
  }
};

module.exports = { protect };
