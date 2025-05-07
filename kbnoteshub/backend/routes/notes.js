import express from 'express';
import Note from '../models/Note.js';

const router = express.Router();

// Create a new note
router.post('/', async (req, res) => {
  try {
    const { title, content, isPublic, author, coverImage } = req.body;
    const newNote = new Note({ title, content, isPublic, author, coverImage });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all public notes
router.get('/public', async (req, res) => {
  try {
    const publicNotes = await Note.find({ isPublic: true })
      .sort({ createdAt: -1 });
    res.json(publicNotes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single note by ID
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;