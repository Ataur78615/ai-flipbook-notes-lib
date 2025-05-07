import Note from '../models/Note.js';


// Create a new note
export const createNote = async (req, res) => {
  try {
    const { title, content, isPublic, author, coverImage } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const newNote = new Note({ title, content, isPublic, author, coverImage });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ message: 'Server error while creating note' });
  }
};

// Get all public notes
export const getPublicNotes = async (req, res) => {
  try {
    const publicNotes = await Note.find({ isPublic: true }).sort({ createdAt: -1 });
    res.json(publicNotes);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching public notes' });
  }
};

// Get single note by ID
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching note' });
  }
};

// Search notes (optional feature)
export const searchNotes = async (req, res) => {
  try {
    const { query } = req.query;
    const results = await Note.find(
      { $text: { $search: query }, isPublic: true },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Server error while searching notes' });
  }
};
