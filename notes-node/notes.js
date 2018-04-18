console.log('Starting notes.js.');

const fs = require('fs');

var fetchNotes = () => {
    try{
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };

    var duplicateNotes = notes.filter((note) => note.title === title);

    //console.log('duplicateNotes: ' + JSON.stringify(duplicateNotes));

    if (duplicateNotes.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    }
    
};

var getAll = () => {
    console.log('Getting all notes');
};

var getNote = (title, body) => {
    console.log('Reading note', title, body);
};

var removeNote = (title) => {
    //fetch notes
    var notes = fetchNotes();
    //filter notes, removing the one with title of argument
    var newNotes = notes.filter((note) => note.title !== title);
    //save new notes array
    saveNotes(newNotes);

    return notes.length !== newNotes.length;
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
};