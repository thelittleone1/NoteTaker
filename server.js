// Const;ants
const inquirer = require("inquirer");
const fs = require("fs");
const express = require("express");
const uuid = require('./helpers/uuid');
const util = require("node:util");
const readFile = util.promisify(fs.readFile);

// Pulled from Activity 10
// Consts for using Path 
// Initializing express
const path = require("path");
const app = express();
// Need a Port to host site on Heroku 
// and if not avaible use 3001
const PORT = process.env.PORT || 3001;

// Pulled from Activity 7
// Sets up express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Reference: https://www.digitalocean.com/community/tutorials/nodejs-how-to-use__dirname
// Refers to absulute path to directory containing the currently executing file
// Used Activites 7 & 17
const dirPath = path.join(__dirname, '/public');

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

// Activity 16 and 18
// creating an id for each userEntry note
// Function will allow saved notes to be parsed 
// and saved to db
app.get("/api/notes/:id", (req, res) => {
    let userEntry = JSON.parse(fs.readFileSync("./db/db.json"));
    res.json(userEntry);
});

// Post Method function
app.post("/api/notes", (req, res) => {
    let userEntry = JSON.parse(fs.readFileSync("./db/db.json"));
    let nextUserEntry = req.body;
    let newID = (userEntry.length).toString();
    nextUserEntry.id = newID;
    userEntry.push(nextUserEntry);

    fs.writeFileSync("./db/db.json", JSON.stringify(userEntry));
    console.log(nextUserEntry);
    res.json(userEntry);
});

// Delete Method function
// adding the :id because to delete we need to access the note id
app.delete("/api/notes/:id", (req, res) => {
    let userEntry = JSON.parse(fs.readFileSync("./db/db.json"));
    // Setting the entry to the id parameter
    let nextUserEntry = req.params.id;
    let newID = 0;

    nextUserEntry.id = newID;
    userEntry.push(nextUserEntry);
});

// Pulled from Activity 10
// Function to start the web page
app.listen(PORT, () => {
    console.log(`Serving static asset routes at: http://localhost:${PORT}`);
});


// // Activity 20
// // Function to delete notes
// app.delete('/:id',(req,res) => {
//     if(req.params && req.params.id){
//         readFile('./db/notes.json','utf8').then((data) =>{
//             if(data){
//                 const deleteNote = JSON.parse(data);
//                 let spliceId = -1;
//                 for(let note in deleteNote){
//                     if(deleteNote[note].id == req.params.id){
//                         spliceId = note;
//                         deleteNote.splice(note,1);
//                         break;
//                     }
//                 }
//                 writeToFile('./db/notes.json',deleteNote);
//             }
//         });
//     }
//     res.send('Message from delete');
// });

// // Activity 18 & 20
// // Post function to post userEntered notes
// app.post("/", (req, res) => {
//     //let userEntry = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
//     // req.body allows access data in a JSON object from client
//     //let note = req.body;
//     if (req.body) {
//         req.body.id = uuid();
//         //readAndAppend(req.body, "./db/notes.json");
//         fs.readFile(file, "utf8", (err, data) => {
//             if (err) {
//                 console.error("Could not find file");
//             } else {
//                 const userEntry = JSON.parse(data);
//                 userEntry.push(req.body);
//                 fs.writeFile("./db/notes.json", JSON.stringify(userEntry, null, 4), (err) => {
//                     err ? console.error(err) : console.info("Succsess!");
//                 });
//             }
//         });
//         res.send(`${req.method}`);
//     };
   
// });


