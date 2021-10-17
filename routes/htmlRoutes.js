// Call dependencies for routing
var path = require("path");

// Route

module.exports = function(app) {
  // HTML GET Requests

  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  // app.get("/notes/styles.css", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../assets/css/styles.css"));
  // });


  // If no matching route is found default to index
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
