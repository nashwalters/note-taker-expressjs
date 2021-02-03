//Node modules
const express = require('express');
const path = require('path');
const fs = require('fs')

const app = express();

// Set port
const PORT = process.env.PORT || 5000;

//displays static files such as css & js
app.use(express.static('public')) 

// Get requests
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});
// If no matching route is found default to home
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

//Listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
    