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
    public i18n: string,
    public message: string,
  ) {}
}
