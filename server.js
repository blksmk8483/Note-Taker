const express = require('express');
const path = require('path');
const data = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
// const { json } = require('body-parser');

// This gives me my port and will also work on Heroku
const PORT = process.env.PORT || 3001;

const app = express();

// This is my middleware.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

//------------HTML GET REQUEST------------

// This is my HTML route for my notes.html 
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
); 

// ------------API ROUTES------------

// This is my GET API route that should read my db.json file and return all saved notes as JSON
app.get('/api/notes', (req, res) => res.json(data));


// This is my POST API route that should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.

app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a review`);
  
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title: title,
        text: text,
        id: uuidv4()
      };
  
      data.push(newNote);
      console.log(data);

      fs.writeFile(`./db/db.json`, JSON.stringify(data), (err) =>
      err ? console.error(err): console.log(`Congrats! It worked!`));
 
      res.status(201).json(data);
    } else {
      res.status(500).json('Error in posting review');
    }
  });

  // ------------WILDCARD ROUTE------------
// This is my wildcard HTML route for my index.html
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


// Telling Express to listen.
app.listen(PORT, () => {
  console.log(`This app is listening at http://localhost:${PORT}`);
});
