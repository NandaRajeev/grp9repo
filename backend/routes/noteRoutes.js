const express = require("express");
const {
  createNote,
  getAllNotes,
  getStats,
  getNoteById,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// All note routes are protected
router.use(protect);

router.route("/").get(getAllNotes).post(createNote);
router.get("/stats", getStats);
router.route("/:id").get(getNoteById).put(updateNote).delete(deleteNote);

module.exports = router;