// Call dependencies in order to read db
var fs = require("fs");

// Call the db
var dbNotes = require("../db/db");

// Start API routing

module.exports = function(app) {
  // GET Requests

  app.get("/api/notes", function(req, res) {
    res.json(dbNotes);
  });

  // POST Requests

  //// Note: have a write funtion handy to update the db file with new post requests

  function writeNewNoteDB(newNotes) {
    freshNotes = JSON.stringify(newNotes);
    
    fs.writeFile("../db/db", freshNotes, (err) => {
      if (err) {
        return (err);
      } else {
        console.log("Note successfully saved.")
      }
    })
  }

  app.post("/api/notes", function(req, res) {

    // We'll need each new note to have an id so it's easier to delete the note later
    // Lets add some vars so it's easier to read
    var newID = req.body.id;
    // Enable the ids to increase based on the amount of entries expanding in the db
    if (dbNotes.length == 0) {
      newID = 1;
    } else {
      newID = dbNotes.length + 1;
    }

    // Add "newID" to the newNote we want to push
    var addedNewNote = req.body;
    addedNewNote.id = newID;

    // Take req from the js file and put it into the db we called so it gets displayed on the side view
    dbNotes.push(addedNewNote);

    // Now write the db file with the new array
    writeNewNoteDB(dbNotes);
  })

  
  // DELETE Requests

};
