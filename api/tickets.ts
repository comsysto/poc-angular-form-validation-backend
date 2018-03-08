/*
 * @license MIT
 * Copyright (c) 2017 - 2018 Bernhard Grünewaldt
 */
import { Router } from 'express';
import * as path from 'path';
import { isNullOrUndefined } from 'util';
import { Ticket, ValidationError, FieldValidationRule,
  ValidationRulePattern, ValidationRuleMinMaxLength, ValidationRule } from '../model/api.model';
export const ticketsRouter = Router();



//
// VALIDATION
//
const ticketValidationRules: FieldValidationRule[] = [
  {
    field: 'id',
    type: 'string',
    validations: [
      {
        type: 'pattern',
        message: (i18n) => i18n('validation.ticket.id.pattern', { range: '1-5' }),
        pattern: '^[A-Z]{1,5}[-][0-9]+$'
      } as ValidationRulePattern,
      {
        type: 'required',
        message: (i18n) => i18n('validation.generic.required')
      } as ValidationRule
    ]
  },
  {
    field: 'summary',
    type: 'string',
    validations: [
      {
        type: 'required',
        message: (i18n) => i18n('validation.generic.required')
      } as ValidationRule,
      {
        type: 'maxLength',
        message: (i18n) => i18n('validation.generic.maxLength', { length: 150 }),
        length: 150
      } as ValidationRuleMinMaxLength
    ]
  },
  {
    field: 'description',
    type: 'string',
    validations: [
      {
        type: 'maxLength',
        message: (i18n) => i18n('validation.generic.maxLength', { length: 250 }),
        length: 250
      } as ValidationRuleMinMaxLength
    ]
  },
  {
    field: 'reporter',
    type: 'string',
    validations: [
      {
        type: 'minLength',
        message: (i18n) => i18n('validation.generic.minLength', { length: 3 }),
        length: 3
      } as ValidationRuleMinMaxLength,
      {
        type: 'maxLength',
        message: (i18n) => i18n('validation.generic.maxLength', { length: 250 }),
        length: 250
      } as ValidationRuleMinMaxLength
    ]
  }
];

//
// VALIDATION CHECK
//
const validateCreateTicket = (ticket: Ticket, i18n: Function): ValidationError[] => {
  const errors: ValidationError[] = [];
  for (let fieldValidationRule of ticketValidationRules) {
    for (let validationRule of fieldValidationRule.validations) {
      if (validationRule.type === 'pattern') {
        const patternRule = validationRule as ValidationRulePattern;
        const regex = new RegExp(patternRule.pattern);
        if (!regex.test(ticket[fieldValidationRule.field])) {
          errors.push(new ValidationError(
            fieldValidationRule.field,
            validationRule.type,
            validationRule.message(i18n)));
        }
      }

      if (validationRule.type === 'minLength' || validationRule.type === 'maxLength') {
        const lengthRule = validationRule as ValidationRuleMinMaxLength;
        if (!isNullOrUndefined(ticket[fieldValidationRule.field])) {
          if (validationRule.type === 'minLength' && ticket[fieldValidationRule.field].length < lengthRule.length ||
              validationRule.type === 'maxLength' && ticket[fieldValidationRule.field].length > lengthRule.length) {
                errors.push(new ValidationError(
                  fieldValidationRule.field,
                  validationRule.type,
                  validationRule.message(i18n)));
          }
        }
      }
      if (validationRule.type === 'required') {
        const requiredRule = validationRule;
        if (isNullOrUndefined(ticket[fieldValidationRule.field]) ||
            !isNullOrUndefined(ticket[fieldValidationRule.field]) && ticket[fieldValidationRule.field].length === 0) {
          errors.push(new ValidationError(
            fieldValidationRule.field,
            validationRule.type,
            validationRule.message(i18n)));
        }
      }
    }
  }
  return errors;
}

//
// ROUTES /api/tickets
//
ticketsRouter.get('/', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(
    ticketValidationRules.map(r => {
      const _r = Object.assign({}, r) as any;
      _r.validations = r.validations.map(v => {
        const _v = Object.assign({}, v) as any;
        _v.message = v.message(req.i18n);
        return _v;
      });
      return _r;
  })).status(200);
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
