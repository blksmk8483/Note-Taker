const express = require('express');
const path = require('path');
const data = require('./db/db.json');

// This gives me my port and will also work on Heroku
const PORT = process.env.PORT || 3001;

const app = express();

// This is my middleware.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));


// This is my HTML route for my notes.html 
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
); 


// This is my HTML route for my index.html
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
// I think this is a wildcard route.
// The example I used was from Unit 11, #28, the mini-project was setup like this but it took it to an error page.


// This is my GET API route that should read my db.json file and return all saved notes as JSON
app.get('/api/notes', (req, res) => res.json(data));


// This is my POST API route that should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.

// I don't remember how to do this so I am going to study this tomorrow and then finish......

app.post('/api/reviews', (req, res) => {
    // Let the client know that their POST request was received
    res.json(`${req.method} request received`);
  
    // // Show the user agent information in the terminal
    // console.info(req.rawHeaders);
  
    // // Log our request to the terminal
    // console.info(`${req.method} request received`);
  });



// Telling Express to listen.
app.listen(PORT, () => {
  console.log(`This app is listening at http://localhost:${PORT}`);
});
