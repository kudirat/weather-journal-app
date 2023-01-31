// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser')
const port = 3000;

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// GET method route to return project data object to server
app.get('/all', function (req, res) {
  res.send(projectData);
});

// POST method route to add incoming data to projectData
app.post('/add', addData);

function addData(req, res) {
  projectData['temp'] = req.body.temp;
  projectData['date'] = req.body.date;
  projectData['userResponse'] = req.body.content;
  res.send(projectData);
}

// Setup Server
const server = app.listen(port, listening);

function listening() {
  console.log(server);
  console.log(`running on localhost: ${port}`);
};
//go to local host: 3000 to run code. Live server won't work.

