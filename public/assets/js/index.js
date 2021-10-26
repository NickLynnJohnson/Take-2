// Call in variables
const $noteAside = $(".note-aside"); 
const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $saveNoteBtn = $(".save-note");
const $noteList = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

// All db functions

//// Get notes from the db
var getNotes = function() {
    return $.ajax({
        url: "/api/notes",
        method: "GET"
    });
};

//// Save a new note to the db
var saveNote = function(note) {
    return $.ajax({
      url: "/api/notes",
      data: note,
      method: "POST",
    });
};

//// Delete a note from the db
var deleteNote = function(id) {
    return $.ajax({
      url: "api/notes/" + id,
      method: "DELETE"
    });
};
  
// Now the frontend interaction functions...

// Render note list from db
const renderDB = function(allNotes) {

    // First clear the noteAside of any previous values
    $noteAside.empty();

    // Create an empty array to store the allNotes data that the for loop changes
    var changedAllNotes = [];

    for (var i = 0; i < allNotes.length; i++) {
        var aNote = allNotes[i];

        var $li = $("<li class='list-group-item'>").data(aNote);
        var $span = $("<span>").text(aNote.title);
        var $delBtn = $("<i class='fas fa-trash-alt float-right text-danger delete-note'>");

        $li.append($span, $delBtn);

        changedAllNotes.push($li);
    }

    // Put the now changed notes where the emptied noteAside is
    $noteAside.append(changedAllNotes);
};

// Save note function
const handleNoteSave = function() {
    const newNote = {
        title: $noteTitle.val(),
        text: $noteText.val()
    }

    // On the frontend, make the text that was entered disappear
    $noteTitle.val(''); 
    $noteText.val('');

    // Once note is gleaned from the field, send it to the db
    saveNote(newNote);

    // Automatically display the new db on the aside panel
    getAndRenderNotes();
};

// Delete note function
const handleNoteDelete = function(event) {
    // prevents the click listener for the list from being called when the button inside of it is clicked
    event.stopPropagation();

    const note = $(this).parent(".list-group-item").data();

    deleteNote(note.id);
    getAndRenderNotes(); 
};

// (See Execute call at bottom) Functions to get already-stored db entries and display them to the notes aside
const getAndRenderNotes = function() {
    return getNotes().then(function(data) {
        renderDB(data);
    })
};

// When clicking on the aside list, make the text entry fields show the content that's in that aside card
const handleNoteView = function () {
    activeNote = $(this).data();
    renderActiveNote();
}

const renderActiveNote = () => {
    if (activeNote.id) {
        $noteTitle.val(activeNote.title);
        $noteText.val(activeNote.text);
    } else {
        $noteTitle.val("");
        $noteText.val("");
    }
}

// All click handlers
$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".delete-note", handleNoteDelete);
//// Comment: "delete-note" doesn't exist from the html. Instead, it gets created via js when an entry is saved to/or already exists in, the db
$noteList.on("click", ".delete-note", handleNoteDelete);

$noteList.on("click", ".list-group-item", handleNoteView);


// (Execute) Functions to get already-stored db entries and display them to the notes aside
getAndRenderNotes();
