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

feature('Addition', function() {
  scenario('Add two natural numbers', function() {
    let newTicket: Ticket;
    let newTicketResponse: Ticket;
    let response: Response;
    given('I want to create a new Ticket with id `FOO-123` and reporter `Bob`', function() {
      newTicket = new Ticket('FOO-123', null, null, 'Bob');
    });
    and('I want the tickets summary to be `Foo` and description to be `Bar`', function() {
      newTicket.description = 'Bar';
      newTicket.summary = 'Foo';
    });
    when('I send the POST request to the API', async function() {
     response = await request(app).post('/api/tickets').send(newTicket).expect(204);
    });
    then('the result should valid', function() {
      console.log(response.body)
    });
  });
});
