/*
 * @license MIT
 * Copyright (c) 2017 - 2018 Bernhard Grünewaldt
 */
process.env.PORT = '5002';
process.env.IS_TEST_RUN = 'true';
import 'tartare';
import { expect } from 'chai';
import * as request from 'supertest';
import { app } from '../server';
import { Response } from 'supertest';

feature('I18n Greeting based on Request Headers', function() {
  scenario('German Greeting', function() {
    let acceptLanguageHeader: string;
    let response: Response;
    given('I set `Accept-Language` request header to "de" ', function() {
      acceptLanguageHeader = 'de';
    });
    when('I send the GET request to the API', async function() {
     response = await request(app)
        .get('/api/greetings')
        .set('Accept-Language', acceptLanguageHeader)
        .expect(200);
    });
    then('response should have german greeting and `Content-Language` response header should be "de"', function() {
      expect(response.body.message).to.eq('Guten Tag! Wollen Sie das Schnitzel?');
      expect(response.get('Content-Language')).to.eq('de');
    });
  });

  scenario('English Greeting', function() {
    let acceptLanguageHeader: string;
    let response: Response;
    given('I set `Accept-Language` request header to "en" ', function() {
      acceptLanguageHeader = 'en';
    });
    when('I send the GET request to the API', async function() {
     response = await request(app)
        .get('/api/greetings')
        .set('Accept-Language', acceptLanguageHeader)
        .expect(200);
    });
    then('response should have english greeting and `Content-Language` response header should be "en"', function() {
      expect(response.body.message).to.eq('Hello Good Day');
      expect(response.get('Content-Language')).to.eq('en');
    })
  });
});
