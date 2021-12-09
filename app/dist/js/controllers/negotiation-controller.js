var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
    constructor() {
        this.negotiations = new Negotiations();
        this.negotiationsView = new NegotiationsView("#negotiationsView");
        this.messageView = new MessageView("#messageView");
        this.negotiationsService = new NegotiationsService();
        this.negotiationsView.update(this.negotiations);
    }
    addition() {
        const negotiation = Negotiation.createFrom(this.inputDate.value, this.inputAmount.value, this.inputValue.value);
        if (!this.itsWorkingDay(negotiation.date)) {
            this.messageView.update("Negociações são aceitas, apenas em dias úteis.");
            return;
        }
        this.negotiations.addition(negotiation);
        print(negotiation, this.negotiations);
        this.clearForm();
        this.updateView();
    }
    importData() {
        this.negotiationsService.getNegotiations().then((negotiationsToday) => {
            for (let negotiation of negotiationsToday) {
                this.negotiations.addition(negotiation);
            }
            this.negotiationsView.update(this.negotiations);
        });
    }
    itsWorkingDay(date) {
        return date.getDay() > DaysWeek.SUNDAY && date.getDay() < DaysWeek.SARTUDAY;
    }
    clearForm() {
        this.inputDate.value = "";
        this.inputAmount.value = "";
        this.inputValue.value = "";
        this.inputDate.focus();
    }
    updateView() {
        this.negotiationsView.update(this.negotiations);
        this.messageView.update("Negociação adicionada com sucesso.");
    }
}
__decorate([
    domInjector("#date")
], NegotiationController.prototype, "inputDate", void 0);
__decorate([
    domInjector("#amount")
], NegotiationController.prototype, "inputAmount", void 0);
__decorate([
    domInjector("#value")
], NegotiationController.prototype, "inputValue", void 0);
__decorate([
    inspect,
    loginRuntime()
], NegotiationController.prototype, "addition", null);
