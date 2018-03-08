/*
 * @license MIT
 * Copyright (c) 2017 - 2018 Bernhard Grünewaldt
 */
import { Router } from 'express';
import { I18nAwareRequest } from '../i18n/i18n-handler';
export const greetingsRouter = Router();

//
// Demonstrate Greeting i18n mechanism
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
//
greetingsRouter.get('/', (req: I18nAwareRequest, res, next) => {
  res.json({ 
    status: 200,
    message: req.i18n('greetings.hello') 
  });
});
