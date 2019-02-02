"use strict";

const express = require('express');
const router  = express.Router();
module.exports = (knex) => {
  // knex('options').where({'polls_id': req.params.id}).then(function(rows) {

  router.get("/:id", (req, res) => {
    console.log(req.params.id)

    knex
      .select("*")
      .from("options").where({polls_id: req.params.id})
      .then((results) => {

        res.json(results);
    });
  });
  return router;
};

