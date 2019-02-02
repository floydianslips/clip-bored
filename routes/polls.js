"use strict";

const express = require('express');
const router  = express.Router();
console.log("help")
module.exports = (knex) => {
  // knex('options').where({'polls_id': req.params.id}).then(function(rows) {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("options").where({polls_id: 2})
      .then((results) => {

        res.json(results);
    });
  });
  return router;
};

