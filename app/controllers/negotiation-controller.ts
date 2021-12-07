import { DaysWeek } from "../enums/daysWeek.js";
import { Negotiation } from "../models/negotiation.js";
import { Negotiations } from "../models/negotiations.js";
import { MessageView } from "../views/message-view.js";
import { NegotiationsView } from "../views/negotiations-view.js";

export class NegotiationController {
  private inputDate: HTMLInputElement;
  private inputAmount: HTMLInputElement;
  private inputValue: HTMLInputElement;
  private negotiations = new Negotiations();
  private negotiationsView = new NegotiationsView("#negotiationsView");
  private messageView = new MessageView("#messageView");
  private readonly SARTUDAY = 6;
  private readonly SUNDAY = 0;

  constructor() {
    this.inputDate = document.querySelector("#date");
    this.inputAmount = document.querySelector("#amount");
    this.inputValue = document.querySelector("#value");
    this.negotiationsView.update(this.negotiations);
  }

  public addition(): void {
    const negotiation = this.createNegotiation();

    if (!this.itsWorkingDay(negotiation.date)) {
      this.messageView.update("Negociações são aceitas, apenas em dias úteis.");
      return;
    }

    this.negotiations.addition(negotiation);
    this.clearForm();
    this.updateView();
  }

  private itsWorkingDay(date: Date) {
    return date.getDay() > DaysWeek.SUNDAY && date.getDay() < this.SARTUDAY;
  }

  private createNegotiation(): Negotiation {
    const exp = /-/g;
    const date = new Date(this.inputDate.value.replace(exp, ","));
    const amount = parseInt(this.inputAmount.value);
    const value = parseFloat(this.inputValue.value);
    return new Negotiation(date, amount, value);
  }
  private clearForm(): void {
    this.inputDate.value = "";
    this.inputAmount.value = "";
    this.inputValue.value = "";
    this.inputDate.focus();
  }

  private updateView(): void {
    this.negotiationsView.update(this.negotiations);
    this.messageView.update("Negociação adicionada com sucesso.");
  }
}
