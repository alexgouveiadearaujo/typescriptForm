import { domInjector } from "../decorators/dom-injector.js";
import { inspect } from "../decorators/inspect.js";
import { loginRuntime } from "../decorators/loginRuntime.js";
import { DaysWeek } from "../enums/daysWeek.js";
import { Negotiation } from "../models/negotiation.js";
import { Negotiations } from "../models/negotiations.js";
import { NegotiationsService } from "../services/negotiations-service.js";
import { print } from "../utils/print.js";
import { MessageView } from "../views/message-view.js";
import { NegotiationsView } from "../views/negotiations-view.js";

export class NegotiationController {
  @domInjector("#date")
  private inputDate: HTMLInputElement;
  @domInjector("#amount")
  private inputAmount: HTMLInputElement;
  @domInjector("#value")
  private inputValue: HTMLInputElement;

  private negotiations = new Negotiations();
  private negotiationsView = new NegotiationsView("#negotiationsView");
  private messageView = new MessageView("#messageView");
  private negotiationsService = new NegotiationsService();

  constructor() {
    this.negotiationsView.update(this.negotiations);
  }

  @inspect
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
    print(negotiation, this.negotiations);
    this.clearForm();
    this.updateView();
  }

  public importData(): void {
    this.negotiationsService
      .getNegotiations()
      .then((negotiationsToday) => {
        return negotiationsToday.filter((negotiationToday) => {
          return !this.negotiations
            .list()
            .some((negotiation) => negotiation.isEqual(negotiationToday));
        });
      })
      .then((negotiationsToday) => {
        for (let negotiation of negotiationsToday) {
          this.negotiations.addition(negotiation);
        }
        this.negotiationsView.update(this.negotiations);
      });
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
