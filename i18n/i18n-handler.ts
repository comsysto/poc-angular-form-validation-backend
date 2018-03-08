/*
 * @license MIT
 * Copyright (c) 2017 - 2018 Bernhard Grünewaldt
 */

//
// IMPORTS
//
import * as path from 'path';
import * as fs from 'fs';
import * as dotize from 'dotize';
import IntlMessageFormat from 'intl-messageformat';
import { Request } from 'express';

//
// LOAD MESSAGES (once) 
//
const messages: any[] = [];
messages['en'] = dotize.convert(JSON.parse(fs.readFileSync(path.resolve(__dirname + '/en.json'), 'utf8')));
messages['de'] = dotize.convert(JSON.parse(fs.readFileSync(path.resolve(__dirname + '/de.json'), 'utf8')));
const getMessageByLocale = (i18nKey: string, locale: string) => {
  let _locale = locale;
  if (locale !== 'de' && locale !== 'en') {
    _locale = 'en';
  }
  return messages[_locale][i18nKey];
}

//
// i18n handler
//
export const i18nMiddleware = (req, res, next) => {
  const reqLocale = req.get('Accept-Language');
  let selectedLocale = 'en';
  if (reqLocale.startsWith('de')) {
    selectedLocale = 'de';
  }
  res.set('Content-Language', selectedLocale);
  req.i18n = (i18nKey: string, i18nValues?: any): string => {
    const msg = new IntlMessageFormat(getMessageByLocale(i18nKey, selectedLocale), selectedLocale);
    return msg.format(i18nValues);
  };
  next();
}

//
// MODEl
//
export interface I18nAwareRequest extends Request {
  i18n(i18nKey: string, i18nValues?: any): string;
};
