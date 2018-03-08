export class Ticket {
  constructor(
    public id: string,
    public summary: string,
    public reporter: string,
    public description?: string,
  ) {}
}
