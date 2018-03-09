/*
 * @license MIT
 * Copyright (c) 2017 - 2018 Bernhard Grünewaldt
 */

import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as errorhandler from 'errorhandler';
import * as express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';
import { isNullOrUndefined } from 'util';
import { apiRouter } from './api/api';
import { i18nMiddleware } from './i18n/i18n-handler';

export const app = express();
const PORT = process.env.PORT || 5000;

// Init i18n
app.use(i18nMiddleware);
// Parse application/json
app.use(bodyParser.json());
// Logging Middleware
if (isNullOrUndefined(process.env.IS_TEST_RUN)) { app.use(morgan('dev')); }
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
app.get('/v2/swagger.json', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, './public/swagger.json'));
});

// Enable Errorhandler (must be last!)
app.use(errorhandler());

// Start Server listening
app.listen(PORT, () => {
  console.log('Listening on port: ' + PORT);
});
