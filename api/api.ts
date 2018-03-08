/*
 * @license MIT
 * Copyright (c) 2017 - 2018 Bernhard Grünewaldt
 */
import * as express from 'express';
export const apiRouter = express.Router();
import { ticketsRouter } from './tickets';
apiRouter.use('/tickets', ticketsRouter);

