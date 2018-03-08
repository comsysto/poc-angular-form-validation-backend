/*
 * @license MIT
 * Copyright (c) 2017 - 2018 Bernhard Grünewaldt
 */
import * as express from 'express';
export const ticketsRouter = express.Router();


//
// ROUTES /api/tickets
//
ticketsRouter.get('/', (req, res, next) => {
  res.json({ ok: 'ok' });
});

ticketsRouter.post('/', (req, res, next) => {
  res.status(204).json({ ok: 'ok' });
});
