import { Negotiation } from "./negotiation.js";

export class Negotiations {
  private negotiations: Negotiation[] = [];

  public addition(negotiation: Negotiation) {
    this.negotiations.push(negotiation);
  }

  public list(): readonly Negotiation[] {
    return this.negotiations;
  }
}
