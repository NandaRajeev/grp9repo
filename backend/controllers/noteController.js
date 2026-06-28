const Note = require("../models/Note");

// Create a new note
const createNote = async (req, res) => {
    try {

        const { title, description, status } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required"
            });
        }

        const note = await Note.create({
            title,
            description,
            status
        });

        res.status(201).json(note);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// Get all notes
const getAllNotes = async (req, res) => {
  try {
    const { status, search } = req.query;

    let filter = {};

    // Filter by status
    if (status) {
      filter.status = status;
    }

    // Search by title or description
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const notes = await Note.find(filter).sort({ createdAt: -1 });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getStats = async (req, res) => {
  try {
    const total = await Note.countDocuments();

    const pending = await Note.countDocuments({
      status: "Pending",
    });

    const inProgress = await Note.countDocuments({
      status: "In Progress",
    });

    const completed = await Note.countDocuments({
      status: "Completed",
    });

    res.status(200).json({
      total,
      pending,
      inProgress,
      completed,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get a single note
const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a note
const updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNote,
  getAllNotes,
  getStats,
  getNoteById,
  updateNote,
  deleteNote,
};