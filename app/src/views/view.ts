import { inspect } from "../decorators/inspect.js";
import { loginRuntime } from "../decorators/loginRuntime.js";

export abstract class View<T> {
  protected element: HTMLElement;

  constructor(selector: string) {
    const element = document.querySelector(selector);
    if (element) {
      this.element = element as HTMLElement;
    } else {
      throw Error(`Seletor ${selector} não existe no DOM.`);
    }
  }

  protected abstract template(model: T): string;

  // @loginRuntime(true)
  // @inspect
  public update(model: T): void {
    let template = this.template(model);
    this.element.innerHTML = template;
  }
}
