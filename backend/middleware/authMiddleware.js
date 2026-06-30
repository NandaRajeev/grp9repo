const { getAuth } = require("@clerk/express");

const protect = async (req, res, next) => {
  try {
    const auth = getAuth(req);

    if (!auth.userId) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    // Make the Clerk user ID available everywhere
    req.user = {
      clerkUserId: auth.userId,
    };

    next();
  } catch (err) {
    console.error(err);

    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = { protect };