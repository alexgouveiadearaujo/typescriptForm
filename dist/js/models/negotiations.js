export class Negotiations {
    constructor() {
        this.negotiations = [];
    }
    addition(negotiation) {
        this.negotiations.push(negotiation);
    }
    list() {
        return this.negotiations;
    }
}
/*
    Array<Negotiation> = []; => Negotiation[] = [];
    ReadonlyArray<Negotiation> => readonly Negotiation[]
*/
