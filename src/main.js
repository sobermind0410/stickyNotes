const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");


// get localSorage objects before button
getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNotes);

// // func to get localsorage objects
function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

// // func to store object in localStorage
function saveNotes(notes) {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

// //  func to create element
function createNoteElement(id, content) {
  const element = document.createElement("textarea");

  element.classList.add("note");
  element.value = content;
  element.placeholder = "Empty Sticky Note";

  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });

  element.addEventListener("dblclick", () => {
    const doDelete = confirm(
      "Are you sure you wish to delete this sticky note?"
    );

    if (doDelete) {
      deleteNote(id, element);
    };
  });

  return element;
}


function addNotes() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 10000),
    content: ""
  };


  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButton);

  existingNotes.push(noteObject);
  saveNotes(notes);
}

function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter(note => note.id == id)[0];

  targetNote.content = newContent;
  saveNotes();
}

function deleteNote(id, element) {
  const notes = getNotes().filter(note => note.id != id);

  saveNotes(notes);
  notesContainer.removeChild(element);
}


