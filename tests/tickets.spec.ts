/*
 * @license MIT
 * Copyright (c) 2017 - 2018 Bernhard Grünewaldt
 */
process.env.PORT = '5001';
import 'tartare';
import { expect } from 'chai';
import * as request from 'supertest';
import { app } from '../server';
import { Ticket } from '../model/api.model';
import { Response } from 'supertest';

feature('Ticket Validation', function() {
  scenario('Add a valid ticket', function() {
    let newTicket: Ticket;
    let acceptLanguageHeader: string;
    let newTicketResponse: Ticket;
    let response: Response;
    given('I want to create a new Ticket with id `FOO-123` and reporter `Bob`', function() {
      newTicket = new Ticket('FOO-123', null, 'Bob');
    });
    and('I want the tickets summary to be `Foo` and description to be `Bar`', function() {
      newTicket.description = 'Bar';
      newTicket.summary = 'Foo';
    });
    when('I send the POST request to the API', async function() {
      response = await request(app).post('/api/tickets').send(newTicket).expect(204);
    });
    then('the result should not contain errors', function() {
      expect(response.body).to.not.have.property('errors');
    });
  });

  scenario('Add invalid ticket: id->pattern, locale->de', function() {
    let newTicket: Ticket;
    let acceptLanguageHeader: string;
    let newTicketResponse: Ticket;
    let response: Response;
    given('I want to create a new Ticket with id `-123` and reporter `Bob`', function() {
      newTicket = new Ticket('-123', null, 'Bob');
    });
    and('I set `Accept-Language` request header to `de` ', function() {
      acceptLanguageHeader = 'de';
    });
    and('I want the tickets summary to be `Foo` and description to be `Bar`', function() {
      newTicket.description = 'Bar';
      newTicket.summary = 'Foo';
    });
    when('I send the POST request to the API', async function() {
      response = await request(app)
        .post('/api/tickets')
        .set('Accept-Language', acceptLanguageHeader)
        .send(newTicket).expect(400);
    });
    then('the result should have a valid with german message', function() {
      expect(response.get('Content-Language')).to.eq('de');
      expect(response.body.status).to.eq(400);
      expect(response.body.errors).to.be.not.null;
      expect(response.body.errors.length).to.eq(1);
      expect(response.body.errors[0].message).to.eq('Muss mit 1-5 Großbuchstaben beginnen, gefolgt von Bindestrich, gefolgt von Zahlen.');
    });
  });

  scenario('Add invalid ticket: id->pattern, locale->en', function() {
    let newTicket: Ticket;
    let acceptLanguageHeader: string;
    let newTicketResponse: Ticket;
    let response: Response;
    given('I want to create a new Ticket with id `-123` and reporter `Bob`', function() {
      newTicket = new Ticket('-123', null, 'Bob');
    });
    and('I set `Accept-Language` request header to `en` ', function() {
      acceptLanguageHeader = 'en';
    });
    and('I want the tickets summary to be `Foo` and description to be `Bar`', function() {
      newTicket.description = 'Bar';
      newTicket.summary = 'Foo';
    });
    when('I send the POST request to the API', async function() {
      response = await request(app)
        .post('/api/tickets')
        .set('Accept-Language', acceptLanguageHeader)
        .send(newTicket).expect(400);
    });
    then('the result should have a valid with english message', function() {
      expect(response.get('Content-Language')).to.eq('en');
      expect(response.body.status).to.eq(400);
      expect(response.body.errors).to.be.not.null;
      expect(response.body.errors.length).to.eq(1);
      expect(response.body.errors[0].message).to.eq('Must begin with 1-5 capital letters followed by a dash, followed by numbers.');
    });
  });


  scenario('Add invalid ticket: reporter->minLength, locale->en', function() {
    let newTicket: Ticket;
    let acceptLanguageHeader: string;
    let newTicketResponse: Ticket;
    let response: Response;
    given('I want to create a new Ticket with id `FOO-123` and reporter `B`', function() {
      newTicket = new Ticket('FOO-123', null, 'B');
    });
    and('I set `Accept-Language` request header to `en` ', function() {
      acceptLanguageHeader = 'en';
    });
    and('I want the tickets summary to be `Foo` and description to be `Bar`', function() {
      newTicket.description = 'Bar';
      newTicket.summary = 'Foo';
    });
    when('I send the POST request to the API', async function() {
      response = await request(app)
        .post('/api/tickets')
        .set('Accept-Language', acceptLanguageHeader)
        .send(newTicket).expect(400);
    });
    then('the result should have a valid with english message', function() {
      expect(response.get('Content-Language')).to.eq('en');
      expect(response.body.status).to.eq(400);
      expect(response.body.errors).to.be.not.null;
      expect(response.body.errors.length).to.eq(1);
      expect(response.body.errors[0].message).to.eq('Must be at least 3 characters long');
    });
  });

  scenario('Add invalid ticket: reporter->maxLength, locale->en', function() {
    let newTicket: Ticket;
    let acceptLanguageHeader: string;
    let newTicketResponse: Ticket;
    let response: Response;
    given('I want to create a new Ticket with id `FOO-123` and reporter `Booooooooo.....ooob`', function() {
      newTicket = new Ticket('FOO-123', null, 'Boooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooob');
    });
    and('I set `Accept-Language` request header to `en` ', function() {
      acceptLanguageHeader = 'en';
    });
    and('I want the tickets summary to be `Foo` and description to be `Bar`', function() {
      newTicket.description = 'Bar';
      newTicket.summary = 'Foo';
    });
    when('I send the POST request to the API', async function() {
      response = await request(app)
        .post('/api/tickets')
        .set('Accept-Language', acceptLanguageHeader)
        .send(newTicket).expect(400);
    });
    then('the result should have a valid with english message', function() {
      expect(response.get('Content-Language')).to.eq('en');
      expect(response.body.status).to.eq(400);
      expect(response.body.errors).to.be.not.null;
      expect(response.body.errors.length).to.eq(1);
      expect(response.body.errors[0].message).to.eq('Cannot be longer than 250 characters.');
    });
  });

  scenario('Add invalid ticket: id->required, locale->en', function() {
    let newTicket: Ticket;
    let acceptLanguageHeader: string;
    let newTicketResponse: Ticket;
    let response: Response;
    given('I want to create a new Ticket with id `null` and reporter `Bob`', function() {
      newTicket = new Ticket(null, null, 'Bob');
    });
    and('I set `Accept-Language` request header to `en` ', function() {
      acceptLanguageHeader = 'en';
    });
    and('I want the tickets summary to be `Foo` and description to be `Bar`', function() {
      newTicket.description = 'Bar';
      newTicket.summary = 'Foo';
    });
    when('I send the POST request to the API', async function() {
      response = await request(app)
        .post('/api/tickets')
        .set('Accept-Language', acceptLanguageHeader)
        .send(newTicket).expect(400);
    });
    then('the result should have a valid with english message', function() {
      expect(response.get('Content-Language')).to.eq('en');
      expect(response.body.status).to.eq(400);
      expect(response.body.errors).to.be.not.null;
      expect(response.body.errors.length).to.eq(2);
      expect(response.body.errors[1].message).to.eq('Is required.');
    });
  });
});
