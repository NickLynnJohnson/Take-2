// Call dependencies for app
const express = require("express");

// Start app
const app = express();
const PORT = process.env.PORT || 9999;

// Setup Express app for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup Routes for app
// require("./Develop/routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Setup listener for app
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });