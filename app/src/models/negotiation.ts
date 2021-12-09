import { Printable } from "../utils/printable.js";

export class Negotiation implements Printable{
  constructor(
    private _date: Date,
    public readonly amount: number,
    public readonly value: number
  ) {
    
  }

  public static createFrom(
    dateString: string,
    amountString: string,
    valueString: string
  ): Negotiation {
    const exp = /-/g;
    const date = new Date(dateString.replace(exp, ","));
    const amount = parseInt(amountString);
    const value = parseFloat(valueString);
    return new Negotiation(date, amount, value);
  }

  get date(): Date {
    const date = new Date(this._date.getTime());
    return date;
  }

  get volume(): number {
    return this.amount * this.value;
  }

  public forText(): string {
    return `
      Data:${this.date},
      Quantidade:${this.amount},
      Valor:${this.value}.
    `;
  }
}
