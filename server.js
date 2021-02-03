//Node modules
const express = require('express');
const path = require('path');
const fs = require('fs')

const app = express();

// Set port
const PORT = process.env.PORT || 5000;

//displays static files such as css & js
app.use(express.static('public')) 

//Listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
    