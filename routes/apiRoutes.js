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

  app.post("/api/notes", function(req, res) {

    // Take req from the js file and put it into the db we called so it gets displayed on the side view
    dbNotes.push(req.body);
    console.log(dbNotes);

  })

  
  // DELETE Requests

};
