console.log('Starting app.');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const title_options = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};

const argv = yargs
    .command('add', 'Add a new note', {
        title: title_options,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: title_options
    })
    .command('remove', 'Remove a note', {
        title: title_options
    })
    .help()
    .argv;
var command = argv._[0];

if (command === 'add'){
    var note = notes.addNote(argv.title, argv.body);
    if (note){
        console.log('Note created.');
        notes.lognote(note);
    } else {
        console.log('Note title taken.');
    }
} else if(command === 'list'){
    var noteList = notes.getAll();
    debugger;
    if(noteList){
        noteList.forEach((note) => {
            notes.lognote(note);
        });
    } else {
        console.log('No notes at all.');
    }
} else if(command === 'read'){
    var note = notes.getNote(argv.title);
    if(note) {
        notes.lognote(note);
    } else {
        console.log('No note read');
    }
    
} else if(command === 'remove'){
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
} else {
    console.log('Commnad not recognized');
}
