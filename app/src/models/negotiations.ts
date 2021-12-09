import { Printable } from "../utils/printable.js";
import { Negotiation } from "./negotiation.js";

export class Negotiations implements Printable{
  private negotiations: Negotiation[] = [];

  public addition(negotiation: Negotiation) {
    this.negotiations.push(negotiation);
  }

  public list(): readonly Negotiation[] {
    return this.negotiations;
  }

  public forText(): string{
    return JSON.stringify(this.negotiations, null , 2)
  }


}
