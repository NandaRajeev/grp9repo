const Note = require("../models/Note");

// Create a note
const createNote = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    const note = await Note.create({
      clerkUserId: req.user.clerkUserId,
      title,
      description,
      status,
    });

    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all notes
const getAllNotes = async (req, res) => {
  try {
    const { status, search } = req.query;

    const filter = {
      clerkUserId: req.user.clerkUserId,
    };

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const notes = await Note.find(filter).sort({
      createdAt: -1,
    });

    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// Dashboard stats
const getStats = async (req, res) => {
  try {
    const clerkUserId = req.user.clerkUserId;

    const total = await Note.countDocuments({
      clerkUserId,
    });

    const pending = await Note.countDocuments({
      clerkUserId,
      status: "Pending",
    });

    const inProgress = await Note.countDocuments({
      clerkUserId,
      status: "In Progress",
    });

    const completed = await Note.countDocuments({
      clerkUserId,
      status: "Completed",
    });

    res.json({
      total,
      pending,
      inProgress,
      completed,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get one note
const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      clerkUserId: req.user.clerkUserId,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update note
const updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        clerkUserId: req.user.clerkUserId,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete note
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      clerkUserId: req.user.clerkUserId,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
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