const fs = require('fs');
const notes = require('./notes.js')

const _ = require('lodash');
const yargs = require('yargs')

const titleOptions = {
  describe:'Title of note',
  demand: true,
  alias: 't'
};
const bodyOptions = {
  describe:'Body of the note',
  demand: true,
  alias: 'b'
};

var argv = yargs
.command('add','add a new note',{
  title:titleOptions,
  body:bodyOptions
})
.command('list','List all notes')
.command('read', 'Read a note',{
  title:titleOptions
})
.command('remove', 'Remove a note', {
  title:titleOptions
})
.help()
.argv;
var command = argv._[0]

if (command == 'add') {
  var note = notes.addNote(argv.title,argv.body);
  if (typeof note !== 'undefined' && note) {
    console.log('added new note');
    notes.logNote(note);
  } else {
    console.log('note title taken');
  }
} else if (command == 'list') {
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note) => {
    notes.logNote(note);
  });
} else if (command == 'read') {
  var note = notes.getNote(argv.title);
  if (typeof note !== 'undefined' && note) {
    console.log('read note');
    notes.logNote(note);
  } else {
    console.log('note not found');
  }
} else if (command == 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var message = (noteRemoved) ? 'Note was removed' : 'Note not found';
    console.log(message);
} else {
  console.log('Command not recognized');
}
