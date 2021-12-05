import { NegotiationController } from "./controllers/negotiation-controller.js";
// const negotiation = new Negotiation(new Date() , 10 , 100)
const controller = new NegotiationController();
const form = document.querySelector('.form');
form.addEventListener('submit', e => {
    e.preventDefault();
    controller.addition();
});
