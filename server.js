// Include Server Dependencies
var express = require('express');
var bodyParser = require('body-parser');

// Create Instance of Express
var app = express();
var PORT = process.env.PORT || 3000; // Sets an initial port. 



// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});