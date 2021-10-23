// Call in variables
const $noteAside = $(".note-aside"); 
const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $saveNoteBtn = $(".save-note");

// All db functions

//// Get notes from the db
var getNotes = function() {
    return $.ajax({
        url: "/api/notes",
        method: "GET"
    });
}

//// Save a new note to the db
const saveNote = function(note) {
    return $.ajax({
      url: "/api/notes",
      data: note,
      method: "POST",
    });
  };
  

// Render note list from db
var renderDB = function(allNotes) {

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
}

// Save note functions

//// Get the note data from inputs

const handleNoteSave = function() {
    const newNote = {
        title: $noteTitle.val(),
        text: $noteText.val()
    }

    saveNote(newNote);
    getAndRenderNotes();
}


// (See Execute call at bottom) Functions to get already-stored db entries and display them to the notes aside
var getAndRenderNotes = function() {
    return getNotes().then(function(data) {
        renderDB(data);
    })
}

// All click handlers
$saveNoteBtn.on("click", handleNoteSave);


// (Execute) Functions to get already-stored db entries and display them to the notes aside
getAndRenderNotes();
