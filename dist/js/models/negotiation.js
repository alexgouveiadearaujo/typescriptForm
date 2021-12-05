export class Negotiation {
    constructor(_date, amount, value) {
        this._date = _date;
        this.amount = amount;
        this.value = value;
    }
    get date() {
        const date = new Date(this._date.getTime());
        return date;
    }
    get volume() {
        return this.amount * this.value;
    }
}
/*
export class Negotiation {
    private _date: Date;
    private _amount: number;
   private _value: number;

  constructor(date: Date,amount: number,value: number) {
    this._date = date;
    this._amount = amount;
    this._value = value;
  }
*/
