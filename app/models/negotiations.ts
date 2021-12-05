import { Negotiation } from "./negotiation.js";

export class Negotiations {
  private negotiations: Negotiation[] = [];

  addition(negotiation: Negotiation) {
    this.negotiations.push(negotiation);
  }

  list(): readonly Negotiation[] {
    return this.negotiations;
  }
}
