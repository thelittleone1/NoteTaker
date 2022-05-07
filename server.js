// Const;ants
const inquirer = require("inquirer");
const fs = require("fs");
const express = require("express");

// Pulled from Activity 10
// Consts for using Path 
// Initializing express
const path = require("path");
const app = express();
// Need a Port to host site on
const PORT = process.env.port || 3001;

// Function to start the web page
app.listen(PORT, () => {
    console.log(`http://localhost: ${PORT}`);
})

