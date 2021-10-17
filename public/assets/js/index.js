
// Call in variables
const $noteAside = $(".note-aside"); 

// Get notes from the db
var getNotes = function() {
    return $.ajax({
        url: "/api/notes",
        method: "GET"
    });
}

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

// (See Execute call at bottom) Functions to get already-stored db entries and display them to the notes aside
var getAndRenderNotes = function() {
    return getNotes().then(function(data) {
        renderDB(data);
    })
}

// (Execute) Functions to get already-stored db entries and display them to the notes aside
getAndRenderNotes();
