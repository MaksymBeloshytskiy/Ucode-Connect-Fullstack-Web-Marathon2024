async function fetchNotes() {
    const response = await fetch('/notes');
    const notes = await response.json();
    displayNotes(notes);
}

async function addNote() {
    const name = document.getElementById('name').value;
    const importance = document.getElementById('importance').value;
    const content = document.getElementById('content').value;

    const response = await fetch('/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, importance, content })
    });

    const note = await response.json();
    document.getElementById('noteForm').reset();
    fetchNotes();
}

async function deleteNote(date) {
    const encodedDate = encodeURIComponent(date); // Encode the date parameter
    await fetch(`/notes/${encodedDate}`, { // Use the encoded date in the URL
        method: 'DELETE'
    });
    fetchNotes(); // Fetch updated notes after deletion
}

function displayNotes(notes) {
    const noteList = document.getElementById('noteList');
    noteList.innerHTML = '';

    notes.forEach(note => {
        const noteItem = document.createElement('div');
        noteItem.className = 'note-item';
        noteItem.innerHTML = `
            <strong>${note.date} > ${note.name}</strong>
            <a href="#" onclick="viewNoteDetails('${encodeURIComponent(note.date)}')">View</a>
            <a href="#" onclick="deleteNote('${note.date}')">Delete</a>
        `;
        noteList.appendChild(noteItem);
    });
}

async function viewNoteDetails(date) {
    const response = await fetch(`/notes/${date}`);
    if (!response.ok) {
        console.error('Failed to fetch note details');
        return;
    }
    const note = await response.json();

    // Display note details in the Note Information section
    const noteInfoDiv = document.getElementById('noteInfo');
    noteInfoDiv.innerHTML = `
        <h2>Note Details</h2>
        <p><strong>Name:</strong> ${note.name}</p>
        <p><strong>Importance:</strong> ${note.importance}</p>
        <p><strong>Content:</strong> ${note.content}</p>
        <p><strong>Date:</strong> ${note.date}</p>
    `;
}


document.addEventListener('DOMContentLoaded', fetchNotes); // Fetch notes when the DOM is loaded
