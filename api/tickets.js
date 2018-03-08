/*
 * @license MIT
 * Copyright (c) 2017 - 2018 Bernhard Grünewaldt
 */

const express = require('express');
const ticketsRouter = express.Router();


//
// ROUTES /api/tickets
//
ticketsRouter.get('/', (req, res, next) => {
  res.json({ ok: 'ok' });
});

//
// Export
//
module.exports = ticketsRouter;
