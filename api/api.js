/*
 * @license MIT
 * Copyright (c) 2017 - 2018 Bernhard Grünewaldt
 */
const express = require('express');
const apiRouter = express.Router();
const ticketsRouter = require('./tickets.js');

apiRouter.use('/tickets', ticketsRouter);

module.exports = apiRouter;
