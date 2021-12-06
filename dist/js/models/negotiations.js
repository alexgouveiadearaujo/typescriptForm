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
