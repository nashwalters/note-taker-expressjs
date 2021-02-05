//Node modules
const express = require('express');
const path = require('path');
const fs = require('fs')

const app = express();

// Set port
const PORT = process.env.PORT || 5000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//displays static files such as css & js
app.use(express.static('public')) 

// Get requests
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

// If no matching route is found default to home
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

//Listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
    