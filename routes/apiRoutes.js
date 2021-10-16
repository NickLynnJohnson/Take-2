// Call dependencies in order to read db
var fs = require("fs");

// Call the db

// var dbNotes = require("../db/db.json");
var dbNotes = require("../db/db");

// Start API routing

module.exports = function(app) {
  // GET Requests

  app.get("/api/notes", function(req, res) {
    res.json(dbNotes);
  });

  // POST Requests

  
  // DELETE Requests

};
