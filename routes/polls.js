"use strict";
const url = require('url');
const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.get("/", (req, res) => {
       knex
      .select("*")
      .from("options")
      .then((results) => {
       res.json(results);
    });
  });
  return router;
};