/*
 * @license MIT
 * Copyright (c) 2017 - 2018 Bernhard Grünewaldt
 */
const bodyParser = require('body-parser');
const cors = require('cors');
const errorhandler = require('errorhandler');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const apiRouter = require('./api/api');

const app = express();
const PORT = process.env.PORT || 5000;


// Parse application/json
app.use(bodyParser.json());
// Logging Middleware
app.use(morgan('dev'));
// Enable CORS
app.use(cors());
// Serve API
app.use('/api', apiRouter);


// Serve a index.html
app.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, './public/index.html'));
});
app.get('/favicon.png', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, './public/favicon.png'));
});

// Enable Errorhandler
app.use(errorhandler());

// Start Server listening
app.listen(PORT, () => {
  console.log('Listening on port: ' + PORT);
});

// Export app
module.exports = app;
