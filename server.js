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

//Post request
app.post("/api/notes", function(req, res) {
    fs.readFile("./db/db.json", "utf8", (err, data) =>{ 
        if (err) throw err;
        let savedNotes = JSON.parse(data);
        console.log(savedNotes);
 
    let newNotes = req.body;
    newNotes.id = savedNotes.length + 1;
    savedNotes.push(newNotes);
    console.log(savedNotes);

    //Add notes to db.json file 
    fs.writeFile("./db/db.json", JSON.stringify(savedNotes), (err) =>{
        if (err) return console.log(err);
     })
     console.log("Note saved to db.json. Content: ", newNotes);
     res.json(savedNotes)
    }); 
});

app.delete("/api/notes/:id", function(req, res) {
    fs.readFile("./db/db.json", "utf8", (err, data) =>{ 
        if (err) throw err;

    let savedNotes = JSON.parse(data);

    let noteID = req.params.id;
    let newID = 0;
    console.log(`Deleting note with ID ${noteID}`);
    savedNotes = savedNotes.filter(currNote => {
        return currNote.id != noteID;
    })
    
    for (currNote of savedNotes) {
        currNote.id = newID.toString();
        newID++;
    }
    
    fs.writeFile("./db/db.json", JSON.stringify(savedNotes), (err)=>{
        if (err) return console.log(err)
    })
    res.json(savedNotes); 
    });
})

//Listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
    