const express = require("express");

const {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

const router = express.Router();

// GET all notes & POST a new note
router.route("/")
  .get(getAllNotes)
  .post(createNote);

// GET, PUT & DELETE a note by ID
router.route("/:id")
  .get(getNoteById)
  .put(updateNote)
  .delete(deleteNote);

module.exports = router;