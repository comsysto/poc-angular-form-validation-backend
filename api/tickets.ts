/*
 * @license MIT
 * Copyright (c) 2017 - 2018 Bernhard Grünewaldt
 */
import { Router } from 'express';
import * as path from 'path';
export const ticketsRouter = Router();

//
// ROUTES /api/tickets
//
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language

ticketsRouter.get('/', (req, res, next) => {
  res.status(200)
});

ticketsRouter.post('/', (req, res, next) => {
  res.status(204).json({ ok: 'ok' });
});
