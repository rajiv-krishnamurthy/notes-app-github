const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const dbPath = path.join(__dirname, '../../db/notes.json');

// Helper to read/write file
const readNotes = () => JSON.parse(fs.readFileSync(dbPath));
const writeNotes = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// GET all notes
router.get('/', (req, res) => {
  res.json(readNotes());
});

// POST a new note
router.post('/', (req, res) => {
  const notes = readNotes();
  const newNote = { id: Date.now(), ...req.body };
  notes.push(newNote);
  writeNotes(notes);
  res.status(201).json(newNote);
});

// DELETE a note by ID
router.delete('/:id', (req, res) => {
  const notes = readNotes();
  const updated = notes.filter(note => note.id != req.params.id);
  writeNotes(updated);
  res.status(204).send();
});

module.exports = router;