import { DaysWeek } from "../enums/daysWeek.js";
import { Negotiation } from "../models/negotiation.js";
import { Negotiations } from "../models/negotiations.js";
import { MessageView } from "../views/message-view.js";
import { NegotiationsView } from "../views/negotiations-view.js";
export class NegotiationController {
    constructor() {
        this.negotiations = new Negotiations();
        this.negotiationsView = new NegotiationsView("#negotiationsView");
        this.messageView = new MessageView("#messageView");
        this.SARTUDAY = 6;
        this.SUNDAY = 0;
        this.inputDate = document.querySelector("#date");
        this.inputAmount = document.querySelector("#amount");
        this.inputValue = document.querySelector("#value");
        this.negotiationsView.update(this.negotiations);
    }
    addition() {
        const negotiation = this.createNegotiation();
        if (!this.itsWorkingDay(negotiation.date)) {
            this.messageView.update("Negociações são aceitas, apenas em dias úteis.");
            return;
        }
        this.negotiations.addition(negotiation);
        this.clearForm();
        this.updateView();
    }
    itsWorkingDay(date) {
        return date.getDay() > DaysWeek.SUNDAY && date.getDay() < this.SARTUDAY;
    }
    createNegotiation() {
        const exp = /-/g;
        const date = new Date(this.inputDate.value.replace(exp, ","));
        const amount = parseInt(this.inputAmount.value);
        const value = parseFloat(this.inputValue.value);
        return new Negotiation(date, amount, value);
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
