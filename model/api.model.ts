/*
 * @license MIT
 * Copyright (c) 2017 - 2018 Bernhard Grünewaldt
 */
export class Ticket {
  constructor(
    public id: string,
    public summary: string,
    public reporter: string,
    public description?: string,
  ) {}
}

export class ValidationError {
  constructor(
    public field: string,
    public type: string,
    public message: string,
  ) {}
}

export class FieldValidationRule {
  constructor(
    public field: string,
    public type: string,
    public validations: ValidationRule[]
  ) {}
}
export class ValidationRule {
  constructor(
    public type: string,
    public message: Function,
  ) {}
}
export class ValidationRulePattern extends ValidationRule {
  constructor(
    public type: string,
    public message: Function,
    public pattern: string
  ) {
    super(type, message);
  }
}
export class ValidationRuleMinMaxLength extends ValidationRule {
  constructor(
    public type: string,
    public message: Function,
    public length: number
  ) {
    super(type, message);
  }
}
