// Function to add a new note
function addNote() {
    // Get the note content, color, and current timestamp
    const noteContent = document.getElementById('noteContent').value;
    const noteColor = document.getElementById('noteColor').value;
    const currentDate = new Date().getTime();

    // Create a new note object
    const note = {
        content: noteContent,
        color: noteColor,
        createdAt: currentDate
    };

    // Log the new note being added to the console
    console.log('Adding new note:', note);

    // Retrieve existing notes or initialize an empty array
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note); // Add the new note to the array
    localStorage.setItem('notes', JSON.stringify(notes)); // Save notes to localStorage
    displayNotes(); // Display updated notes
}

// Function to display all notes
function displayNotes() {
    const notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = ''; // Clear existing notes

    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    console.log('Current notes:', notes); // Log current notes to console

    // Iterate through notes and display each one
    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        // Create HTML elements for each note with content, color, and buttons for edit/delete
        noteElement.innerHTML = `
            <div class="color-box" style="background-color: ${note.color};"></div>
            <div class="content">${note.content}</div>
            <div class="button-container">
                <button class="edit-button" onclick="editNote(${index})">Edit</button>
                <button class="delete-button" onclick="deleteNote(${index})">Delete</button>
            </div>
        `;
        notesContainer.appendChild(noteElement); // Append note to the container
    });
}

// Function to edit a specific note
function editNote(index) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    // Prompt to edit note content and update if changed
    const newContent = prompt('Edit the content of the note:', notes[index].content);
    if (newContent !== null) {
        notes[index].content = newContent; // Update note content
        localStorage.setItem('notes', JSON.stringify(notes)); // Update notes in localStorage
        displayNotes(); // Display updated notes
    }
}

// Function to delete a specific note
function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1); // Remove the note at the specified index
    localStorage.setItem('notes', JSON.stringify(notes)); // Update notes in localStorage
    displayNotes(); // Display updated notes
}

// Function to erase the content input of the note
function eraseContent() {
    document.getElementById('noteContent').value = ''; // Clear note content input
}

// Load existing notes and add event listeners after DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
    displayNotes(); // Display existing notes
    document.querySelector('.save-button').addEventListener('click', addNote); // Add note event
    document.querySelector('.erase-button').addEventListener('click', eraseContent); // Erase content event
});
