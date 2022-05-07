// Const;ants
const inquirer = require("inquirer");
const fs = require("fs");
const express = require("express");

// Pulled from Activity 10
// Consts for using Path 
// Initializing express
const path = require("path");
const app = express();
// Need a Port to host site on Heroku 
// and if not avaible use 3001
const PORT = process.env.port || 3001;

// Pulled from Activity 7
// Sets up express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Reference: https://www.digitalocean.com/community/tutorials/nodejs-how-to-use__dirname
// Refers to absulute path to directory containing the currently executing file
// Used Activites 7 & 17
const dirPath = path.join(_dirname, '/public');

// Creating rotes to connect main path to other folders
// Referenced Activity 18
app.get("/notes", (req, res) => {
    res.sendFile(path.join(dirPath, "notes.html"));
});

// Route to API Data to add/delete notes from userEntry
// Activities 22 & 21
app.get("/api/notes", (req, res) => {
    // db is an empty object array before user entry
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

// Pulled from Activity 10
// Function to start the web page
app.listen(PORT, () => {
    console.log(`Serving static asset routes at: http://localhost:${PORT}`);
});

