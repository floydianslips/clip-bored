"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
const sendEmail   = require("./public/scripts/sendEmail");
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

//POST or PUT listeners
app.post("/polls/", (req, res) => {
  let newPollId = generateRandomNumbers(6);
  let newPollMaker = req.body['newPoll']['maker'];
  let newPollTitle = req.body['newPoll']['title'];
  let newPollOptions = req.body['options'];
  let pollResults = "http://localhost:8080/polls/" + newPollId + "/results";
  let pollUrl = "http://localhost:8080/polls/" + newPollId;
  //Inserts The Poll Into DB
  knex('polls').insert({id: newPollId, maker: newPollMaker, title: newPollTitle, voter_count: 0}).then(function() {
    //Create Maker With E-Mail And Tie The Poll To Them
    knex('makers').insert({ email: newPollMaker, polls_id: newPollId} ).then(function() {
      //Inserts Options Into DB
      for (var key in newPollOptions) {
        knex('options').insert({polls_id: newPollId, title: newPollOptions[key]['title'], description: newPollOptions[key]['description'], points: 0}).then(function() {
        });
      }
    });
  //INSERT MAILGUN FUNCTION CALL HERE
  console.log("new poll", newPollMaker);
  sendEmail(newPollMaker, pollResults, pollUrl);

  res.redirect("/polls/" + newPollId + "/results");
  return;
  });
});


app.put("/polls/:id", (req, res) => {
  let whichPoll = req.body['whichPoll'];
  let votes = req.body['newVotes'];
  for (var key in votes) {
    //Adds The Points To The Correct Options
    // console.log('Finding...ID: ', votes[key]['id']);
    knex('options').where('id', votes[key]['id']).update({ 'points': knex.raw(`points + ${votes[key]['points']}`)}).then(function() {
    })
  }
  //INSERT MAILGUN FUNCTION CALL HERE
  res.redirect("/polls/" + req.params.id + "/results");
});



// GET listeners

//Renders index page on home root visit
app.get("/", (req, res) => {
  res.render("/public/index.html");
});

//Redirects user to home on visiting /polls
app.get("/polls/", (req, res) => {
  res.redirect("/");
});

//Loads the vote page for the current poll
app.get("/polls/:id", (req, res) => {
  let allOptionsForPoll = {};
  knex('options').where({'polls_id': req.params.id}).then(function(rows) {
    for (let i=0; i < rows.length; i++) {
      allOptionsForPoll["option" + i] = {};
      allOptionsForPoll["option" + i]['id'] = rows[i]['id'];
      allOptionsForPoll["option" + i]['polls_id'] = rows[i]['polls_id'];
      allOptionsForPoll["option" + i]['description'] = rows[i]['description'];
      allOptionsForPoll["option" + i]['title'] = rows[i]['title'];
      allOptionsForPoll["option" + i]['points'] = rows[i]['points'];
    }
  // console.log('Final Results In An Object For The Website!', allOptionsForPoll);
  res.render("vote", allOptionsForPoll);
  })
});

//Loads the results page for the current poll
app.get("/polls/:id/results", (req, res) => {
  let allResultsForPoll = {};
  knex('options').where({'polls_id': req.params.id}).then(function(rows) {
    for (let i=0; i < rows.length; i++) {
      allResultsForPoll["option" + i] = {};
      allResultsForPoll["option" + i]['id'] = rows[i]['id'];
      allResultsForPoll["option" + i]['polls_id'] = rows[i]['polls_id'];
      allResultsForPoll["option" + i]['description'] = rows[i]['description'];
      allResultsForPoll["option" + i]['title'] = rows[i]['title'];
      allResultsForPoll["option" + i]['points'] = rows[i]['points'];
    }
  // console.log('Final Results In An Object For The Website!', allResultsForPoll);
  res.render("results", allResultsForPoll);
  })
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

// Random String Generator For UserIDs and ShortURL Names
function generateRandomNumbers(num) {
  const possible = '123456789';
  let outPut = 9;
    for (let i = 0; i < num; i++) {
    let character = possible.charAt(Math.floor(Math.random() * possible.length));
    outPut += character;
  }
  return outPut;
}
