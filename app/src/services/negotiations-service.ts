import { NegotiationsDay } from "../interfaces/negociation-day";
import { Negotiation } from "../models/negotiation.js";

export class NegotiationsService {
  public getNegotiations(): Promise<Negotiation[]> {
    return fetch("http://localhost:8080/dados")
      .then((res) => res.json())
      .then((data: NegotiationsDay[]) => {
        return data.map((dataToday) => {
          return new Negotiation(
            new Date(),
            dataToday.vezes,
            dataToday.montante
          );
        });
      });
  }
}
