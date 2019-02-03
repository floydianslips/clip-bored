"use strict";
const url = require('url');
const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.get("/", (req, res) => {
       knex
      .select("*", "options.title AS question")
      .from("options")
       .leftOuterJoin("polls", "polls_id", "polls.id")
       .orderBy("points", "desc")
      .then((results) => {
       res.json(results);
       console.log(results)
      });
  });
  return router;
};

