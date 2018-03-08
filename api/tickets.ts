/*
 * @license MIT
 * Copyright (c) 2017 - 2018 Bernhard Grünewaldt
 */
import { Router } from 'express';
import * as path from 'path';
import { isNullOrUndefined } from 'util';
import { Ticket, ValidationError } from '../model/api.model';
export const ticketsRouter = Router();



//
// VALIDATION
//
const validateCreateTicket = (ticket: Ticket, i18n: Function): ValidationError[] => {
  const errors: ValidationError[] = [];
  if (!ticket.hasOwnProperty('id') || isNullOrUndefined(ticket.id)) {
    errors.push({ 
      field: 'id',
      type: 'required',
      i18n: 'validation.ticket.id.required',
      message: i18n('validation.ticket.id.required')
    })
  }
  return errors;
}

//
// ROUTES /api/tickets
//
ticketsRouter.get('/', (req, res, next) => {
  res.send('ok').status(200)
});

ticketsRouter.post('/', (req, res, next) => {
  const errors = validateCreateTicket(req.body, req.i18n);
  if (errors.length > 0) {
    res.status(420).json({
      status: 420,
      message: 'invalid ticket',
      errors: errors,
    });
  } else {
    res.status(204).json({
      status: 200,
      message: 'ok' 
    });
  }
});
