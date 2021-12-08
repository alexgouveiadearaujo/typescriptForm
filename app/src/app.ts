import { NegotiationController } from "./controllers/negotiation-controller.js";

const controller = new NegotiationController();
const form = document.querySelector(".form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    controller.addition();
  });
} else {
  throw Error("Não foi possível inicializar aplicação.");
}

const btnImport = document.querySelector("#btn-import");
if (btnImport) {
  btnImport.addEventListener("click", () => {
    controller.importData();
  });
} else {
  throw Error("Botão Importa, não foi encontrado.");
}
