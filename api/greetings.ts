/*
 * @license MIT
 * Copyright (c) 2017 - 2018 Bernhard Grünewaldt
 */
import { Router } from 'express';
import * as i18n from 'i18n';
import * as path from 'path';
export const greetingsRouter = Router();

i18n.configure({
  locales:['en', 'de'],
  directory: path.resolve(__dirname + '/../i18n')
});

//
// Demonstrate Greeting i18n mechanism
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
//
greetingsRouter.get('/', (req, res, next) => {
  const reqLocale = req.get('Accept-Language');
  let selectedLocale = 'en';
  if (reqLocale.startsWith('de')) {
    selectedLocale = 'de';
  }
  res.set('Content-Language', selectedLocale);
  console.log(reqLocale);
  i18n.setLocale(selectedLocale);
  res.json({ 
    status: 200,
    message: i18n.__mf('greetings.hello') 
  });
});
