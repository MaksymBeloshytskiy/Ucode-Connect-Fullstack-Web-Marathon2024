const express = require('express');
const bodyParser = require('body-parser');
const Note = require('./Note');
const NotePad = require('./NotePad');

const app = express();
const notePad = new NotePad();

app.use(bodyParser.json());
app.use(express.static('./'));

// Get all notes
app.get('/notes', (req, res) => {
    res.json(notePad.getNotes());
});

// Create a new note
app.post('/notes', (req, res) => {
    const { name, importance, content } = req.body;
    const note = new Note(name, importance, content);
    notePad.addNote(note);
    res.status(201).json(note);
});

// Get a note by date
app.get('/notes/:date', (req, res) => {
    const { date } = req.params;
    const note = notePad.getNoteByDate(date);
    if (!note) {
        res.status(404).json({ error: 'Note not found' });
    } else {
        res.json(note);
    }
});

// Delete a note by date
app.delete('/notes/:date', (req, res) => {
    const { date } = req.params;
    notePad.deleteNoteByDate(date);
    res.status(204).end();
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
