import { loginRuntime } from "../decorators/loginRuntime.js";
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

  constructor() {
    this.inputDate = <HTMLInputElement>document.querySelector("#date");
    this.inputAmount = document.querySelector("#amount") as HTMLInputElement;
    this.inputValue = document.querySelector("#value") as HTMLInputElement;
    this.negotiationsView.update(this.negotiations);
  }

  @loginRuntime()
  public addition(): void {
    const negotiation = Negotiation.createFrom(
      this.inputDate.value,
      this.inputAmount.value,
      this.inputValue.value
    );

    if (!this.itsWorkingDay(negotiation.date)) {
      this.messageView.update("Negociações são aceitas, apenas em dias úteis.");
      return;
    }

    this.negotiations.addition(negotiation);
    this.clearForm();
    this.updateView();
  }

  private itsWorkingDay(date: Date) {
    return date.getDay() > DaysWeek.SUNDAY && date.getDay() < DaysWeek.SARTUDAY;
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
