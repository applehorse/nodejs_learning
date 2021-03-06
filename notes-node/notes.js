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
    var notes = fetchNotes();
    return notes;
};

var getNote = (title) => {
    var notes = fetchNotes();
    var readNote = notes.filter((note) => note.title === title);
    return readNote[0];
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

var lognote = (note) => {
    // Break on this line and use repl to output note
    // User read command with --title secret6
    //debugger;
    console.log('----');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    lognote
};