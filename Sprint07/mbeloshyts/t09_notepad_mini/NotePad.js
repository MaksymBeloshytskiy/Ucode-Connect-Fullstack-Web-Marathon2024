const fs = require('fs');
const path = require('path');
const Note = require('./Note');

class NotePad {
    constructor() {
        this.notesFile = path.join(__dirname, 'notes.json'); // File path for storing notes
        this.notes = this.loadNotes(); // Load notes from file
    }

    // Load notes from the JSON file
    loadNotes() {
        if (fs.existsSync(this.notesFile)) { // Check if the file exists
            const data = fs.readFileSync(this.notesFile); // Read file contents
            return JSON.parse(data); // Parse JSON data
        }
        return []; // Return an empty array if file doesn't exist
    }

    // Save notes to the JSON file
    saveNotes() {
        fs.writeFileSync(this.notesFile, JSON.stringify(this.notes, null, 2)); // Write notes to file
    }

    // Add a new note to the notes array
    addNote(note) {
        this.notes.push(note); // Push the new note to the array
        this.saveNotes(); // Save the updated notes back to the JSON file
    }

    // Delete a note by its date
    deleteNoteByDate(date) {
        this.notes = this.notes.filter(note => note.date !== date); // Filter out the note with the given date
        this.saveNotes(); // Save the updated notes back to the JSON file
    }

    // Get all notes
    getNotes() {
        return this.notes; // Return the notes array
    }

    // Get a note by its date
    getNoteByDate(date) {
        return this.notes.find(note => note.date === date); // Find the note with the given date
    }
}

module.exports = NotePad; // Export the NotePad class
