// var obj = {
//   name: "Guillaume"
// };
//
// var stringObj = JSON.stringify(obj);
//
// console.log('Type :', typeof stringObj);
// console.log('Value :',stringObj);


const fs = require('fs');

var originalNote = {
  title:'some title',
  body:'some body'
};

var originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync('notes.json',originalNoteString);

var noteString = fs.readFileSync('notes.json');

// // NOTE:
var note = JSON.parse(originalNoteString);
console.log(typeof note);
console.log(note.title);
